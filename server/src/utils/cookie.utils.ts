import { Response, CookieOptions } from "express";
import { config } from "@/config/index.js";

/**
 * Standardized helper to attach both Access and Refresh tokens to HTTP-only cookies.
 * * FIX: Changed sameSite to "none" for production to allow cross-domain
 * communication between Vercel and Render.
 */
export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  refreshExpiresAt: Date,
) => {
  const isProd = config.nodeEnv === "production";

  const commonOptions: CookieOptions = {
    httpOnly: true,
    // "none" is required for cross-site cookies, but only works over HTTPS (secure: true)
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    path: "/",
  };

  // 1. Set Access Token Cookie
  res.cookie("accessToken", accessToken, {
    ...commonOptions,
    maxAge: config.jwt.accessExpiresInSeconds * 1000,
  });

  // 2. Set Refresh Token Cookie
  res.cookie(config.cookies.refreshTokenName, refreshToken, {
    ...commonOptions,
    expires: refreshExpiresAt,
  });
};

/**
 * Standardized helper to clear all authentication cookies.
 * Options must match the setAuthCookies options to be cleared correctly by the browser.
 */
export const clearAuthCookies = (res: Response) => {
  const isProd = config.nodeEnv === "production";

  const options: CookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  };

  res.clearCookie("accessToken", options);
  res.clearCookie(config.cookies.refreshTokenName, options);
};
