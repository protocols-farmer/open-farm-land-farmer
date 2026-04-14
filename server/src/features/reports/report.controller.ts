//src/features/reports/report.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { reportService } from "./report.service.js";
import { uploadToCloudinary } from "@/config/cloudinary.js";
import { createHttpError } from "@/utils/error.factory.js";
import { ReportAttachment } from "./report.types.js";
import { SystemRole } from "@prisma-client";

class ReportController {
  submitReport = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const files = req.files as Express.Multer.File[];
    const attachments: ReportAttachment[] = [];

    if (files && files.length > 0) {
      const uploadPromises = files.map((file, index) => {
        const customPublicId = `report_${userId}_${Date.now()}_${index}`;

        return uploadToCloudinary(file.path, "reports", customPublicId).then(
          (result) => {
            return {
              url: result.secure_url,
              publicId: result.public_id,
              resourceType: (file.mimetype.startsWith("image/")
                ? "image"
                : "raw") as "image" | "raw",
            };
          },
        );
      });

      const uploadedResults = await Promise.all(uploadPromises);

      attachments.push(...uploadedResults);
    }

    const report = await reportService.createReport(
      userId,
      req.body,
      attachments,
    );

    res.status(201).json({
      success: true,
      message: "Report submitted. Thank you for making the platform safer!",
      data: report,
    });
  });

  getAllReports = asyncHandler(async (req: Request, res: Response) => {
    const result = await reportService.getReports(req.query as any);

    res.status(200).json({
      success: true,
      data: {
        reports: result.reports,
        pagination: {
          totalItems: result.total,
          totalPages: Math.ceil(result.total / (Number(req.query.limit) || 10)),
          currentPage: Number(req.query.page) || 1,
        },
      },
    });
  });

  getReportById = asyncHandler(async (req: Request, res: Response) => {
    const report = await reportService.getReportById(req.params.id);

    const isAdmin = req.user!.systemRole === SystemRole.SUPER_ADMIN;
    const isOwner = req.user!.id === report.reporterId;

    if (!isAdmin && !isOwner) {
      throw createHttpError(
        403,
        "You do not have permission to view this report.",
      );
    }

    res.status(200).json({ success: true, data: report });
  });

  updateReport = asyncHandler(async (req: Request, res: Response) => {
    const adminId = req.user!.id;
    const updated = await reportService.updateReport(
      req.params.id,
      adminId,
      req.body,
    );

    res.status(200).json({
      success: true,
      message: "Report status updated successfully.",
      data: updated,
    });
  });

  deleteReport = asyncHandler(async (req: Request, res: Response) => {
    await reportService.deleteReport(req.params.id);
    res.status(204).send();
  });
}

export const reportController = new ReportController();
