// server/src/features/tag/tag.controller.ts

import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { tagService } from "./tag.service.js";
import { PostCategory } from "@prisma-client";

class TagController {
  getAllTags = asyncHandler(async (req: Request, res: Response) => {
    const { category, authorId, likedByUserId, savedByUserId } = req.query;

    const tags = await tagService.getAllTags({
      category: category as PostCategory,
      authorId: authorId as string,
      likedByUserId: likedByUserId as string,
      savedByUserId: savedByUserId as string,
    });

    res.status(200).json({
      status: "success",
      data: tags,
    });
  });
}

export const tagController = new TagController();
