// src/features/appeals/appeal.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { appealService } from "./appeal.service.js";
import { createHttpError } from "@/utils/error.factory.js";
import { AppealStatus } from "@prisma-client";

class AppealController {
  // POST /appeals
  submitAppeal = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { reason } = req.body;

    if (!reason || reason.trim().length < 10) {
      throw createHttpError(
        400,
        "Appeal reason must be at least 10 characters long.",
      );
    }

    const appeal = await appealService.submitAppeal(userId, { reason });

    res.status(201).json({
      status: "success",
      message: "Appeal submitted successfully.",
      data: appeal,
    });
  });

  // GET /admin/appeals
  getAllAppeals = asyncHandler(async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    const { appeals, total } = await appealService.getAppeals({
      page,
      limit,
      status: req.query.status as AppealStatus,
      q: req.query.q as string,
    });

    res.status(200).json({
      status: "success",
      data: {
        appeals,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        },
      },
    });
  });

  // PATCH /admin/appeals/:id/review
  reviewAppeal = asyncHandler(async (req: Request, res: Response) => {
    const appealId = req.params.id;
    const adminId = req.user!.id;
    const { status, adminNotes } = req.body;

    if (!status || !Object.values(AppealStatus).includes(status)) {
      throw createHttpError(400, "Invalid review status provided.");
    }

    if (status === "PENDING") {
      throw createHttpError(400, "You must select APPROVED or REJECTED.");
    }

    const updatedAppeal = await appealService.reviewAppeal(appealId, adminId, {
      status,
      adminNotes,
    });

    res.status(200).json({
      status: "success",
      message: `Appeal has been ${status.toLowerCase()}.`,
      data: updatedAppeal,
    });
  });
}

export const appealController = new AppealController();
