//src/middleware/rateLimiter.ts
import { rateLimit } from "express-rate-limit";
import { config } from "../config/index.js";
import { createHttpError } from "../utils/error.factory.js";

/**
 * AUTH LIMITER: Specifically for high-risk routes like Login and Signup.
 * Uses a "sliding window" to block IPs that spam attempts.
 */
export const authLimiter = rateLimit({
  windowMs: config.rateLimits.auth.windowMs,
  max: config.rateLimits.auth.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      createHttpError(
        429,
        `Too many attempts. Please try again in ${Math.ceil(
          config.rateLimits.auth.windowMs / 60000,
        )} minutes.`,
      ),
    );
  },
});

/**
 * GLOBAL API LIMITER: Prevents general DDOS or scraping.
 */

export const apiLimiter = rateLimit({
  windowMs: config.rateLimits.api.windowMs,
  max: config.rateLimits.api.max,
  handler: (_req, _res, next) => {
    next(createHttpError(429, "Too many requests. Please slow down."));
  },
});

/**
 * EMAIL RESEND LIMITER: Extremely strict to prevent quota abuse and spam flagging.
 * Uses values from the central config.
 */
export const emailResendLimiter = rateLimit({
  windowMs: config.rateLimits.emailResend.windowMs,
  max: config.rateLimits.emailResend.max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, _res, next) => {
    next(
      createHttpError(
        429,
        `Too many verification requests. Please check your spam folder or try again in ${Math.ceil(
          config.rateLimits.emailResend.windowMs / 60000,
        )} minutes.`,
      ),
    );
  },
});
