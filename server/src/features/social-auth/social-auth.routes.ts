// src/features/social-auth/social-auth.routes.ts
import { Router } from "express";
import { socialAuthController } from "./social-auth.controller.js";
import { validate } from "@/middleware/validate.js";
import { socialCallbackSchema } from "./social-auth.validation.js";

const router: Router = Router();

/**
 * --- INITIATION ROUTES ---
 * These are what your frontend buttons actually hit to start the OAuth flow.
 */
router.get("/google", socialAuthController.initiateGoogle);
router.get("/github", socialAuthController.initiateGithub);

/**
 * --- CALLBACK ROUTES ---
 * Hit by Google/GitHub after the user authenticates.
 * These establish the session cookie and redirect to the frontend.
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
 * NEW: The frontend hits this after the redirect to "exchange" the
 * HttpOnly cookie for an Access Token and User profile.
 */
router.get("/status", socialAuthController.getSocialStatus);

export default router;
