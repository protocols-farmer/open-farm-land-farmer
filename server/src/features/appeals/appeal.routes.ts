//src/features/appeals/appeal.routes.ts
import { Router } from "express";
import { appealController } from "./appeal.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { validate } from "@/middleware/validate.js";
import { submitAppealSchema, reviewAppealSchema } from "./appeal.validation.js";

const router: Router = Router();

router.post(
  "/",
  verifyToken,
  validate(submitAppealSchema),
  appealController.submitAppeal,
);

router.get(
  "/admin",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  appealController.getAllAppeals,
);

router.patch(
  "/admin/:id/review",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  validate(reviewAppealSchema),
  appealController.reviewAppeal,
);

export default router;
