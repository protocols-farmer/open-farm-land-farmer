//src/features/appeals/appeal.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { appealService } from "./appeal.service.js";
import { AppealStatus } from "@prisma-client";

class AppealController {
  /**
   * Users submit an appeal for an active sanction.
   * Manual length check removed; handled by submitAppealSchema.
   */
  submitAppeal = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { reason } = req.body;

    const appeal = await appealService.submitAppeal(userId, { reason });

    res.status(201).json({
      success: true,
      message: "Appeal submitted successfully.",
      data: appeal,
    });
  });

  /**
   * Admins fetch all appeals for review.
   */
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
      success: true,
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

  /**
   * Admins approve or reject an appeal.
   * Manual enum and "PENDING" checks removed; handled by reviewAppealSchema.
   */
  reviewAppeal = asyncHandler(async (req: Request, res: Response) => {
    const appealId = req.params.id;
    const adminId = req.user!.id;
    const { status, adminNotes } = req.body;

    const updatedAppeal = await appealService.reviewAppeal(appealId, adminId, {
      status,
      adminNotes,
    });

    res.status(200).json({
      success: true,
      message: `Appeal has been ${status.toLowerCase()}.`,
      data: updatedAppeal,
    });
  });
}

export const appealController = new AppealController();
