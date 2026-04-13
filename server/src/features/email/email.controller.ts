//src/features/email/email.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { emailService } from "./email.service.js";
import { createHttpError } from "@/utils/error.factory.js";
import prisma from "@/db/prisma.js";
import { logger } from "@/config/logger.js";
import { config } from "@/config/index.js";

class EmailController {
  /**
   * Send a Manual System Update to all active users.
   * This is used for major platform announcements.
   */
  sendBulkSystemUpdate = asyncHandler(async (req: Request, res: Response) => {
    const { title, version, contentPreview, linkPath } = req.body;

    // 🚜 Scenario Fix: Immediate validation with clear error
    if (!title || !contentPreview) {
      throw createHttpError(
        400,
        "Title and content preview are required for a platform broadcast.",
      );
    }

    // 1. Fetch all active users who have marketing emails enabled
    const users = await prisma.user.findMany({
      where: {
        status: "ACTIVE",
        settings: { emailMarketing: true },
      },
      select: { email: true, name: true },
    });

    if (users.length === 0) {
      // 🚜 Scenario Fix: Clear feedback when the "broadcast" has no audience
      return res.status(200).json({
        status: "success",
        message: "No eligible users found with marketing emails enabled.",
      });
    }

    const url = `${config.socialAuth.frontendUrl}${linkPath || "/updates"}`;

    // 2. Trigger emails using allSettled to prevent one failure from killing the batch
    const emailPromises = users.map((user) =>
      emailService.sendSystemUpdate(user.email, {
        title,
        version,
        contentPreview,
        url,
      }),
    );

    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    // 🚜 Scenario Fix: Detailed developer logging for bulk actions
    logger.info(
      {
        adminId: req.user?.id,
        totalAudience: users.length,
        successful,
        failed,
        broadcastTitle: title,
      },
      "📢 Admin triggered bulk system update email.",
    );

    return res.status(200).json({
      status: "success",
      message: `Announcement broadcast completed. Sent to ${successful}/${users.length} users.${failed > 0 ? ` (${failed} deliveries failed)` : ""}`,
    });
  });

  /**
   * Trigger a test email to the logged-in admin.
   * Useful for developers to check Mailgun configuration and template rendering.
   */
  sendTestEmail = asyncHandler(async (req: Request, res: Response) => {
    const userEmail = req.user!.email;
    const userName = req.user!.name;

    logger.info(
      { adminId: req.user!.id, userEmail },
      "🧪 Attempting to send test email...",
    );

    try {
      await emailService.sendVerificationEmail(userEmail, {
        name: userName,
        url: `${config.socialAuth.frontendUrl}/auth/verify-email?token=test-token`,
      });

      return res.status(200).json({
        status: "success",
        message: `Test verification email successfully dispatched to ${userEmail}.`,
      });
    } catch (error: any) {
      // 🚜 Scenario Fix: Detailed logging for developer if test fails
      logger.error(
        { err: error, adminId: req.user!.id },
        "❌ Test email failed. Check Mailgun API key or Domain status.",
      );
      throw error;
    }
  });
}

export const emailController = new EmailController();
