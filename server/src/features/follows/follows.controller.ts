import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { followsService } from "./follows.service.js";

class FollowsController {
  /**
   * Handles POST /follows/:userId/follow
   */
  follow = asyncHandler(async (req: Request, res: Response) => {
    const followerId = req.user!.id; // Extracted from verifyToken middleware
    const { userId: followingId } = req.params;

    await followsService.followUser(followerId, followingId);

    res.status(200).json({
      status: "success",
      message: "User followed successfully.",
    });
  });

  /**
   * Handles DELETE /follows/:userId/unfollow
   */
  unfollow = asyncHandler(async (req: Request, res: Response) => {
    const followerId = req.user!.id;
    const { userId: followingId } = req.params;

    await followsService.unfollowUser(followerId, followingId);

    res.status(200).json({
      status: "success",
      message: "User unfollowed successfully.",
    });
  });

  /**
   * Fetches the list of users who follow a specific user.
   */
  getFollowers = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const followers = await followsService.getFollowers(userId);

    res.status(200).json({
      status: "success",
      data: followers,
    });
  });

  /**
   * Fetches the list of users a specific user is following.
   */
  getFollowing = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const following = await followsService.getFollowing(userId);

    res.status(200).json({
      status: "success",
      data: following,
    });
  });
}

export const followsController = new FollowsController();
