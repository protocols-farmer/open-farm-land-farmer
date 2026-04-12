import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { createHttpError } from "@/utils/error.factory.js";
import { updateService } from "./update.service.js";

class UpdateController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const authorId = req.user?.id;
    if (!authorId) throw createHttpError(401, "Authentication required.");

    const newUpdate = await updateService.create(req.body, authorId);
    res.status(201).json({ success: true, data: newUpdate });
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
    const take = req.query.take ? parseInt(req.query.take as string) : 10;
    const { updates, total } = await updateService.findAll({ skip, take });
    res.status(200).json({ success: true, data: updates, total });
  });

  findOne = asyncHandler(async (req: Request, res: Response) => {
    const update = await updateService.findOne(req.params.id);
    res.status(200).json({ success: true, data: update });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const userRole = req.user?.systemRole;
    if (!userId || !userRole) throw createHttpError(401, "Unauthorized");

    const updated = await updateService.update(
      req.params.id,
      req.body,
      userId,
      userRole,
    );
    res.status(200).json({ success: true, data: updated });
  });

  remove = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const userRole = req.user?.systemRole;
    if (!userId || !userRole) throw createHttpError(401, "Unauthorized");

    await updateService.remove(req.params.id, userId, userRole);
    res.status(204).send();
  });

  getLatestVersion = asyncHandler(async (_req: Request, res: Response) => {
    const versionData = await updateService.getLatestVersion();

    if (!versionData) {
      return res.status(200).json({
        success: true,
        data: {
          version: "1.0.0-beta.1",
          title: "Initial public release",
        },
      });
    }
    return res.status(200).json({ success: true, data: versionData });
  });
}

export const updateController = new UpdateController();
