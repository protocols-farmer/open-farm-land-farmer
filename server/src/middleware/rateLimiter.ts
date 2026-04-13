//src/middleware/rateLimiter.ts
import { rateLimit } from "express-rate-limit";
import { config } from "../config/index.js";
import { createHttpError } from "../utils/error.factory.js";

/**
 * AUTH LIMITER: Specifically for high-risk routes like Login and Signup.
 */
export const authLimiter = rateLimit({
  windowMs: config.rateLimits.auth.windowMs,
  max: config.rateLimits.auth.max,
  standardHeaders: true,
  legacyHeaders: false,

  // 🚜 FIX: Use 'default: false' to silence all IPv6 and internal validation warnings.
  // This resolves both ERR_ERL_UNKNOWN_VALIDATION and ERR_ERL_KEY_GEN_IPV6.
  validate: { default: false },

  keyGenerator: (req) => {
    if (req.body && req.body.email) {
      return String(req.body.email).toLowerCase();
    }
    // Fallback to IP for non-email attempts
    return req.ip || "anonymous";
  },
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
  standardHeaders: true,
  legacyHeaders: false,
  validate: { default: false },

  handler: (_req, _res, next) => {
    next(createHttpError(429, "Too many requests. Please slow down."));
  },
});

/**
 * EMAIL RESEND LIMITER: Prevents spamming verification emails.
 */
export const emailResendLimiter = rateLimit({
  windowMs: config.rateLimits.emailResend.windowMs,
  max: config.rateLimits.emailResend.max,
  standardHeaders: true,
  legacyHeaders: false,

  // 🚜 FIX: Silence here as well.
  validate: { default: false },

  handler: (_req, _res, next) => {
    next(
      createHttpError(
        429,
        `Too many verification requests. Please try again in ${Math.ceil(
          config.rateLimits.emailResend.windowMs / 60000,
        )} minutes.`,
      ),
    );
  },
});
