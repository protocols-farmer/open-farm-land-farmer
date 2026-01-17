//src/features/user/user.controller.ts
import { Request, Response } from "express";
import { SystemRole } from "@prisma-client";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { createHttpError } from "@/utils/error.factory.js";
import { userService } from "./user.service.js";
import {
  deleteFromCloudinary,
  extractPublicIdFromUrl,
  uploadToCloudinary,
} from "@/config/cloudinary.js";
import prisma from "@/db/prisma.js";

class UserController {
  getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.findUserById(req.user!.id);
    if (!user) throw createHttpError(404, "User profile not found.");

    res.status(200).json({
      status: "success",
      data: { user },
    });
  });

  // src/features/user/user.controller.ts
  updateMyProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const updateData = { ...req.body };
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. Get current user so we can find their OLD image URLs
    const currentUser = await userService.findUserById(userId);

    const fieldsToNullify = [
      "bio",
      "title",
      "location",
      "twitterUrl",
      "githubUrl",
      "websiteUrl",
    ];
    fieldsToNullify.forEach((field) => {
      if (updateData[field] === "" || updateData[field] === "null")
        updateData[field] = null;
    });

    const version = Date.now();

    // 2. Handle Profile Image
    if (files?.profileImage?.[0]) {
      const result = await uploadToCloudinary(
        files.profileImage[0].path,
        "user_assets",
        `profile_${userId}_${version}`
      );

      // If they had an old image, delete it from Cloudinary now
      if (currentUser?.profileImage) {
        const oldId = extractPublicIdFromUrl(currentUser.profileImage);
        if (oldId) await deleteFromCloudinary(oldId);
      }
      updateData.profileImage = result.secure_url;
    }

    // 3. Handle Banner Image
    if (files?.bannerImage?.[0]) {
      const result = await uploadToCloudinary(
        files.bannerImage[0].path,
        "user_assets",
        `banner_${userId}_${version}`
      );

      if (currentUser?.bannerImage) {
        const oldId = extractPublicIdFromUrl(currentUser.bannerImage);
        if (oldId) await deleteFromCloudinary(oldId);
      }
      updateData.bannerImage = result.secure_url;
    }

    const updatedUser = await userService.updateUserProfile(userId, updateData);

    res.status(200).json({
      status: "success",
      message: "Profile updated successfully.",
      data: { user: updatedUser },
    });
  });

  getUserByUsername = asyncHandler(async (req: Request, res: Response) => {
    const { username } = req.params;
    const currentUserId = req.user?.id; // Now correctly typed as string | undefined

    // 1. Fetch the profile
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        _count: {
          select: { followers: true, following: true, posts: true },
        },
      },
    });

    if (!user) throw createHttpError(404, "User not found.");

    // 2. HONEST CHECK: Does the current viewer follow this person?
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

    // 3. Return the verified state
    res.status(200).json({
      status: "success",
      data: {
        ...user,
        isFollowedByCurrentUser,
      },
    });
  });
  // RESTORED: This was missing in the previous version
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
