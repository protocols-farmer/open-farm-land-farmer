//src/features/post/post.controller.ts
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { Request, Response } from "express";
import { postService } from "./post.service.js";
import { createHttpError } from "@/utils/error.factory.js";
import { uploadToCloudinary } from "@/config/cloudinary.js";
import { logger } from "@/config/logger.js";
import { SharePlatform } from "@prisma-client";

class PostController {
  createPost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const postData = req.body;

    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw createHttpError(
        400,
        "Validation Error: A post must have at least one image.",
      );
    }

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.path, "post_images"),
      );
      const uploadResults = await Promise.all(uploadPromises);

      postData.images = uploadResults.map((result) => ({
        url: result.secure_url,
        publicId: result.public_id,
      }));
    }

    if (postData.postTags) {
      try {
        const tagsArray = JSON.parse(postData.postTags);
        postData.tags = tagsArray.map((name: string) => ({ name }));
      } catch (e) {
        throw createHttpError(400, "Invalid format for postTags.");
      }
    }

    const post = await postService.createPost(userId, postData);
    res.status(201).json({
      status: "success",
      message: "Post created successfully",
      data: post,
    });
  });

  getPost = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const userId = req.user?.id;

    const post = await postService.getPostById(id, userId);

    if (!post) {
      throw createHttpError(404, "Post not found.");
    }
    res.status(200).json({ status: "success", data: post });
  });

  getAllPosts = asyncHandler(async (req: Request, res: Response) => {
    console.log("USER ON REQUEST IS:", req.user);

    const userId = req.user?.id;

    const { posts, total } = await postService.getAllPosts(req.query, userId);

    const limit = parseInt(req.query.limit as string) || 10;
    const page = parseInt(req.query.page as string) || 1;

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  });

  updatePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id: postId } = req.params;
    const updateData = req.body;

    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadPromises = req.files.map((file) =>
        uploadToCloudinary(file.path, "post_images"),
      );
      const uploadResults = await Promise.all(uploadPromises);

      updateData.newImages = uploadResults.map((res) => ({
        url: res.secure_url,
        publicId: res.public_id,
      }));
    }

    if (updateData.retainedImageUrls) {
      try {
        updateData.retainedImageUrls = JSON.parse(updateData.retainedImageUrls);
      } catch (e) {
        logger.warn("retainedImageUrls not valid JSON.");
      }
    }

    const newCount = updateData.newImages?.length || 0;
    const retainedCount = Array.isArray(updateData.retainedImageUrls)
      ? updateData.retainedImageUrls.length
      : 0;

    if (newCount + retainedCount === 0) {
      throw createHttpError(
        400,
        "Validation Error: A post must have at least one image.",
      );
    }

    if (updateData.postTags) {
      try {
        const tagsArray = JSON.parse(updateData.postTags);
        updateData.tags = tagsArray.map((name: string) => ({ name }));
      } catch (e) {
        throw createHttpError(400, "Invalid format for postTags.");
      }
    }

    const updatedPost = await postService.updatePost(
      userId,
      postId,
      updateData,
    );
    res.status(200).json({
      status: "success",
      message: "Post updated successfully",
      data: updatedPost,
    });
  });
  deletePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const userRole = req.user!.systemRole;
    const { id: postId } = req.params;

    await postService.deletePost(userId, userRole, postId);
    res.status(204).send();
  });

  likePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id: postId } = req.params;

    const updatedPost = await postService.likePost(userId, postId);
    res.status(200).json({
      status: "success",
      message: "Post liked successfully.",
      data: { likesCount: updatedPost.likesCount },
    });
  });

  unlikePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id: postId } = req.params;

    const updatedPost = await postService.unlikePost(userId, postId);
    res.status(200).json({
      status: "success",
      message: "Post unliked successfully.",
      data: { likesCount: updatedPost.likesCount },
    });
  });

  sharePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { id: postId } = req.params;
    const { platform } = req.body;

    if (!platform || !Object.values(SharePlatform).includes(platform)) {
      throw createHttpError(400, "Invalid or missing share platform.");
    }

    const updatedPost = await postService.sharePost(userId, postId, platform);
    res.status(201).json({
      status: "success",
      message: "Post share recorded.",
      data: { sharesCount: updatedPost.sharesCount },
    });
  });

  recordPostView = asyncHandler(async (req: Request, res: Response) => {
    const { id: postId } = req.params;
    const userId = req.user?.id;

    const anonymousId =
      (req.headers["x-visitor-id"] as string) || req.cookies?.["visitor_id"];

    await postService.recordPostView(postId, userId, anonymousId);

    res.status(204).send();
  });

  savePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const { id: postId } = req.params;

    const updatedPost = await postService.savePost(userId, postId);

    res.status(200).json({
      status: "success",
      message: "Post saved successfully.",
      data: { savedCount: updatedPost.savedCount },
    });
  });

  unsavePost = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const { id: postId } = req.params;

    const updatedPost = await postService.unsavePost(userId, postId);

    res.status(200).json({
      status: "success",
      message: "Post unsaved successfully.",
      data: { savedCount: updatedPost.savedCount },
    });
  });
}

export const postController = new PostController();
