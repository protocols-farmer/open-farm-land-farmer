//src/features/settings/settings.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { settingsService } from "./settings.service.js";
import { UpdateSettingsInput } from "./settings.validation.js";
import { UpdateSettingsDto } from "./settings.types.js";

class SettingsController {
  getSettings = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const settings = await settingsService.getSettings(userId);

    res.status(200).json({
      success: true,
      data: settings,
    });
  });

  updateSettings = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    /**
     * This cast is the important part—it solves the 'exactOptionalPropertyTypes' error.
     */
    const updateData = req.body as UpdateSettingsInput;

    const updatedSettings = await settingsService.updateSettings(
      userId,
      updateData as UpdateSettingsDto,
    );

    res.status(200).json({
      success: true,
      message: "Your preferences have been updated.",
      data: updatedSettings,
    });
  });
}

export const settingsController = new SettingsController();
