//src/features/email/email.routes.ts
import { Router } from "express";
import { emailController } from "./email.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { validate } from "@/middleware/validate.js";
import { z } from "zod";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();

// 🚜 SECURITY FIX: Apply API rate limiting to prevent administrative email tool abuse.
router.use(apiLimiter);

// Validation schema for manual updates
const systemUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(5, "Title is too short."),
    version: z.string().optional(),
    contentPreview: z
      .string()
      .min(20, "Please provide a more descriptive preview."),
    linkPath: z.string().optional(),
  }),
});

/**
 * ADMIN ONLY ROUTES
 * Protected by verifyToken and your requireRole middleware.
 */
router.use(verifyToken);

// POST /api/v1/admin/emails/test -> Send a test email to yourself
router.post(
  "/test",
  requireRole(["SUPER_ADMIN"]),
  emailController.sendTestEmail,
);

// POST /api/v1/admin/emails/broadcast-update -> Manual marketing blast
router.post(
  "/broadcast-update",
  requireRole(["SUPER_ADMIN"]),
  validate(systemUpdateSchema),
  emailController.sendBulkSystemUpdate,
);

export default router;
