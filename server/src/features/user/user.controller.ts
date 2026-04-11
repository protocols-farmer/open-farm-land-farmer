//src/features/user/user.controller.ts
import { Request, Response } from "express";
import { SystemRole } from "@prisma-client";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { createHttpError } from "@/utils/error.factory.js";
import { userService } from "./user.service.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "@/config/cloudinary.js";
import prisma from "@/db/prisma.js";
import { logger } from "@/config/logger.js";

class UserController {
  getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.findUserById(req.user!.id);
    if (!user) throw createHttpError(404, "User profile not found.");

    return res.status(200).json({
      status: "success",
      data: { user },
    });
  });

  updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const updateData = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const currentUser = await userService.findUserById(userId);
    if (!currentUser) throw createHttpError(404, "User not found.");

    const newlyUploadedPublicIds: string[] = [];

    try {
      const version = Date.now();

      if (files?.profileImage?.[0]) {
        const result = await uploadToCloudinary(
          files.profileImage[0].path,
          "user_assets",
          `profile_${userId}_${version}`,
        );
        updateData.profileImage = result.secure_url;
        updateData.profileImagePublicId = result.public_id;
        newlyUploadedPublicIds.push(result.public_id);
      }

      if (files?.bannerImage?.[0]) {
        const result = await uploadToCloudinary(
          files.bannerImage[0].path,
          "user_assets",
          `banner_${userId}_${version}`,
        );
        updateData.bannerImage = result.secure_url;
        updateData.bannerImagePublicId = result.public_id;
        newlyUploadedPublicIds.push(result.public_id);
      }

      const updatedUser = await userService.updateUserProfile(
        userId,
        updateData,
      );

      const cleanupPromises = [];
      if (updateData.profileImage && currentUser.profileImagePublicId) {
        cleanupPromises.push(
          deleteFromCloudinary(currentUser.profileImagePublicId),
        );
      }
      if (updateData.bannerImage && currentUser.bannerImagePublicId) {
        cleanupPromises.push(
          deleteFromCloudinary(currentUser.bannerImagePublicId),
        );
      }

      if (cleanupPromises.length > 0) {
        Promise.allSettled(cleanupPromises).then((results) => {
          results.forEach((res) => {
            if (res.status === "rejected") {
              logger.error(
                { err: res.reason },
                "⚠️ Cloudinary Orphan: Failed to delete old asset.",
              );
            }
          });
        });
      }

      return res
        .status(200)
        .json({ status: "success", data: { user: updatedUser } });
    } catch (error) {
      if (newlyUploadedPublicIds.length > 0) {
        logger.fatal(
          { userId, assetIds: newlyUploadedPublicIds },
          "🚨 ROLLBACK FAILURE: Manual Cloudinary cleanup required.",
        );
        await Promise.allSettled(
          newlyUploadedPublicIds.map((id) => deleteFromCloudinary(id)),
        );
      }
      throw error;
    }
  });

  /**
   * Fetches a public user profile by username.
   * Flattens counts and enforces privacy/moderation rules.
   */
  getUserByUsername = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const currentUserId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (!user || user.status === "BANNED" || user.status === "DEACTIVATED") {
      throw createHttpError(404, "User not found.");
    }

    let isFollowedByCurrentUser = false;
    if (currentUserId) {
      const followRecord = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: currentUserId,
            followingId: user.id,
          },
        },
      });
      isFollowedByCurrentUser = !!followRecord;
    }

    const publicProfile = userService.getPublicProfile(user);

    const finalUser = {
      ...publicProfile,
      postsCount: user._count.posts,
      isFollowedByCurrentUser,
    };

    res.status(200).json({
      status: "success",
      data: { user: finalUser },
    });
  });
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.findUserById(req.params.id);

    if (!user || user.status === "BANNED") {
      throw createHttpError(404, "User not found.");
    }

    const isOwner = req.user?.id === user.id;
    const isAdmin = req.user?.systemRole === "SUPER_ADMIN";

    const responseData =
      isOwner || isAdmin ? user : userService.getPublicProfile(user);

    res.status(200).json({
      status: "success",
      data: responseData,
    });
  });

  deleteMyAccount = asyncHandler(async (req: Request, res: Response) => {
    await userService.deleteUserAccount(req.user!.id);
    res.status(204).send();
  });

  deleteUserById = asyncHandler(async (req: Request, res: Response) => {
    if (req.user?.systemRole !== SystemRole.SUPER_ADMIN)
      throw createHttpError(403, "Admin access required.");
    await userService.deleteUserAccount(req.params.id);
    res.status(204).send();
  });
}

export const userController = new UserController();
