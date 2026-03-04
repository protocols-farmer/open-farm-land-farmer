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

    res.status(200).json({
      status: "success",
      data: { user },
    });
  });

  /**
   * Updates the authenticated user's profile information and images.
   * Handles Cloudinary uploads and cleans up old assets using stored public IDs.
   */
  /**
   * Updates the authenticated user's profile information and images.
   * Handles Cloudinary uploads and cleans up old assets only after DB confirmation.
   */
  updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const updateData = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Fetch current user to have the old public IDs ready for cleanup
    const currentUser = await userService.findUserById(userId);
    if (!currentUser) throw createHttpError(404, "User not found.");

    const newlyUploadedPublicIds: string[] = [];

    // 2. Normalize empty strings/nulls from FormData to maintain DB integrity
    const fieldsToNullify = [
      "bio",
      "title",
      "location",
      "twitterUrl",
      "githubUrl",
      "websiteUrl",
    ];
    fieldsToNullify.forEach((field) => {
      if (updateData[field] === "" || updateData[field] === "null") {
        updateData[field] = null;
      }
    });

    try {
      const version = Date.now();

      // 3. Handle New Profile Image Upload
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

      // 4. Handle New Banner Image Upload
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

      // 5. Update Database - This is the "Point of No Return"
      const updatedUser = await userService.updateUserProfile(
        userId,
        updateData,
      );

      // 6. SAFE CLEANUP: Only delete old assets from Cloudinary if the DB update succeeded
      // We check if a NEW image was provided AND if the user had an OLD one to remove
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
          results.forEach((res, _idx) => {
            if (res.status === "rejected") {
              logger.warn(
                { err: res.reason },
                `Non-critical: Failed to delete old asset during profile update.`,
              );
            }
          });
        });
      }

      res.status(200).json({
        status: "success",
        message: "Profile updated successfully.",
        data: { user: updatedUser },
      });
    } catch (error) {
      // 7. ROLLBACK: If DB update fails, delete the images we just uploaded to Cloudinary
      if (newlyUploadedPublicIds.length > 0) {
        await Promise.allSettled(
          newlyUploadedPublicIds.map((id) => deleteFromCloudinary(id)),
        );
      }
      throw error;
    }
  });

  getUserByUsername = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const currentUserId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        _count: {
          select: { followers: true, following: true, posts: true },
        },
      },
    });

    if (!user) throw createHttpError(404, "User not found.");

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

    res.status(200).json({
      status: "success",
      data: {
        ...user,
        isFollowedByCurrentUser,
      },
    });
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.findUserById(req.params.id);
    if (!user) throw createHttpError(404, "User not found.");

    res.status(200).json({
      status: "success",
      data: user,
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
