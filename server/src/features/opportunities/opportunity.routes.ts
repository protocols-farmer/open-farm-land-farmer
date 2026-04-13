//src/features/opportunities/opportunity.routes.ts
import { Router } from "express";
import { opportunityController } from "./opportunity.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { isVerified } from "@/middleware/isVerified.js";
import { validate } from "@/middleware/validate.js";
import { uploadImage } from "@/middleware/multer.config.js";
import {
  createOpportunitySchema,
  updateOpportunitySchema,
} from "./opportunity.validation.js";
import { SystemRole } from "@prisma-client";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();
router.use(apiLimiter);

// --- Public Routes ---
router.get("/", opportunityController.findAll);
router.get("/:id", opportunityController.findOne);

// --- Protected Routes ---
// 🚜 SYNCED: Added DEVELOPER to match the frontend and Update roles
const authorizedRoles: SystemRole[] = [
  "SYSTEM_CONTENT_CREATOR",
  "SUPER_ADMIN",
  "DEVELOPER",
];

router.post(
  "/",
  verifyToken,
  isVerified,
  requireRole(authorizedRoles),
  uploadImage.single("companyLogo"),
  validate(createOpportunitySchema),
  opportunityController.create,
);

router.patch(
  "/:id",
  verifyToken,
  isVerified,
  requireRole(authorizedRoles),
  uploadImage.single("companyLogo"),
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
