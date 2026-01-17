import { asyncHandler } from "@/middleware/asyncHandler.js";
import { Request, Response } from "express";
import { projectUpdateService } from "./projectUpdate.service.js";

class ProjectUpdateController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { postId } = req.params;
    const data = req.body;
    const imageFile = req.file;

    const newUpdate = await projectUpdateService.create(
      userId,
      postId,
      data,
      imageFile
    );
    res
      .status(201)
      .json({
        status: "success",
        message: "Project update added.",
        data: newUpdate,
      });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { updateId } = req.params;
    const data = req.body;
    const imageFile = req.file;

    const updated = await projectUpdateService.update(
      userId,
      updateId,
      data,
      imageFile
    );
    res
      .status(200)
      .json({
        status: "success",
        message: "Project update modified.",
        data: updated,
      });
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { updateId } = req.params;

    await projectUpdateService.delete(userId, updateId);
    res.status(204).send();
  });
}

export const projectUpdateController = new ProjectUpdateController();
