// src/features/opportunities/opportunity.routes.ts
import { Router } from "express";
import { opportunityController } from "./opportunity.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { validate } from "@/middleware/validate.js";
import {
  createOpportunitySchema,
  updateOpportunitySchema,
} from "./opportunity.validation.js";
import { SystemRole } from "@prisma-client";

const router: Router = Router();

// --- Public Routes ---
// Anyone can view the list of opportunities and individual opportunities.
router.get("/", opportunityController.findAll);
router.get("/:id", opportunityController.findOne);

// --- Protected Routes ---
// Only authorized users can create, update, or delete opportunities.
const authorizedRoles: SystemRole[] = ["SYSTEM_CONTENT_CREATOR", "SUPER_ADMIN"];

router.post(
  "/",
  verifyToken,
  requireRole(authorizedRoles),
  validate(createOpportunitySchema),
  opportunityController.create
);

router.patch(
  "/:id",
  verifyToken,
  requireRole(authorizedRoles),
  validate(updateOpportunitySchema),
  opportunityController.update
);

router.delete(
  "/:id",
  verifyToken,
  requireRole(authorizedRoles),
  opportunityController.remove
);

export default router;
