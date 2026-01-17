import { Router } from "express";
import { notificationsController } from "./notifications.controller.js";
import { verifyToken } from "@/middleware/auth.middleware.js";

const router: Router = Router();

router.use(verifyToken); // Must be logged in to see your own alerts

router.get("/", notificationsController.getNotifications);
router.get("/unread-count", notificationsController.getUnreadCount);
router.patch("/:id/read", notificationsController.readNotification);
router.patch("/read-all", notificationsController.readAllNotifications);

export default router;
