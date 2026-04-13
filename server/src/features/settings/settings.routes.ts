//src/features/settings/settings.routes.ts
import { Router } from "express";
import { settingsController } from "./settings.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { validate } from "@/middleware/validate.js";
import { updateSettingsSchema } from "./settings.validation.js";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();
router.use(apiLimiter);

router.get("/", verifyToken, settingsController.getSettings);

router.patch(
  "/",
  verifyToken,
  validate(updateSettingsSchema),
  settingsController.updateSettings,
);

export default router;
