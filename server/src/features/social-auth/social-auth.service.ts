import axios from "axios";
import prisma from "@/db/prisma.js";
import { config } from "@/config/index.js";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";
import {
  generateAccessToken,
  generateAndStoreRefreshToken,
} from "@/utils/jwt.utils.js";
import { SafeUser } from "@/features/user/user.service.js";
import { SocialProfile, SocialAuthResponse } from "./social-auth.types.js";
import { User } from "@prisma-client";
import { HttpError } from "@/utils/HttpError.js";

export class SocialAuthService {
  /**
   * Exchanges Google's 'code' for a user profile
   * Scenario Fix: Enhanced logging to surface callbackUrl misconfigurations.
   */
  async getGoogleUser(code: string): Promise<SocialProfile> {
    try {
      const tokenResponse = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          code,
          client_id: config.socialAuth.google.clientId,
          client_secret: config.socialAuth.google.clientSecret,
          redirect_uri: config.socialAuth.google.callbackUrl,
          grant_type: "authorization_code",
        },
        {
          timeout: 15000,
        },
      );

      const { access_token } = tokenResponse.data;

      const { data: profile } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: { Authorization: `Bearer ${access_token}` },
        },
      );

      return {
        email: profile.email,
        name: profile.name,
        image: profile.picture,
        sub: profile.sub,
      };
    } catch (error: any) {
      // 🚜 Scenario Fix: Surface callbackUrl in logs for easier DNS/Env debugging
      const debugInfo = {
        code: error.code,
        message: error.message,
        configuredCallbackUrl: config.socialAuth.google.callbackUrl,
      };

      if (
        error.code === "ECONNRESET" ||
        error.code === "ETIMEDOUT" ||
        error.code === "ENOTFOUND"
      ) {
        logger.error(
          debugInfo,
          "NETWORK ERROR: Google OAuth servers are unreachable from this machine.",
        );

        throw createHttpError(
          503,
          "Google server connection failed. Check your local DNS/Internet.",
        );
      }

      const googleError = error.response?.data;
      if (googleError) {
        logger.error(
          { ...debugInfo, googleError },
          "Google API rejected the OAuth request.",
        );
        throw createHttpError(
          401,
          `Google: ${googleError.error_description || googleError.error}`,
        );
      }

      logger.error(
        { err: error, ...debugInfo },
        "Google OAuth Exchange Failed",
      );
      throw createHttpError(401, "Failed to authenticate with Google.");
    }
  }

  async getGithubUser(code: string): Promise<SocialProfile> {
    try {
      const response = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: config.socialAuth.github.clientId,
          client_secret: config.socialAuth.github.clientSecret,
          code,
        },
        {
          headers: { Accept: "application/json" },
          timeout: 15000,
        },
      );

      if (response.data.error) {
        logger.error(
          { githubError: response.data.error },
          "GitHub Auth logic error",
        );
        throw createHttpError(
          401,
          `GitHub: ${response.data.error_description}`,
        );
      }

      const accessToken = response.data.access_token;

      const { data: profile } = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      let email = profile.email;

      if (!email) {
        const { data: emails } = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          },
        );

        const primaryEmail =
          emails.find((e: any) => e.primary && e.verified) ||
          emails.find((e: any) => e.verified) ||
          emails[0];

        email = primaryEmail?.email;
      }

      if (!email) {
        logger.warn(
          { githubId: profile.id },
          "GitHub returned no email even after /user/emails check.",
        );
        email = `${profile.login}@github.com`;
      }

      return {
        email: email.toLowerCase(),
        name: profile.name || profile.login,
        image: profile.avatar_url,
      };
    } catch (error: any) {
      if (error instanceof HttpError) throw error;

      logger.error(
        { message: error.message, code: error.code },
        "HARD NETWORK ERROR calling GitHub",
      );
      throw createHttpError(
        500,
        "GitHub server connection failed. Check your internet/proxy.",
      );
    }
  }

  /**
   * Scenario Fix: Log account linking for existing manual users.
   */
  async findOrCreateUser(profile: SocialProfile): Promise<SocialAuthResponse> {
    let user = await prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (user) {
      // If an existing user logs in via Social, we consider their email verified
      if (!user.isEmailVerified) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { isEmailVerified: true },
        });

        // 🚜 Scenario Fix: Explicit log for account linking
        logger.info(
          { userId: user.id, email: user.email },
          `Account ${user.email} linked to Social Provider and auto-verified.`,
        );
      }
    } else {
      try {
        let username = "";
        let isUnique = false;
        const basePart = profile.email
          .split("@")[0]
          .replace(/[^a-zA-Z0-9_]/g, "")
          .substring(0, 40);

        while (!isUnique) {
          const randomSuffix = Math.floor(1000 + Math.random() * 9000);
          username = `${basePart}_${randomSuffix}`;
          const existing = await prisma.user.findUnique({
            where: { username },
          });
          if (!existing) isUnique = true;
        }

        // Inside findOrCreateUser, replace the user creation block:
        user = await prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name || "New Wanderer",
            username: username,
            profileImage: profile.image || null,
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
          },
        });

        logger.info(
          { userId: user.id },
          "New social user created and auto-verified.",
        );
      } catch (createError: any) {
        if (createError.code === "P2002") {
          logger.warn("Race condition hit: User created by parallel request.");
          user = await prisma.user.findUnique({
            where: { email: profile.email },
          });
        } else {
          throw createError;
        }
      }
    }

    if (!user) {
      throw createHttpError(
        500,
        "User resolution failed after creation attempt.",
      );
    }

    const accessToken = generateAccessToken(user as unknown as User);
    const { token: refreshToken, expiresAt } =
      await generateAndStoreRefreshToken(user.id);

    return {
      user: user as unknown as SafeUser,
      tokens: {
        accessToken,
        refreshToken,
        refreshTokenExpiresAt: expiresAt,
      },
    };
  }
}

export const socialAuthService = new SocialAuthService();
