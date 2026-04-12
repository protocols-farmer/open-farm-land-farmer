//src/features/guideSection/guideSection.controller.ts
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { Request, Response } from "express";
import { guideSectionService } from "./guideSection.service.js";

class GuideSectionController {
  /**
   * Appends a new technical section to a specific guide step.
   */
  create = asyncHandler(async (req: Request, res: Response) => {
    const newSection = await guideSectionService.create(
      req.user!.id,
      req.params.stepId,
      req.body,
      req.file,
    );

    res.status(201).json({
      success: true,
      message: "Guide section added.",
      data: newSection,
    });
  });

  /**
   * Modifies an existing section's content, title, or media.
   */
  update = asyncHandler(async (req: Request, res: Response) => {
    const updatedSection = await guideSectionService.update(
      req.user!.id,
      req.params.sectionId,
      req.body,
      req.file,
    );

    res.status(200).json({
      success: true,
      message: "Guide section modified.",
      data: updatedSection,
    });
  });

  /**
   * Deletes a guide section and purges associated assets.
   */
  delete = asyncHandler(async (req: Request, res: Response) => {
    await guideSectionService.delete(req.user!.id, req.params.sectionId);
    res.status(204).send();
  });
}

export const guideSectionController = new GuideSectionController();
