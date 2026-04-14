//src/features/reports/report.routes.ts
import { Router } from "express";
import { reportController } from "./report.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { validate } from "@/middleware/validate.js";
import { uploadDocument } from "@/middleware/multer.config.js";
import {
  createReportSchema,
  updateReportAdminSchema,
  reportQuerySchema,
} from "./report.validation.js";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();

router.use(apiLimiter);

/**
 * 📝 USER ENDPOINTS
 */

router.post(
  "/",
  verifyToken,
  uploadDocument.array("attachments", 5),
  validate(createReportSchema),
  reportController.submitReport,
);

router.get("/:id", verifyToken, reportController.getReportById);

/**
 * 👑 ADMIN ENDPOINTS (Super Admin only)
 */

router.get(
  "/admin/all",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  validate(reportQuerySchema),
  reportController.getAllReports,
);

router.patch(
  "/admin/:id",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  validate(updateReportAdminSchema),
  reportController.updateReport,
);

router.delete(
  "/admin/:id",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  reportController.deleteReport,
);

export default router;
