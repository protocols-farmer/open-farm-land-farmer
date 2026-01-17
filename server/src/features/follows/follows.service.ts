import prisma from "@/db/prisma.js";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";

export class FollowsService {
  /**
   * Establishes a follow relationship and triggers a notification.
   */
  async followUser(followerId: string, followingId: string) {
    // 1. Validation: Prevent narcissism
    if (followerId === followingId) {
      throw createHttpError(400, "You cannot follow yourself.");
    }

    // 2. Validation: Ensure the target user actually exists
    const targetUser = await prisma.user.findUnique({
      where: { id: followingId },
    });
    if (!targetUser) throw createHttpError(404, "User not found.");

    try {
      /**
       * ATOMIC TRANSACTION:
       * Ensures data consistency. If any step fails, the whole operation rolls back.
       */
      return await prisma.$transaction(async (tx) => {
        // A. Create the Follow record (Many-to-Many Join Table)
        const follow = await tx.follow.create({
          data: { followerId, followingId },
        });

        // B. Denormalized Counter Updates (For UI Performance)
        await tx.user.update({
          where: { id: followerId },
          data: { followingCount: { increment: 1 } },
        });

        await tx.user.update({
          where: { id: followingId },
          data: { followersCount: { increment: 1 } },
        });

        // C. Notification Generation (Option A: Polling)
        // This record stays in the DB until the recipient fetches their notifications.
        await tx.notification.create({
          data: {
            recipientId: followingId,
            senderId: followerId,
            type: "NEW_FOLLOWER",
            metadata: {
              // We store minimal metadata to help the UI render quickly
              followerName: (
                await tx.user.findUnique({ where: { id: followerId } })
              )?.name,
            },
          },
        });

        return follow;
      });
    } catch (error: any) {
      // Handle Unique Constraint violation (trying to follow twice)
      if (error.code === "P2002") {
        throw createHttpError(409, "You are already following this user.");
      }
      logger.error({ err: error }, "Error in followUser service");
      throw error;
    }
  }

  /**
   * Removes a follow relationship and decrements user counters.
   */
  async unfollowUser(followerId: string, followingId: string) {
    try {
      await prisma.$transaction(async (tx) => {
        // 1. Remove the relationship
        await tx.follow.delete({
          where: {
            followerId_followingId: { followerId, followingId },
          },
        });

        // 2. Decrement counts
        await tx.user.update({
          where: { id: followerId },
          data: { followingCount: { decrement: 1 } },
        });

        await tx.user.update({
          where: { id: followingId },
          data: { followersCount: { decrement: 1 } },
        });

        // Note: We don't delete the notification record here.
        // Usually, notifications stay as historical "New Follower" logs even if they unfollow.
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw createHttpError(404, "You are not following this user.");
      }
      throw error;
    }
  }

  async getFollowers(userId: string) {
    return prisma.follow.findMany({
      where: { followingId: userId },
      include: {
        follower: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            title: true,
          },
        },
      },
    });
  }

  async getFollowing(userId: string) {
    return prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            title: true,
          },
        },
      },
    });
  }
}

export const followsService = new FollowsService();
