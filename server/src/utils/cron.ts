// src/utils/cron.ts
import cron from "node-cron";
import prisma from "@/db/prisma.js";
import { logger } from "@/config/logger.js";

/**
 * Scheduled tasks to maintain database health.
 */
export const initCronJobs = () => {
  // Task: Cleanup Refresh Tokens
  // Runs every day at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    logger.info("[Cron] Starting Refresh Token cleanup...");

    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          OR: [
            { expiresAt: { lt: new Date() } }, // Naturally expired tokens
            { revoked: true }, // Explicitly revoked tokens
          ],
        },
      });

      if (result.count > 0) {
        logger.info(
          { deletedCount: result.count },
          `[Cron] Cleanup successful. Removed old/revoked tokens.`
        );
      } else {
        logger.info("[Cron] Cleanup finished. No tokens required deletion.");
      }
    } catch (error) {
      logger.error({ err: error }, "[Cron] Error during Refresh Token cleanup");
    }
  });

  logger.info("⏰ Cron jobs initialized successfully.");
};
