// src/features/social-auth/social-auth.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { socialAuthService } from "./social-auth.service.js";
import { config } from "@/config/index.js";
import { createHttpError } from "@/utils/error.factory.js";
import {
  verifyAndValidateRefreshToken,
  generateAccessToken,
} from "@/utils/jwt.utils.js";
import prisma from "@/db/prisma.js";
import { User } from "@prisma-client";

class SocialAuthController {
  /**
   * Helper to set the 'jid' cookie
   */
  private setCookie(res: Response, token: string, expiresAt: Date) {
    res.cookie(config.cookies.refreshTokenName, token, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "strict",
      expires: expiresAt,
    });
  }

  /**
   * Google Callback: Processes login and redirects to Frontend.
   * Established the session via HttpOnly cookie.
   */
  googleCallback = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code)
      throw createHttpError(400, "No authorization code provided from Google.");

    const profile = await socialAuthService.getGoogleUser(code as string);
    const { tokens } = await socialAuthService.findOrCreateUser(profile);

    this.setCookie(res, tokens.refreshToken, tokens.refreshTokenExpiresAt);

    // Redirect without the one-time code to prevent reuse errors
    res.redirect(
      `${config.socialAuth.frontendUrl}/auth/callback?status=success&provider=google`,
    );
  });

  /**
   * GitHub Callback: Processes login and redirects to Frontend
   */
  githubCallback = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code)
      throw createHttpError(400, "No authorization code provided from GitHub.");

    const profile = await socialAuthService.getGithubUser(code as string);
    const { tokens } = await socialAuthService.findOrCreateUser(profile);

    this.setCookie(res, tokens.refreshToken, tokens.refreshTokenExpiresAt);

    // Redirect without the one-time code
    res.redirect(
      `${config.socialAuth.frontendUrl}/auth/callback?status=success&provider=github`,
    );
  });

  /**
   * NEW: Exchange the HttpOnly cookie for an Access Token.
   * This is called by the Frontend Callback page to finish the login.
   */
  getSocialStatus = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies[config.cookies.refreshTokenName];

    if (!refreshToken) {
      throw createHttpError(
        401,
        "No social session found. Please try logging in again.",
      );
    }

    const decoded = await verifyAndValidateRefreshToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user || user.status !== "ACTIVE") {
      throw createHttpError(403, "Account is inactive or not found.");
    }

    const accessToken = generateAccessToken(user as unknown as User);

    res.status(200).json({
      status: "success",
      data: {
        user,
        tokens: { accessToken },
      },
    });
  });

  /**
   * Start Google Auth: Redirects browser to Google's consent screen
   */
  initiateGoogle = (_req: Request, res: Response) => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: config.socialAuth.google.callbackUrl,
      client_id: config.socialAuth.google.clientId,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options);
    res.redirect(`${rootUrl}?${qs.toString()}`);
  };

  /**
   * Start GitHub Auth: Redirects browser to GitHub's authorization screen
   */
  initiateGithub = (_req: Request, res: Response) => {
    const rootUrl = "https://github.com/login/oauth/authorize";
    const options = {
      client_id: config.socialAuth.github.clientId,
      redirect_uri: config.socialAuth.github.callbackUrl,
      scope: "read:user user:email",
      allow_signup: "true",
    };

    const qs = new URLSearchParams(options);
    res.redirect(`${rootUrl}?${qs.toString()}`);
  };
}

export const socialAuthController = new SocialAuthController();
