//src/features/settings/settings.service.ts
import prisma from "@/db/prisma.js";
import { createHttpError } from "@/utils/error.factory.js";
import { UpdateSettingsDto } from "./settings.types.js";
import { logger } from "@/config/logger.js";

class SettingsService {
  /**
   * 🚜 Surgical Fix: Strips undefined keys so Prisma doesn't see them.
   * Required because of 'exactOptionalPropertyTypes: true' in tsconfig.
   */
  private cleanPayload<T extends object>(data: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined),
    ) as Partial<T>;
  }

  /**
   * Retrieves user settings.
   */
  public async getSettings(userId: string) {
    try {
      let settings = await prisma.userSettings.findUnique({
        where: { userId },
      });

      if (!settings) {
        logger.info(
          { userId },
          "⚙️ Settings record missing. Creating defaults.",
        );
        settings = await prisma.userSettings.create({
          data: { userId },
        });
      }

      return settings;
    } catch (error) {
      logger.error({ userId, error }, "❌ Failed to retrieve user settings.");
      throw createHttpError(500, "Unable to load your account settings.");
    }
  }

  /**
   * Updates user settings using an upsert.
   */
  public async updateSettings(userId: string, data: UpdateSettingsDto) {
    try {
      // 🚜 Remove undefined values before passing to Prisma
      const cleanData = this.cleanPayload(data);

      const updatedSettings = await prisma.userSettings.upsert({
        where: { userId },
        update: {
          ...cleanData,
          updatedAt: new Date(),
        },
        create: {
          userId,
          ...cleanData,
        },
      });

      logger.info({ userId }, "✅ User settings updated successfully.");
      return updatedSettings;
    } catch (error) {
      logger.error(
        { userId, error, data },
        "❌ Failed to update user settings.",
      );
      throw createHttpError(
        500,
        "Failed to save your settings. Please try again.",
      );
    }
  }
}

export const settingsService = new SettingsService();
