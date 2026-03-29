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
  LoginInputDto,
  RefreshTokenInputDto,
  AuthTokens,
  LogoutInputDto,
  ChangePasswordInputDto,
  SignUpRequestDto,
} from "@/features/auth/auth.types.js";
import { userService, SafeUser } from "../user/user.service.js";
import crypto from "crypto";
import { emailService } from "../email/email.service.js";
import { config } from "@/config/index.js";

const MAX_USERNAME_LEN = 50;
const SUFFIX_LEN = 5;

export class AuthService {
  /**
   * REFINED: Registers a new user and triggers an email verification handshake.
   * Scenario Fix: Custom error code if Mailgun fails so Controller can notify user.
   */
  /**
   * REFINED: Registers a new user and triggers a welcome email.
   * Note: emailVerifyToken is still generated and stored so the user can
   * manually trigger verification later via the app banner.
   */
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

    // Still generate the token so it's ready for manual resend/verification
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const generatedName = "New Wanderer";

    const fullUserData = {
      email,
      password,
      username,
      name: generatedName,
      isEmailVerified: false,
      emailVerifyToken: verificationToken,
      settings: {
        create: {},
      },
    };

    const user = await userService.createUser(fullUserData as any);

    try {
      await emailService.sendWelcomeEmail(user.email, user.name);
    } catch (err: any) {
      logger.error(
        { err, userId: user.id },
        "Welcome email delivery failed during signup",
      );
      // Throw specific error so the Controller can trigger the 'warning' UI state
      throw createHttpError(503, "USER_CREATED_BUT_EMAIL_FAILED");
    }

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

    // 1. Fast, lightweight initial query
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

    let activeSanction = undefined;

    if (
      userWithPassword.status === "SUSPENDED" ||
      userWithPassword.status === "BANNED"
    ) {
      const sanction = await rawPrisma.userSanction.findFirst({
        where: {
          userId: userWithPassword.id,
          status: { in: ["ACTIVE", "APPEALED"] },
        },
        orderBy: { createdAt: "desc" },
        include: { appeal: true },
      });

      if (sanction) {
        // If suspended and time is up, restore access immediately
        if (
          userWithPassword.status === "SUSPENDED" &&
          sanction.expiresAt &&
          new Date() >= sanction.expiresAt
        ) {
          await rawPrisma.$transaction([
            rawPrisma.user.update({
              where: { id: userWithPassword.id },
              data: { status: "ACTIVE" },
            }),
            rawPrisma.userSanction.update({
              where: { id: sanction.id },
              data: { status: "EXPIRED" },
            }),
          ]);
          // Update local memory so they get a normal access token
          userWithPassword.status = "ACTIVE";
        } else {
          // Time is not up, attach the sanction details for the frontend
          activeSanction = {
            reason: sanction.reason,
            expiresAt: sanction.expiresAt,
            type: sanction.type,
            status: sanction.status,
            appealStatus: sanction.appeal?.status || null,
          };
        }
      }
    }

    const accessToken = generateAccessToken(userWithPassword as any);
    const { token: refreshToken, expiresAt } =
      await generateAndStoreRefreshToken(userWithPassword.id);

    const { hashedPassword, ...safeUserBase } = userWithPassword;
    const safeUser = { ...safeUserBase, activeSanction };

    return {
      user: safeUser as unknown as SafeUser,
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

    if (!user) {
      await this.revokeTokenByJti(decodedOldToken.jti);
      throw createHttpError(401, "Session invalid: User not found.");
    }

    // so they stay in the "Ghost State". Only kick out DEACTIVATED users.
    if (user.status === "DEACTIVATED") {
      await this.revokeTokenByJti(decodedOldToken.jti);
      throw createHttpError(403, "Access denied: Account is deactivated.");
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

      // Inside findOrCreateOAuthUser, replace the user creation block:
      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name ?? "New User",
          username: username!,
          isEmailVerified: true,
          settings: {
            create: {
              emailMarketing: true,
              emailUpdates: true,
              emailSocial: true,
              theme: "DARK", // 🌙 Dark Mode Default
              notificationsEnabled: true,
            },
          },
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

  /**
   * Generates a reset token and sends the email.
   * Scenario Fix 1: Stop silent return for Social Accounts; throw error instead.
   * Scenario Fix 2: Log 'User not found' for developers while returning silently for users.
   */
  public async sendPasswordResetToken(email: string): Promise<void> {
    const user = await rawPrisma.user.findUnique({ where: { email } });

    if (!user) {
      logger.info({ email }, "🔍 Forgot Password: Email not found in DB.");
      return;
    }

    if (!user.hashedPassword) {
      logger.warn({ email }, "⚠️ Forgot Password: User is a Social Account.");
      throw createHttpError(400, "SOCIAL_ACCOUNT_DETECTED");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: expires,
      },
    });

    await emailService.sendPasswordResetEmail(user.email, {
      name: user.name,
      url: `${config.socialAuth.frontendUrl}/auth/reset-password?token=${resetToken}`,
    });

    logger.info(
      { email },
      "📧 Forgot Password: Reset email successfully handed off to Mailgun.",
    );
  }

  public async resetUserPassword(
    token: string,
    newPassword: string,
  ): Promise<void> {
    const user = await rawPrisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) throw createHttpError(400, "Token is invalid or has expired.");

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await rawPrisma.$transaction([
      rawPrisma.user.update({
        where: { id: user.id },
        data: {
          hashedPassword,
          passwordResetToken: null,
          passwordResetExpires: null,
        },
      }),
      rawPrisma.refreshToken.updateMany({
        where: { userId: user.id },
        data: { revoked: true },
      }),
    ]);
  }
  /**
   * Scenario Fix: Log specific token attempted for developer debugging.
   */
  public async verifyUserEmail(token: string): Promise<void> {
    const user = await prisma.user.findFirst({
      where: { emailVerifyToken: token },
    });

    if (!user) {
      logger.warn(
        { token },
        "❌ Email Verification Failed: Token invalid or not found.",
      );
      throw createHttpError(400, "Invalid verification token.");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerifyToken: null,
      },
    });

    logger.info({ userId: user.id }, "✅ Email verified successfully.");
  }

  /**
   * Scenario Fix: Specific error if user tries to resend to a verified account.
   */
  public async resendVerificationEmail(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw createHttpError(404, "User not found.");

    if (user.isEmailVerified) {
      logger.info({ userId }, "ℹ️ Resend Blocked: Account already verified.");
      throw createHttpError(400, "ALREADY_VERIFIED");
    }

    const newToken = crypto.randomBytes(32).toString("hex");

    await prisma.user.update({
      where: { id: userId },
      data: { emailVerifyToken: newToken },
    });

    const verificationUrl = `${config.socialAuth.frontendUrl}/auth/verify-email?token=${newToken}`;

    await emailService.sendVerificationEmail(user.email, {
      name: user.name,
      url: verificationUrl,
    });

    logger.info({ userId }, "📧 Fresh verification link sent.");
  }
}

export const authService = new AuthService();
