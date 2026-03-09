// server/src/features/tag/tag.controller.ts

import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { tagService, TagQueryFilters } from "./tag.service.js";
import { PostCategory } from "@prisma-client";

class TagController {
  getAllTags = asyncHandler(async (req: Request, res: Response) => {
    const { context, category, authorId, likedByUserId, savedByUserId } =
      req.query;

    const filters: TagQueryFilters = {
      context:
        context === "POST" || context === "OPPORTUNITY" ? context : undefined,
      category: category as PostCategory | undefined,
      authorId: authorId as string | undefined,
      likedByUserId: likedByUserId as string | undefined,
      savedByUserId: savedByUserId as string | undefined,
    };

    const tags = await tagService.getAllTags(filters);

    res.status(200).json({
      status: "success",
      data: tags,
    });
  });
}

export const tagController = new TagController();
