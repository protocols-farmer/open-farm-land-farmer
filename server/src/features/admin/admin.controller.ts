//src/features/admin/admin.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { adminService } from "./admin.service.js";
import { createHttpError } from "@/utils/error.factory.js";

class AdminController {
  /**
   * Fetches high-level metrics for the administration dashboard.
   */
  getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
    const stats = await adminService.getDashboardStats();
    res.status(200).json({ success: true, data: stats });
  });

  /**
   * Retrieves a paginated list of users with search and sorting.
   */
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

  /**
   * Modifies a user's system role.
   * Manual logic removed; handled by updateUserRoleSchema.
   */
  updateUserRole = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { role } = req.body;

    const updatedUser = await adminService.updateUserRole(id, role);
    res.status(200).json({ success: true, data: updatedUser });
  });

  /**
   * Deletes a user account. Admins are blocked from self-deletion.
   */
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (req.user?.id === id) {
      throw createHttpError(
        400,
        "Admins cannot delete their own account via this route. Use the 'Me' route instead.",
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

  /**
   * Updates global system settings (e.g., Maintenance Mode).
   */
  updateSystemConfig = asyncHandler(async (req: Request, res: Response) => {
    const { maintenanceMode, maintenanceMessage } = req.body;
    const updated = await adminService.updateSystemConfig({
      maintenanceMode,
      maintenanceMessage,
    });
    res.status(200).json({ success: true, data: updated });
  });

  /**
   * Updates user status (Ban/Suspend/Active).
   * Manual logic removed; validation and refinement handled by updateUserStatusSchema.
   */
  updateUserStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, reason, expiresAt } = req.body;
    const adminId = req.user!.id;

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
