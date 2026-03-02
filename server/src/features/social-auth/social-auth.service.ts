//src/features/social-auth/social-auth.service.ts
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

export class SocialAuthService {
  /**
   * Exchanges Google's 'code' for a user profile
   */
  async getGoogleUser(code: string): Promise<SocialProfile> {
    try {
      const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        code,
        client_id: config.socialAuth.google.clientId,
        client_secret: config.socialAuth.google.clientSecret,
        redirect_uri: config.socialAuth.google.callbackUrl,
        grant_type: "authorization_code",
      });

      const { data: profile } = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${data.access_token}`,
      );

      return {
        email: profile.email,
        name: profile.name,
        image: profile.picture,
        sub: profile.sub,
      };
    } catch (error) {
      logger.error({ err: error }, "Google OAuth Exchange Failed");
      throw createHttpError(401, "Failed to authenticate with Google.");
    }
  }
  async getGithubUser(code: string): Promise<SocialProfile> {
    try {
      // 1. Exchange code for access token
      const { data: tokenData } = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: config.socialAuth.github.clientId,
          client_secret: config.socialAuth.github.clientSecret,
          code,
        },
        { headers: { Accept: "application/json" } },
      );

      // 2. Use token to get user profile
      const { data: profile } = await axios.get("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });

      // 3. GitHub users sometimes have private emails. If email is null, we fetch emails separately.
      let email = profile.email;
      if (!email) {
        const { data: emails } = await axios.get(
          "https://api.github.com/user/emails",
          {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
          },
        );
        email = emails.find((e: any) => e.primary && e.verified)?.email;
      }

      return {
        email: email,
        name: profile.name || profile.login, // GitHub users often use logins (usernames)
        image: profile.avatar_url,
        id: profile.id.toString(),
      };
    } catch (error) {
      logger.error({ err: error }, "GitHub OAuth Exchange Failed");
      throw createHttpError(401, "Failed to authenticate with GitHub.");
    }
  }
  /**
   * Finds or creates the user in your database
   */
  async findOrCreateUser(profile: SocialProfile): Promise<SocialAuthResponse> {
    let user = await prisma.user.findUnique({
      where: { email: profile.email },
    });

    if (!user) {
      // Logic for collision-safe username (Matching your AuthService logic)
      let username = "";
      let isUnique = false;
      const basePart = profile.email
        .split("@")[0]
        .replace(/[^a-zA-Z0-9_]/g, "");

      while (!isUnique) {
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        username = `${basePart}_${randomSuffix}`;
        const existing = await prisma.user.findUnique({ where: { username } });
        if (!existing) isUnique = true;
      }

      user = await prisma.user.create({
        data: {
          email: profile.email,
          name: profile.name || "New Wanderer",
          username: username,
          profileImage: profile.image || null,
        },
      });
      logger.info({ userId: user.id }, "New social user created.");
    }

    const accessToken = generateAccessToken(user as unknown as User);
    const { token: refreshToken, expiresAt } =
      await generateAndStoreRefreshToken(user.id);

    return {
      user: user as unknown as SafeUser,
      tokens: { accessToken, refreshToken, refreshTokenExpiresAt: expiresAt },
    };
  }
}

export const socialAuthService = new SocialAuthService();
