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
          config.rateLimits.auth.windowMs / 60000
        )} minutes.`
      )
    );
  },
});

/**
 * GLOBAL API LIMITER: Prevents general DDOS or scraping.
 */
// 1. APPLY RATE LIMITING FIRST
// This ensures that even before parsing JSON or cookies,
// you check if the user is spamming the server.
// app.use("/api", apiLimiter);
export const apiLimiter = rateLimit({
  windowMs: config.rateLimits.api.windowMs,
  max: config.rateLimits.api.max,
  handler: (_req, _res, next) => {
    next(createHttpError(429, "Too many requests. Please slow down."));
  },
});
