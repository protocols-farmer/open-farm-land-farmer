//src/features/notifications/notifications.routes.ts
import { Router } from "express";
import { notificationsController } from "./notifications.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";

const router: Router = Router();

router.get("/", verifyToken, notificationsController.getNotifications);
router.get(
  "/unread-count",
  verifyToken,
  notificationsController.getUnreadCount,
);
router.patch(
  "/:id/read",
  verifyToken,
  notificationsController.readNotification,
);
router.patch(
  "/read-all",
  verifyToken,
  notificationsController.readAllNotifications,
);

export default router;
