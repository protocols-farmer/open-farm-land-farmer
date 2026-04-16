//src/features/auth/auth.routes.ts
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
import {
  apiLimiter,
  authLimiter,
  emailResendLimiter,
} from "@/middleware/rateLimiter.js";

const router: Router = Router();

router.post(
  "/signup",
  authLimiter,
  validate(signupSchema),
  authController.signup,
);

router.post("/login", authLimiter, validate(loginSchema), authController.login);

router.post("/oauth", authLimiter, authController.handleOAuth);

router.post("/refresh", apiLimiter, authController.refreshAccessToken);

router.post(
  "/forgot-password",
  authLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  authLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword,
);

router.get("/verify-email", authController.verifyEmail);

router.post("/logout", verifyToken, authController.logout);

router.post(
  "/change-password",
  verifyToken,
  validate(changePasswordSchema),
  authController.changePassword,
);

router.post(
  "/resend-verification",
  verifyToken,
  emailResendLimiter,
  authController.resendVerification,
);

router.post("/logout-all", verifyToken, authController.logoutAll);

export default router;
