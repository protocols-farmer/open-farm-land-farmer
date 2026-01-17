import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { notificationsService } from "./notifications.service.js";

class NotificationsController {
  getNotifications = asyncHandler(async (req: Request, res: Response) => {
    const notifications = await notificationsService.getUserNotifications(
      req.user!.id
    );
    res.status(200).json({ status: "success", data: notifications });
  });

  getUnreadCount = asyncHandler(async (req: Request, res: Response) => {
    const data = await notificationsService.getUnreadCount(req.user!.id);
    res.status(200).json({ status: "success", data });
  });

  readNotification = asyncHandler(async (req: Request, res: Response) => {
    await notificationsService.markAsRead(req.params.id, req.user!.id);
    res.status(200).json({ status: "success", message: "Marked as read." });
  });

  readAllNotifications = asyncHandler(async (req: Request, res: Response) => {
    await notificationsService.markAllAsRead(req.user!.id);
    res.status(200).json({ status: "success", message: "All marked as read." });
  });
}

export const notificationsController = new NotificationsController();
