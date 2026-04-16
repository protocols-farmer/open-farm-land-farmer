//src/features/auth/auth.controller.ts
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { config } from "@/config/index.js";
import { createHttpError } from "@/utils/error.factory.js";
import { setAuthCookies, clearAuthCookies } from "@/utils/cookie.utils.js";

class AuthController {
  signup = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { user, tokens } = await authService.registerUser(req.body);

      setAuthCookies(
        res,
        tokens.accessToken,
        tokens.refreshToken,
        tokens.refreshTokenExpiresAt,
      );

      return res.status(201).json({
        status: "success",
        message:
          "Welcome to the guild! We've sent a quick start guide to your inbox. Please check it out to begin your journey.",
        data: { user },
      });
    } catch (error: any) {
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

    setAuthCookies(
      res,
      tokens.accessToken,
      tokens.refreshToken,
      tokens.refreshTokenExpiresAt,
    );

    res.status(200).json({
      status: "success",
      message: "Logged in successfully.",
      data: { user },
    });
  });

  refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const incomingRefreshToken =
      req.cookies?.[config.cookies.refreshTokenName] || req.body?.refreshToken;

    if (!incomingRefreshToken) {
      throw createHttpError(401, "No refresh token provided.");
    }

    try {
      const { newAccessToken, newRefreshToken, newRefreshTokenExpiresAt } =
        await authService.handleRefreshTokenRotation({ incomingRefreshToken });

      setAuthCookies(
        res,
        newAccessToken,
        newRefreshToken,
        newRefreshTokenExpiresAt,
      );

      res.status(200).json({
        status: "success",
        message: "Token refreshed successfully.",
        data: {},
      });
    } catch (error) {
      clearAuthCookies(res);
      throw error;
    }
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies[config.cookies.refreshTokenName];
    await authService.handleUserLogout({ incomingRefreshToken });

    clearAuthCookies(res);
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully." });
  });

  handleOAuth = asyncHandler(async (req: Request, res: Response) => {
    const { user, tokens } = await authService.findOrCreateOAuthUser(req.body);

    setAuthCookies(
      res,
      tokens.accessToken,
      tokens.refreshToken,
      tokens.refreshTokenExpiresAt,
    );

    res.status(200).json({ status: "success", data: { user } });
  });

  changePassword = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await authService.changeUserPassword(userId, req.body);

    clearAuthCookies(res);
    res.status(200).json({
      status: "success",
      message:
        "Password changed successfully. All sessions cleared, please log in again.",
    });
  });

  logoutAll = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    await authService.revokeAllRefreshTokensForUser(userId);

    clearAuthCookies(res);
    res.status(200).json({
      status: "success",
      message: "Successfully logged out of all devices.",
    });
  });

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
      if (error.message === "SOCIAL_ACCOUNT_DETECTED") {
        return res.status(200).json({
          status: "success",
          message:
            "If an account exists with that email, a reset link has been sent.",
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

    clearAuthCookies(res);

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

  resendVerification = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    try {
      await authService.resendVerificationEmail(userId);

      return res.status(200).json({
        status: "success",
        message: "A fresh verification link has been sent to your inbox.",
      });
    } catch (error: any) {
      if (error.message === "ALREADY_VERIFIED") {
        return res.status(200).json({
          status: "success",
          message: "Your email is already verified. No further action needed.",
        });
      }

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
