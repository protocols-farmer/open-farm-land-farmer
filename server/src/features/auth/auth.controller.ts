//src/features/auth/auth.controller.ts
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { config } from "@/config/index.js";
import { createHttpError } from "@/utils/error.factory.js";

class AuthController {
  /**
   * REFINED: Centralized helper to manage the refresh token cookie.
   * This ensures consistency across all auth methods.
   */
  private setRefreshTokenCookie(res: Response, token: string, expiresAt: Date) {
    res.cookie(config.cookies.refreshTokenName, token, {
      httpOnly: true,
      secure: config.nodeEnv === "production",
      sameSite: "strict",
      expires: expiresAt,
    });
  }

  /**
   * Scenario Fix: Handle 'USER_CREATED_BUT_EMAIL_FAILED'
   * Updated: Now reflects the "Welcome Guide" flow instead of the "Verification Link" flow.
   */
  signup = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { user, tokens } = await authService.registerUser(req.body);

      this.setRefreshTokenCookie(
        res,
        tokens.refreshToken,
        tokens.refreshTokenExpiresAt,
      );

      return res.status(201).json({
        status: "success",
        message:
          "Welcome to the guild! We've sent a quick start guide to your inbox. Please check it out to begin your journey.",
        data: { user, tokens },
      });
    } catch (error: any) {
      // 🚜 Scenario: Account created, but Welcome Email failed to send
      if (error.message === "USER_CREATED_BUT_EMAIL_FAILED") {
        return res.status(201).json({
          status: "warning",
          message:
            "Account created, but we couldn't send your welcome guide. You can still explore the platform, but don't forget to verify your email via the dashboard banner later.",
        });
      }
      throw error;
    }
  });
  login = asyncHandler(async (req: Request, res: Response) => {
    const { user, tokens } = await authService.loginUser(req.body);

    this.setRefreshTokenCookie(
      res,
      tokens.refreshToken,
      tokens.refreshTokenExpiresAt,
    );

    res.status(200).json({
      status: "success",
      message: "Logged in successfully.",
      data: { user, tokens },
    });
  });

  refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const incomingRefreshToken =
      req.cookies?.[config.cookies.refreshTokenName] || req.body?.refreshToken;

    if (!incomingRefreshToken) {
      res.clearCookie(config.cookies.refreshTokenName);
      throw createHttpError(401, "No refresh token provided.");
    }
    try {
      const { newAccessToken, newRefreshToken, newRefreshTokenExpiresAt } =
        await authService.handleRefreshTokenRotation({ incomingRefreshToken });

      this.setRefreshTokenCookie(
        res,
        newRefreshToken,
        newRefreshTokenExpiresAt,
      );

      res.status(200).json({
        status: "success",
        message: "Token refreshed successfully.",
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    } catch (error) {
      res.clearCookie(config.cookies.refreshTokenName, {
        httpOnly: true,
        secure: config.nodeEnv === "production",
        sameSite: "strict",
      });

      throw error;
    }
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies[config.cookies.refreshTokenName];
    await authService.handleUserLogout({ incomingRefreshToken });

    res.clearCookie(config.cookies.refreshTokenName);
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully." });
  });

  handleOAuth = asyncHandler(async (req: Request, res: Response) => {
    const { user, tokens } = await authService.findOrCreateOAuthUser(req.body);

    this.setRefreshTokenCookie(
      res,
      tokens.refreshToken,
      tokens.refreshTokenExpiresAt,
    );

    res.status(200).json({ status: "success", data: { user, tokens } });
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await authService.changeUserPassword(userId, req.body);

    res.clearCookie(config.cookies.refreshTokenName);
    res.status(200).json({
      status: "success",
      message:
        "Password changed successfully. All sessions cleared, please log in again.",
    });
  });

  logoutAll = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await authService.revokeAllRefreshTokensForUser(userId);

    res.clearCookie(config.cookies.refreshTokenName);
    res.status(200).json({
      status: "success",
      message: "Successfully logged out of all devices.",
    });
  });

  /**
   * Scenario Fix: Handle SOCIAL_ACCOUNT_DETECTED.
   * Catches the 400 from service and returns a specific status for the frontend.
   */
  forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    console.log("🚀 FORGOT PASSWORD REQUEST RECEIVED FOR:", email);

    try {
      await authService.sendPasswordResetToken(email);

      return res.status(200).json({
        status: "success",
        message:
          "If an account exists with that email, a reset link has been sent.",
      });
    } catch (error: any) {
      // 🚜 Scenario: User signed up with Google/Github
      if (error.message === "SOCIAL_ACCOUNT_DETECTED") {
        return res.status(400).json({
          status: "social_account",
          message:
            "This email is linked to a social provider. Please log in with Google or GitHub.",
        });
      }

      if (
        error.statusCode === 503 ||
        error.message.includes("Email delivery failed")
      ) {
        throw createHttpError(
          503,
          "Our email service is currently unavailable. Please try again in a few minutes.",
        );
      }
      throw error;
    }
  });

  resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const { token, password } = req.body;
    await authService.resetUserPassword(token, password);

    res.status(200).json({
      status: "success",
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  });

  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query;
    if (typeof token !== "string") throw createHttpError(400, "Invalid token.");

    await authService.verifyUserEmail(token);

    res.status(200).json({
      status: "success",
      message: "Email verified successfully! Welcome to the guild.",
    });
  });

  /**
   * Scenario Fix: Rate Limiting & Already Verified feedback.
   */
  resendVerification = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    try {
      await authService.resendVerificationEmail(userId);

      return res.status(200).json({
        status: "success",
        message: "A fresh verification link has been sent to your inbox.",
      });
    } catch (error: any) {
      // 🚜 Scenario: User clicked 'resend' but they are already verified
      if (error.message === "ALREADY_VERIFIED") {
        return res.status(200).json({
          status: "success",
          message: "Your email is already verified. No further action needed.",
        });
      }

      // 🚜 Scenario: Rate limiter caught them (This usually happens in middleware,
      // but we handle the error message here if it propagates)
      if (error.statusCode === 429) {
        const retryAfter = res.getHeader("Retry-After") || "a few";
        throw createHttpError(
          429,
          `Too many requests. Please wait ${retryAfter} minutes before trying again.`,
        );
      }

      if (
        error.statusCode === 503 ||
        error.message.includes("Email delivery failed")
      ) {
        throw createHttpError(
          503,
          "Our email service is currently at capacity. Please try again in a few minutes.",
        );
      }
      throw error;
    }
  });
}

export const authController = new AuthController();
