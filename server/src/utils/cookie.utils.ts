//src/utils/cookie.utils.ts
import { Response, CookieOptions } from "express";
import { config } from "@/config/index.js";

const getCommonCookieOptions = (): CookieOptions => {
  const isProd = config.nodeEnv === "production";

  return {
    httpOnly: true,
    // MUST be true in production for SameSite: 'none' to work
    secure: isProd,
    // 'none' is required for cross-domain (Render backend -> Vercel frontend)
    sameSite: isProd ? "none" : "lax",
    path: "/",
    // Note: Do NOT explicitly set the 'domain' property here since your frontend
    // and backend are on completely different root domains.
    // The browser will safely default it to the backend's host.
  };
};

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  refreshExpiresAt: Date,
) => {
  const commonOptions = getCommonCookieOptions();

  res.cookie("accessToken", accessToken, {
    ...commonOptions,
    maxAge: config.jwt.accessExpiresInSeconds * 1000,
  });

  res.cookie(config.cookies.refreshTokenName, refreshToken, {
    ...commonOptions,
    expires: refreshExpiresAt,
  });
};

export const clearAuthCookies = (res: Response) => {
  const commonOptions = getCommonCookieOptions();

  res.clearCookie("accessToken", commonOptions);
  res.clearCookie(config.cookies.refreshTokenName, commonOptions);
};
