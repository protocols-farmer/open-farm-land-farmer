//src/features/guideSection/guideStep.controller.ts
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { Request, Response } from "express";
import { guideStepService } from "./guideStep.service.js";

class GuideStepController {
  /**
   * Adds a new technical step to a guide.
   */
  create = asyncHandler(async (req: Request, res: Response) => {
    const newStep = await guideStepService.create(
      req.user!.id,
      req.params.postId,
      req.body,
    );

    // 🚜 FIXED: Changed 'status: "success"' to 'success: true'
    res.status(201).json({
      success: true,
      message: "Guide step added.",
      data: newStep,
    });
  });

  /**
   * Modifies an existing guide step.
   */
  update = asyncHandler(async (req: Request, res: Response) => {
    const updatedStep = await guideStepService.update(
      req.user!.id,
      req.params.stepId,
      req.body,
    );

    // 🚜 FIXED: Changed 'status: "success"' to 'success: true'
    res.status(200).json({
      success: true,
      message: "Guide step updated.",
      data: updatedStep,
    });
  });

  /**
   * Purges a guide step from the database.
   */
  delete = asyncHandler(async (req: Request, res: Response) => {
    await guideStepService.delete(req.user!.id, req.params.stepId);
    res.status(204).send();
  });
}

export const guideStepController = new GuideStepController();
