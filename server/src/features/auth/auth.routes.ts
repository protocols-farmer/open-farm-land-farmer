//src/features/auth/auth.routes.ts
import { Router } from "express";
import { authController } from "@/features/auth/auth.controller.js";
import { validate } from "@/middleware/validate.js"; // You will need to create this middleware
import {
  changePasswordSchema,
  loginSchema,
  signupSchema,
} from "@/features/auth/auth.validation.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { authLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();

// --- Public Routes ---
router.post(
  "/register",
  authLimiter,
  validate(signupSchema),
  authController.signup
);
router.post("/login", authLimiter, validate(loginSchema), authController.login);
router.post("/oauth", authLimiter, authController.handleOAuth);
router.post("/refresh", authController.refreshAccessToken);
// --- Protected Routes (require a valid token) ---
router.post("/logout", verifyToken, authController.logout);
router.post(
  "/change-password",
  verifyToken,
  validate(changePasswordSchema),
  authController.changePassword
);
router.post("/logout-all", verifyToken, authController.logoutAll);

export default router;
