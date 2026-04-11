//src/utils/cookie.utils.ts
import { Response } from "express";
import { config } from "@/config/index.js";

/**
 * Standardized helper to attach both Access and Refresh tokens to HTTP-only cookies.
 * This protects both tokens from XSS by making them inaccessible to client-side JS.
 */
export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  refreshExpiresAt: Date,
) => {
  // 1. Set Access Token Cookie
  // We use maxAge here, converting your config (seconds) to milliseconds.
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    maxAge: config.jwt.accessExpiresInSeconds * 1000,
  });

  // 2. Set Refresh Token Cookie
  // We use the specific Date object provided by the Refresh Token generator.
  res.cookie(config.cookies.refreshTokenName, refreshToken, {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict",
    expires: refreshExpiresAt,
  });
};

/**
 * Standardized helper to clear all authentication cookies during logout or session failure.
 */
export const clearAuthCookies = (res: Response) => {
  const options = {
    httpOnly: true,
    secure: config.nodeEnv === "production",
    sameSite: "strict" as const,
  };

  res.clearCookie("accessToken", options);
  res.clearCookie(config.cookies.refreshTokenName, options);
};
