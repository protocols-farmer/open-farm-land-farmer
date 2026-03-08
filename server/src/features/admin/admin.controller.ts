//src/features/admin/admin.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { adminService } from "./admin.service.js";
import { createHttpError } from "@/utils/error.factory.js";
import { SystemRole } from "@prisma-client";

class AdminController {
  // GET /admin/stats
  getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await adminService.getDashboardStats();
    res.status(200).json({ status: "success", data: stats });
  });

  // GET /admin/users
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const { users, total } = await adminService.getAllUsers(req.query);
    const limit = parseInt(req.query.limit as string) || 10;
    res.status(200).json({
      status: "success",
      data: {
        users,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: parseInt(req.query.page as string) || 1,
        },
      },
    });
  });

  // GET /admin/posts
  getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    const { posts, total } = await adminService.getAllPosts(req.query);
    const limit = parseInt(req.query.limit as string) || 10;
    res.status(200).json({
      status: "success",
      data: {
        posts,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: parseInt(req.query.page as string) || 1,
        },
      },
    });
  });

  // GET /admin/opportunities
  getAllOpportunities = asyncHandler(async (req: Request, res: Response) => {
    const { opportunities, total } = await adminService.getAllOpportunities(
      req.query,
    );
    const limit = parseInt(req.query.limit as string) || 10;
    res.status(200).json({
      status: "success",
      data: {
        opportunities,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: parseInt(req.query.page as string) || 1,
        },
      },
    });
  });

  // GET /admin/updates
  getAllUpdates = asyncHandler(async (req: Request, res: Response) => {
    const { updates, total } = await adminService.getAllUpdates(req.query);
    const limit = parseInt(req.query.limit as string) || 10;
    res.status(200).json({
      status: "success",
      data: {
        updates,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: parseInt(req.query.page as string) || 1,
        },
      },
    });
  });

  // GET /admin/comments
  getAllComments = asyncHandler(async (req: Request, res: Response) => {
    const { comments, total } = await adminService.getAllComments(req.query);
    const limit = parseInt(req.query.limit as string) || 10;
    res.status(200).json({
      status: "success",
      data: {
        comments,
        pagination: {
          totalItems: total,
          totalPages: Math.ceil(total / limit),
          currentPage: parseInt(req.query.page as string) || 1,
        },
      },
    });
  });

  // PATCH /admin/users/:id/role
  updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !Object.values(SystemRole).includes(role)) {
      throw createHttpError(400, "Invalid role provided.");
    }

    const updatedUser = await adminService.updateUserRole(id, role);
    res.status(200).json({ status: "success", data: updatedUser });
  });

  // DELETE handlers
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (req.user?.id === id) {
      throw createHttpError(
        400,
        "Admins cannot delete their own account via this route.",
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

  // System Config handlers
  getSystemConfig = asyncHandler(async (_req: Request, res: Response) => {
    const config = await adminService.getSystemConfig();
    res.status(200).json({ status: "success", data: config });
  });

  updateSystemConfig = asyncHandler(async (req: Request, res: Response) => {
    const { maintenanceMode, maintenanceMessage } = req.body;
    const updated = await adminService.updateSystemConfig({
      maintenanceMode,
      maintenanceMessage,
    });
    res.status(200).json({ status: "success", data: updated });
  });
}

export const adminController = new AdminController();
