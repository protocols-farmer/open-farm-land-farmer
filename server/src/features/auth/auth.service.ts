//src/features/auth/auth.service.ts
import bcrypt from "bcryptjs";
import prisma, { rawPrisma } from "@/db/prisma.js";
import { User } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";
import {
  generateAccessToken,
  generateAndStoreRefreshToken,
  verifyAndValidateRefreshToken,
} from "@/utils/jwt.utils.js";
import {
  SignUpInputDto,
  LoginInputDto,
  RefreshTokenInputDto,
  AuthTokens,
  LogoutInputDto,
  ChangePasswordInputDto,
  SignUpRequestDto,
} from "@/features/auth/auth.types.js";
import { userService, SafeUser } from "../user/user.service.js";

const MAX_USERNAME_LEN = 50;
const SUFFIX_LEN = 5;

export class AuthService {
  public async registerUser(input: SignUpRequestDto): Promise<{
    user: SafeUser;
    tokens: AuthTokens;
  }> {
    const { email, password } = input;

    let username = "";
    let isUnique = false;

    const basePart = email
      .split("@")[0]
      .replace(/[^a-zA-Z0-9_]/g, "")
      .substring(0, MAX_USERNAME_LEN - SUFFIX_LEN);

    while (!isUnique) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      username = `${basePart}_${randomSuffix}`;

      const existing = await prisma.user.findUnique({ where: { username } });
      if (!existing) isUnique = true;
    }

    const generatedName = "New Wanderer";

    const fullUserData: SignUpInputDto = {
      email,
      password,
      username,
      name: generatedName,
    };

    const user = await userService.createUser(fullUserData);

    const accessToken = generateAccessToken(user as unknown as User);
    const { token: refreshToken, expiresAt } =
      await generateAndStoreRefreshToken(user.id);

    return {
      user,
      tokens: { accessToken, refreshToken, refreshTokenExpiresAt: expiresAt },
    };
  }
  public async loginUser(input: LoginInputDto): Promise<{
    user: SafeUser;
    tokens: AuthTokens;
  }> {
    const { email, password } = input;

    const userWithPassword = await rawPrisma.user.findUnique({
      where: { email },
    });

    if (!userWithPassword) {
      throw createHttpError(404, "No account found with this email address.");
    }

    if (!userWithPassword.hashedPassword) {
      throw createHttpError(400, "Please log in using your social provider.");
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userWithPassword.hashedPassword,
    );
    if (!isPasswordCorrect) {
      throw createHttpError(401, "The password you entered is incorrect.");
    }

    const accessToken = generateAccessToken(userWithPassword);
    const { token: refreshToken, expiresAt } =
      await generateAndStoreRefreshToken(userWithPassword.id);

    return {
      user: userWithPassword as unknown as SafeUser,
      tokens: { accessToken, refreshToken, refreshTokenExpiresAt: expiresAt },
    };
  }

  public async changeUserPassword(
    userId: string,
    input: ChangePasswordInputDto,
  ): Promise<void> {
    const { currentPassword, newPassword } = input;

    const user = await rawPrisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.hashedPassword) {
      throw createHttpError(
        401,
        "User not found or account has no password set.",
      );
    }

    const isCurrentCorrect = await bcrypt.compare(
      currentPassword,
      user.hashedPassword,
    );
    if (!isCurrentCorrect) {
      throw createHttpError(
        400,
        "The current password you entered is incorrect.",
      );
    }

    const isSameAsOld = await bcrypt.compare(newPassword, user.hashedPassword);
    if (isSameAsOld) {
      throw createHttpError(
        400,
        "New password cannot be the same as your current password.",
      );
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { hashedPassword: newHashedPassword },
      }),
      prisma.refreshToken.updateMany({
        where: { userId, revoked: false },
        data: { revoked: true },
      }),
    ]);

    logger.info(
      { userId },
      "Password changed successfully. All sessions revoked.",
    );
  }

  public async handleRefreshTokenRotation(
    input: RefreshTokenInputDto,
  ): Promise<{
    newAccessToken: string;
    newRefreshToken: string;
    newRefreshTokenExpiresAt: Date;
  }> {
    if (!input.incomingRefreshToken) {
      throw createHttpError(401, "Refresh token is required.");
    }

    const decodedOldToken = await verifyAndValidateRefreshToken(
      input.incomingRefreshToken,
    );
    const storedToken = await prisma.refreshToken.findUnique({
      where: { jti: decodedOldToken.jti },
    });

    if (!storedToken) {
      throw createHttpError(
        401,
        "Session invalid or expired (Database Reset).",
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: decodedOldToken.id },
    });

    if (!user || user.status !== "ACTIVE") {
      await this.revokeTokenByJti(decodedOldToken.jti);
      throw createHttpError(403, "Access denied: Account is inactive.");
    }

    return await prisma.$transaction(async (tx) => {
      await tx.refreshToken.update({
        where: { jti: decodedOldToken.jti },
        data: { revoked: true },
      });

      const newAccessToken = generateAccessToken(user as unknown as User);

      const { token: newRefreshToken, expiresAt: newRefreshTokenExpiresAt } =
        await generateAndStoreRefreshToken(user.id, tx);

      return { newAccessToken, newRefreshToken, newRefreshTokenExpiresAt };
    });
  }
  public async handleUserLogout(input: LogoutInputDto): Promise<void> {
    if (!input.incomingRefreshToken) return;
    try {
      const decoded = await verifyAndValidateRefreshToken(
        input.incomingRefreshToken,
      );
      await this.revokeTokenByJti(decoded.jti);
    } catch (error) {
      logger.warn({ err: error }, "Logout attempted with invalid token.");
    }
  }

  public async findOrCreateOAuthUser(profile: {
    email: string;
    name?: string | null;
    image?: string | null;
  }): Promise<{ user: SafeUser; tokens: AuthTokens }> {
    let user = await prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (user) {
      user = await prisma.user.update({
        where: { email: profile.email },
        data: {
          name: user.name ?? profile.name ?? "New User",
          profileImage: user.profileImage ?? profile.image ?? null,
        },
      });
    } else {
      let username: string;
      let isUnique = false;
      const baseName = profile.email
        .split("@")[0]
        .replace(/[^a-zA-Z0-9_]/g, "");

      while (!isUnique) {
        username = `${baseName}_${Math.floor(1000 + Math.random() * 9000)}`;
        const existing = await prisma.user.findUnique({ where: { username } });
        if (!existing) isUnique = true;
      }

      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name ?? "New User",
          username: username!,
          ...(profile.image && { profileImage: profile.image }),
        },
      });
    }

    const accessToken = generateAccessToken(user as unknown as User);
    const { token: refreshToken, expiresAt } =
      await generateAndStoreRefreshToken(user.id);

    return {
      user: user as unknown as SafeUser,
      tokens: { accessToken, refreshToken, refreshTokenExpiresAt: expiresAt },
    };
  }

  private async revokeTokenByJti(jti: string): Promise<void> {
    await prisma.refreshToken
      .update({ where: { jti }, data: { revoked: true } })
      .catch(() => {});
  }

  public async revokeAllRefreshTokensForUser(userId: string): Promise<void> {
    await prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }
}

export const authService = new AuthService();
