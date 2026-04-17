//src/features/admin/admin.routes.ts
import { Router } from "express";
import { adminController } from "./admin.controller.js";
import { requireRole } from "@/middleware/admin.middleware.js";
import { verifyToken } from "@/middleware/auth.middleware.js";
import { isVerified } from "@/middleware/isVerified.js";
import { validate } from "@/middleware/validate.js";
import {
  updateUserRoleSchema,
  updateUserStatusSchema,
  updateSystemConfigSchema,
} from "./admin.validation.js";
import { apiLimiter } from "@/middleware/rateLimiter.js";

const router: Router = Router();

router.use(apiLimiter);

router.get("/system-config", adminController.getSystemConfig);

router.get(
  "/stats",
  verifyToken,
  requireRole(["SUPER_ADMIN", "SYSTEM_CONTENT_CREATOR"]),
  adminController.getDashboardStats,
);

router.patch(
  "/system-config",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  validate(updateSystemConfigSchema),
  adminController.updateSystemConfig,
);

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
  validate(updateUserRoleSchema),
  adminController.updateUserRole,
);

router.patch(
  "/users/:id/status",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  validate(updateUserStatusSchema),
  adminController.updateUserStatus,
);

router.delete(
  "/users/:id",
  verifyToken,
  isVerified,
  requireRole(["SUPER_ADMIN"]),
  adminController.deleteUser,
);

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
