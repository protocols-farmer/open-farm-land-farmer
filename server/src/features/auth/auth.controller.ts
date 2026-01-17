//src/features/auth/auth.controller.ts
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { config } from "@/config/index.js";

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

  signup = asyncHandler(async (req: Request, res: Response) => {
    const { user, tokens } = await authService.registerUser(req.body);

    this.setRefreshTokenCookie(
      res,
      tokens.refreshToken,
      tokens.refreshTokenExpiresAt
    );

    res.status(201).json({
      status: "success",
      message: "User registered successfully.",
      data: { user, tokens },
    });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { user, tokens } = await authService.loginUser(req.body);

    this.setRefreshTokenCookie(
      res,
      tokens.refreshToken,
      tokens.refreshTokenExpiresAt
    );

    res.status(200).json({
      status: "success",
      message: "Logged in successfully.",
      data: { user, tokens },
    });
  });

  refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
    const incomingRefreshToken =
      req.cookies[config.cookies.refreshTokenName] || req.body.refreshToken;

    const { newAccessToken, newRefreshToken, newRefreshTokenExpiresAt } =
      await authService.handleRefreshTokenRotation({ incomingRefreshToken });
    this.setRefreshTokenCookie(res, newRefreshToken, newRefreshTokenExpiresAt);

    res.status(200).json({
      status: "success",
      message: "Token refreshed successfully.",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
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
      tokens.refreshTokenExpiresAt
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
}

export const authController = new AuthController();
