//src/features/updates/update.routes.ts
import { Router } from "express";
import { updateController } from "./update.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { isVerified } from "@/middleware/isVerified.js"; // Added isVerified
import { validate } from "@/middleware/validate.js";
import { createUpdateSchema, updateUpdateSchema } from "./update.validation.js";
import { SystemRole } from "@prisma-client";

const router: Router = Router();
router.get("/latest-version", updateController.getLatestVersion);
// --- Public Routes ---
router.get("/", updateController.findAll);
router.get("/:id", updateController.findOne);

// --- Protected Routes ---
const authorizedRoles: SystemRole[] = [
  "DEVELOPER",
  "SUPER_ADMIN",
  "SYSTEM_CONTENT_CREATOR",
];

router.post(
  "/",
  verifyToken,
  isVerified, // Security Gate
  requireRole(authorizedRoles),
  validate(createUpdateSchema),
  updateController.create,
);

router.patch(
  "/:id",
  verifyToken,
  isVerified, // Security Gate
  requireRole(authorizedRoles),
  validate(updateUpdateSchema),
  updateController.update,
);

router.delete(
  "/:id",
  verifyToken,
  isVerified, // Security Gate
  requireRole(authorizedRoles),
  updateController.remove,
);

export default router;
