//src/features/settings/settings.routes.ts
import { Router } from "express";
import { settingsController } from "./settings.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.js";
import { updateSettingsSchema } from "./settings.validation.js";

const router: Router = Router();

/**
 * All settings routes require the user to be logged in.
 * They operate on the 'current user' based on the JWT.
 */
router.use(verifyToken);

router.get("/", settingsController.getSettings);

router.patch(
  "/",
  validate(updateSettingsSchema),
  settingsController.updateSettings,
);

export default router;
