import prisma from "@/db/prisma.js";
import { createHttpError } from "@/utils/error.factory.js";

export class NotificationsService {
  /**
   * Get all notifications for a specific user with sender details.
   */
  async getUserNotifications(recipientId: string) {
    return prisma.notification.findMany({
      where: { recipientId },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            name: true,
            profileImage: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Get the count of unread notifications for the "Red Dot" on the frontend.
   */
  async getUnreadCount(recipientId: string) {
    const count = await prisma.notification.count({
      where: { recipientId, read: false },
    });
    return { unreadCount: count };
  }

  /**
   * Mark a single notification as read.
   */
  async markAsRead(notificationId: string, userId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification || notification.recipientId !== userId) {
      throw createHttpError(404, "Notification not found.");
    }

    return prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }

  /**
   * Mark ALL notifications as read (for the "Clear All" button).
   */
  async markAllAsRead(recipientId: string) {
    return prisma.notification.updateMany({
      where: { recipientId, read: false },
      data: { read: true },
    });
  }
}

export const notificationsService = new NotificationsService();
