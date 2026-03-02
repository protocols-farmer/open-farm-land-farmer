import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { socialAuthService } from "./social-auth.service.js";
import { config } from "@/config/index.js";

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
   * Google Callback: Processes login and redirects to Frontend
   */
  googleCallback = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.query;

    const profile = await socialAuthService.getGoogleUser(code as string);
    const { tokens } = await socialAuthService.findOrCreateUser(profile);

    this.setCookie(res, tokens.refreshToken, tokens.refreshTokenExpiresAt);

    // Redirect back to your Next.js app's callback page
    // Using your validated config.socialAuth.frontendUrl
    res.redirect(`${config.socialAuth.frontendUrl}/auth/callback?code=${code}`);
  });

  /**
   * GitHub Callback: Processes login and redirects to Frontend
   */
  githubCallback = asyncHandler(async (req: Request, res: Response) => {
    const { code } = req.query;

    const profile = await socialAuthService.getGithubUser(code as string);
    const { tokens } = await socialAuthService.findOrCreateUser(profile);

    this.setCookie(res, tokens.refreshToken, tokens.refreshTokenExpiresAt);

    res.redirect(`${config.socialAuth.frontendUrl}/auth/callback?code=${code}`);
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
