//src/utils/cookie.utils.ts
import { Response, CookieOptions } from "express";
import { config } from "@/config/index.js";

export const setAuthCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string,
  refreshExpiresAt: Date,
) => {
  const isProd = config.nodeEnv === "production";

  const commonOptions: CookieOptions = {
    httpOnly: true,

    sameSite: isProd ? "none" : "lax",
    secure: isProd,
    path: "/",
  };

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
