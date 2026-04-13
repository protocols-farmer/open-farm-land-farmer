//src/features/social-auth/social-auth.routes.ts
import { Router } from "express";
import { socialAuthController } from "./social-auth.controller.js";
import { validate } from "@/middleware/validate.js";
import { socialCallbackSchema } from "./social-auth.validation.js";
import { apiLimiter } from "@/middleware/rateLimiter.js"; // 🚜 ADDED

const router: Router = Router();
router.use(apiLimiter);

/**
 * --- INITIATION ROUTES ---
 */
router.get("/google", socialAuthController.initiateGoogle);
router.get("/github", socialAuthController.initiateGithub);

/**
 * --- CALLBACK ROUTES ---
 */
router.get(
  "/google/callback",
  validate(socialCallbackSchema),
  socialAuthController.googleCallback,
);

router.get(
  "/github/callback",
  validate(socialCallbackSchema),
  socialAuthController.githubCallback,
);

/**
 * --- SESSION EXCHANGE ROUTE ---
 */
router.get("/status", socialAuthController.getSocialStatus);

export default router;
