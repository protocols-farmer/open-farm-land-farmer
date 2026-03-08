import { Router } from "express";
import { authController } from "@/features/auth/auth.controller.js";
import { validate } from "@/middleware/validate.js";
import {
  changePasswordSchema,
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "@/features/auth/auth.validation.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { authLimiter, emailResendLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();

// ==========================================
// 1. PUBLIC AUTH ROUTES
// ==========================================

router.post(
  "/register",
  authLimiter,
  validate(signupSchema),
  authController.signup,
);

router.post("/login", authLimiter, validate(loginSchema), authController.login);

router.post("/oauth", authLimiter, authController.handleOAuth);

router.post("/refresh", authController.refreshAccessToken);

// --- Password Recovery & Email Verification ---

router.post(
  "/forgot-password",
  authLimiter, // Essential to prevent email spamming
  validate(forgotPasswordSchema),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  authLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword,
);

/**
 * Note: This is a GET request because users click a link in their email.
 * The link usually looks like: /verify-email?token=xyz
 */
router.get("/verify-email", authController.verifyEmail);

// ==========================================
// 2. PROTECTED AUTH ROUTES (Requires Login)
// ==========================================

router.post("/logout", verifyToken, authController.logout);

router.post(
  "/change-password",
  verifyToken,
  validate(changePasswordSchema),
  authController.changePassword,
);

router.post(
  "/resend-verification",
  verifyToken, // Must be logged in
  emailResendLimiter, // Strict rate limit
  authController.resendVerification,
);

router.post("/logout-all", verifyToken, authController.logoutAll);

export default router;
