//src/features/admin/admin.routes.ts
import { Router } from "express";
import { adminController } from "./admin.controller.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { isVerified } from "@/middleware/isVerified.js"; // 🚜 Standardized security
import { validate } from "@/middleware/validate.js";
import {
  updateUserRoleSchema,
  updateUserStatusSchema,
  updateSystemConfigSchema,
} from "./admin.validation.js"; // 🚜 Validation imports

const router: Router = Router();

// ==========================================
// 1. PUBLIC ROUTES
// ==========================================
router.get("/system-config", adminController.getSystemConfig);

// ==========================================
// 2. SHARED ADMIN ROUTES (Super Admin & Content Creator)
// ==========================================
router.get(
  "/stats",
  verifyToken,
  requireRole(["SUPER_ADMIN", "SYSTEM_CONTENT_CREATOR"]),
  adminController.getDashboardStats,
);

// ==========================================
// 3. SUPER ADMIN ONLY ROUTES
// ==========================================

// --- System Maintenance Toggle ---
router.patch(
  "/system-config",
  verifyToken,
  isVerified, // 🚜 Verified check for system-wide changes
  requireRole(["SUPER_ADMIN"]),
  validate(updateSystemConfigSchema), // 🚜 Prevents payload bloat
  adminController.updateSystemConfig,
);

// --- User Management ---
router.get(
  "/users",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  adminController.getAllUsers,
);

router.patch(
  "/users/:id/role",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  validate(updateUserRoleSchema), // 🚜 Strictly enforces SystemRole enum
  adminController.updateUserRole,
);

router.patch(
  "/users/:id/status",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  validate(updateUserStatusSchema), // 🚜 Enforces reason requirement for sanctions
  adminController.updateUserStatus,
);

router.delete(
  "/users/:id",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  adminController.deleteUser,
);

// --- Post Management ---
router.get(
  "/posts",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  adminController.getAllPosts,
);

router.delete(
  "/posts/:id",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  adminController.deletePost,
);

// --- Opportunity Management ---
router.get(
  "/opportunities",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  adminController.getAllOpportunities,
);

router.delete(
  "/opportunities/:id",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  adminController.deleteOpportunity,
);

// --- Update Management ---
router.get(
  "/updates",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  adminController.getAllUpdates,
);

router.delete(
  "/updates/:id",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  adminController.deleteUpdate,
);

// --- Comment Management ---
router.get(
  "/comments",
  verifyToken,
  requireRole(["SUPER_ADMIN"]),
  adminController.getAllComments,
);

router.delete(
  "/comments/:id",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  adminController.deleteComment,
);

export default router;
