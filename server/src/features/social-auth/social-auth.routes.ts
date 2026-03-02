import { Router } from "express";
import { socialAuthController } from "./social-auth.controller.js";
import { validate } from "@/middleware/validate.js";
import { socialCallbackSchema } from "./social-auth.validation.js";

const router: Router = Router();

/**
 * --- INITIATION ROUTES ---
 * These are what your frontend buttons actually hit.
 */
router.get("/google", socialAuthController.initiateGoogle);
router.get("/github", socialAuthController.initiateGithub);

/**
 * --- CALLBACK ROUTES ---
 * These stay the same (hit by Google/GitHub).
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

export default router;
