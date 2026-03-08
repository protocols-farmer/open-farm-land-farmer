//src/features/opportunities/opportunity.routes.ts
import { Router } from "express";
import { opportunityController } from "./opportunity.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { isVerified } from "@/middleware/isVerified.js";
import { validate } from "@/middleware/validate.js";
import { uploadImage } from "@/middleware/multer.config.js"; // 🚜 Added Multer
import {
  createOpportunitySchema,
  updateOpportunitySchema,
} from "./opportunity.validation.js";
import { SystemRole } from "@prisma-client";

const router: Router = Router();

// --- Public Routes ---
router.get("/", opportunityController.findAll);
router.get("/:id", opportunityController.findOne);

// --- Protected Routes ---
const authorizedRoles: SystemRole[] = ["SYSTEM_CONTENT_CREATOR", "SUPER_ADMIN"];

router.post(
  "/",
  verifyToken,
  isVerified,
  requireRole(authorizedRoles),
  uploadImage.single("companyLogo"), // 🚜 Capture the logo file
  validate(createOpportunitySchema),
  opportunityController.create,
);

router.patch(
  "/:id",
  verifyToken,
  isVerified,
  requireRole(authorizedRoles),
  uploadImage.single("companyLogo"), // 🚜 Capture new logo file if provided
  validate(updateOpportunitySchema),
  opportunityController.update,
);

router.delete(
  "/:id",
  verifyToken,
  isVerified,
  requireRole(authorizedRoles),
  opportunityController.remove,
);

export default router;
