//src/features/admin/admin.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { adminService } from "./admin.service.js";
import { createHttpError } from "@/utils/error.factory.js";
import prisma from "@/db/prisma.js";

class AdminController {
  getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await adminService.getDashboardStats();
    res.status(200).json({ success: true, data: stats });
  });

  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { users, total } = await adminService.getAllUsers({
      ...req.query,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: {
        users,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        },
      },
    });
  });

  getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { posts, total } = await adminService.getAllPosts({
      ...req.query,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        },
      },
    });
  });

  getAllOpportunities = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { opportunities, total } = await adminService.getAllOpportunities({
      ...req.query,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: {
        opportunities,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        },
      },
    });
  });

  getAllUpdates = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { updates, total } = await adminService.getAllUpdates({
      ...req.query,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: {
        updates,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        },
      },
    });
  });

  getAllComments = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const { comments, total } = await adminService.getAllComments({
      ...req.query,
      page,
      limit,
    });

    res.status(200).json({
      success: true,
      data: {
        comments,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
        },
      },
    });
  });

  updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    if (req.user?.id === id) {
      throw createHttpError(400, "Cannot change your own role here.");
    }

    // 🛡️ SECURITY: Prevent demoting another Super Admin
    const targetUser = await prisma.user.findUnique({
      select: { systemRole: true },
      where: { id },
    });
    if (!targetUser) throw createHttpError(404, "User not found.");
    if (targetUser.systemRole === "SUPER_ADMIN") {
      throw createHttpError(
        403,
        "Forbidden: Cannot modify the role of another Super Admin.",
      );
    }

    const updatedUser = await adminService.updateUserRole(id, role);
    res.status(200).json({ success: true, data: updatedUser });
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.user?.id === id) {
      throw createHttpError(
        400,
        "Admins cannot delete their own account via this route. Use the 'Me' route instead.",
      );
    }
    const targetUser = await prisma.user.findUnique({
      select: { systemRole: true },
      where: { id },
    });
    if (!targetUser) throw createHttpError(404, "User not found.");
    if (targetUser.systemRole === "SUPER_ADMIN") {
      throw createHttpError(
        403,
        "Forbidden: Cannot delete another Super Admin.",
      );
    }

    await adminService.deleteUser(id);
    res.status(204).send();
  });

  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await adminService.deletePost(id);
    res.status(204).send();
  });

  deleteOpportunity = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await adminService.deleteOpportunity(id);
    res.status(204).send();
  });

  deleteUpdate = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await adminService.deleteUpdate(id);
    res.status(204).send();
  });

  deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await adminService.deleteComment(id);
    res.status(204).send();
  });

  getSystemConfig = asyncHandler(async (_req: Request, res: Response) => {
    const config = await adminService.getSystemConfig();
    res.status(200).json({ success: true, data: config });
  });

  updateSystemConfig = asyncHandler(async (req: Request, res: Response) => {
    const { maintenanceMode, maintenanceMessage } = req.body;
    const updated = await adminService.updateSystemConfig({
      maintenanceMode,
      maintenanceMessage,
    });
    res.status(200).json({ success: true, data: updated });
  });

  updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, reason, expiresAt } = req.body;
    const adminId = req.user!.id;

    if (adminId === id) {
      throw createHttpError(400, "Cannot change your own status here.");
    }

    const targetUser = await prisma.user.findUnique({
      select: { systemRole: true },
      where: { id },
    });
    if (!targetUser) throw createHttpError(404, "User not found.");
    if (targetUser.systemRole === "SUPER_ADMIN") {
      throw createHttpError(
        403,
        "Forbidden: Cannot suspend or ban another Super Admin.",
      );
    }

    const updatedUser = await adminService.updateUserStatus(
      id,
      status,
      adminId,
      reason,
      expiresAt ? new Date(expiresAt) : null,
    );

    res.status(200).json({ success: true, data: updatedUser });
  });
}

export const adminController = new AdminController();
