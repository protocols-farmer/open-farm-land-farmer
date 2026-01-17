//src/features/auth/auth.service.ts
import bcrypt from "bcryptjs";
import prisma, { rawPrisma } from "@/db/prisma.js"; // Import rawPrisma
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
} from "@/types/auth.types.js";
import { userService, SafeUser } from "../user/user.service.js";

const MAX_USERNAME_LEN = 50;
const SUFFIX_LEN = 5;

export class AuthService {
  public async registerUser(input: SignUpRequestDto): Promise<{
    user: SafeUser;
    tokens: AuthTokens;
  }> {
    const { email, password } = input;

    // --- 1. GENERATE UNIQUE USERNAME ---
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
    // --- 2. GENERATE DEFAULT NAME ---
    const generatedName = "New Wanderer";

    // --- 3. CONSTRUCT FULL PAYLOAD ---
    // We cast this as SignUpInputDto so the userService is happy
    const fullUserData: SignUpInputDto = {
      email,
      password,
      username,
      name: generatedName,
    };

    // 4. Create the user
    const user = await userService.createUser(fullUserData);

    // 5. Token Generation
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

    // --- FIX: Use rawPrisma here to get the password for verification ---
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
      userWithPassword.hashedPassword
    );
    if (!isPasswordCorrect) {
      throw createHttpError(401, "The password you entered is incorrect.");
    }

    const accessToken = generateAccessToken(userWithPassword);
    const { token: refreshToken, expiresAt } =
      await generateAndStoreRefreshToken(userWithPassword.id);

    // Cast to SafeUser for the response (password is removed at runtime by extension)
    return {
      user: userWithPassword as unknown as SafeUser,
      tokens: { accessToken, refreshToken, refreshTokenExpiresAt: expiresAt },
    };
  }

  public async changeUserPassword(
    userId: string,
    input: ChangePasswordInputDto
  ): Promise<void> {
    const { currentPassword, newPassword } = input;

    // 1. Fetch user using rawPrisma to get the current hashedPassword
    const user = await rawPrisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.hashedPassword) {
      throw createHttpError(
        401,
        "User not found or account has no password set."
      );
    }

    // 2. Verify current password is correct
    const isCurrentCorrect = await bcrypt.compare(
      currentPassword,
      user.hashedPassword
    );
    if (!isCurrentCorrect) {
      throw createHttpError(
        400,
        "The current password you entered is incorrect."
      );
    }

    // 3. SECURITY: Check if new password is same as old password
    // This must be done via bcrypt.compare because the database stores a hash
    const isSameAsOld = await bcrypt.compare(newPassword, user.hashedPassword);
    if (isSameAsOld) {
      throw createHttpError(
        400,
        "New password cannot be the same as your current password."
      );
    }

    // 4. Hash the new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // 5. Atomic Transaction: Update password AND kill all existing sessions
    // This forces the user (and any potential hijackers) to log in again with the new credentials
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
      "Password changed successfully. All sessions revoked."
    );
  }

  public async handleRefreshTokenRotation(
    input: RefreshTokenInputDto
  ): Promise<{
    newAccessToken: string;
    newRefreshToken: string;
    newRefreshTokenExpiresAt: Date;
  }> {
    if (!input.incomingRefreshToken) {
      throw createHttpError(401, "Refresh token is required.");
    }

    // 1. Verify JWT signature & basic payload (Done outside DB to save resources)
    const decodedOldToken = await verifyAndValidateRefreshToken(
      input.incomingRefreshToken
    );

    // 2. FAIL-FAST: Check user status BEFORE starting the transaction
    const user = await prisma.user.findUnique({
      where: { id: decodedOldToken.id },
    });

    if (!user || user.status !== "ACTIVE") {
      // If we have a valid JTI but inactive user, revoke this specific token immediately
      await this.revokeTokenByJti(decodedOldToken.jti);
      throw createHttpError(403, "Access denied: Account is inactive.");
    }

    // 3. Start Transaction for atomic rotation
    return await prisma.$transaction(async (tx) => {
      // 4. Revoke the old token (prevents reuse)
      await tx.refreshToken.update({
        where: { jti: decodedOldToken.jti },
        data: { revoked: true },
      });

      // 5. Generate the new pair
      const newAccessToken = generateAccessToken(user as unknown as User);

      // 6. Store new token using the transaction client (tx)
      const { token: newRefreshToken, expiresAt: newRefreshTokenExpiresAt } =
        await generateAndStoreRefreshToken(user.id, tx);

      return { newAccessToken, newRefreshToken, newRefreshTokenExpiresAt };
    });
  }
  public async handleUserLogout(input: LogoutInputDto): Promise<void> {
    if (!input.incomingRefreshToken) return;
    try {
      const decoded = await verifyAndValidateRefreshToken(
        input.incomingRefreshToken
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
      // --- REFINED: Collision-Safe Username Generation ---
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
          username: username!, // guaranteed unique now
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
