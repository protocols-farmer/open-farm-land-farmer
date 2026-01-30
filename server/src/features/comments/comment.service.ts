/**
 * =================================================================
 * SERVICE LAYER: COMMENT (OPTIMIZED)
 * =================================================================
 */

import prisma from "@/db/prisma.js";
import { Prisma, SystemRole, CommentReactionState } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";
import {
  ProcessedCommentAPI,
  CreateCommentDto,
  UpdateCommentDto,
  ToggleReactionDto,
} from "./comment.types.js";

const MAX_COMMENT_LEVEL_ALLOWED = 5;

/**
 * OPTIMIZED INCLUDE:
 * Strictly selects author fields and counts to reduce database payload.
 */
const commentInclude = (currentUserId?: string): Prisma.CommentInclude => {
  const include: Prisma.CommentInclude = {
    author: {
      select: {
        id: true,
        name: true,
        username: true,
        profileImage: true,
      },
    },
    _count: {
      select: { children: true },
    },
  };

  if (currentUserId) {
    include.reactions = {
      where: { userId: currentUserId },
      select: { reaction: true },
    };
  }

  return include;
};

class CommentService {
  /**
   * Transforms database records into a clean API response.
   */
  private processRawCommentForAPI(rawComment: any): ProcessedCommentAPI {
    const userReaction = rawComment.reactions?.[0]?.reaction;

    return {
      id: rawComment.id,
      text: rawComment.text,
      postId: rawComment.postId,
      authorId: rawComment.authorId,
      parentId: rawComment.parentId,
      level: rawComment.level,
      createdAt: rawComment.createdAt,
      updatedAt: rawComment.updatedAt,
      author: rawComment.author,
      likes: rawComment.likesCount,
      dislikes: rawComment.dislikesCount,
      isLikedByCurrentUser: userReaction === CommentReactionState.LIKED,
      isDislikedByCurrentUser: userReaction === CommentReactionState.DISLIKED,
      directRepliesCount: rawComment._count?.children || 0,
      children: [],
    };
  }

  public async create(
    postId: string,
    authorId: string,
    data: CreateCommentDto,
  ): Promise<ProcessedCommentAPI> {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) throw createHttpError(404, "Post not found.");

    const [newComment] = await prisma.$transaction([
      prisma.comment.create({
        data: { text: data.text, postId, authorId, level: 0 },
        include: commentInclude(authorId),
      }),
      prisma.post.update({
        where: { id: postId },
        data: { commentsCount: { increment: 1 } },
      }),
    ]);

    return this.processRawCommentForAPI(newComment);
  }

  public async createReply(
    parentId: string,
    authorId: string,
    data: CreateCommentDto,
  ): Promise<ProcessedCommentAPI> {
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
    });
    if (!parentComment) throw createHttpError(404, "Parent comment not found.");

    const newLevel = parentComment.level + 1;
    if (newLevel > MAX_COMMENT_LEVEL_ALLOWED) {
      throw createHttpError(
        403,
        `Maximum depth of ${MAX_COMMENT_LEVEL_ALLOWED} reached.`,
      );
    }

    const [newReply] = await prisma.$transaction([
      prisma.comment.create({
        data: {
          text: data.text,
          postId: parentComment.postId,
          authorId,
          parentId,
          level: newLevel,
        },
        include: commentInclude(authorId),
      }),
      prisma.post.update({
        where: { id: parentComment.postId },
        data: { commentsCount: { increment: 1 } },
      }),
    ]);

    return this.processRawCommentForAPI(newReply);
  }

  public async findAllForPost(
    postId: string,
    currentUserId?: string,
    pagination?: { skip: number; take: number; sortBy: string; order: string },
  ) {
    const [rawComments, total] = await prisma.$transaction([
      prisma.comment.findMany({
        where: { postId, parentId: null },
        orderBy: {
          [pagination?.sortBy || "createdAt"]: pagination?.order || "desc",
        },
        skip: pagination?.skip || 0,
        take: pagination?.take || 10,
        include: commentInclude(currentUserId),
      }),
      prisma.comment.count({ where: { postId, parentId: null } }),
    ]);

    return {
      comments: rawComments.map((c) => this.processRawCommentForAPI(c)),
      total,
    };
  }

  public async findRepliesForComment(
    parentId: string,
    currentUserId?: string,
    pagination?: { skip: number; take: number; sortBy: string; order: string },
  ) {
    const [rawReplies, total] = await prisma.$transaction([
      prisma.comment.findMany({
        where: { parentId },
        orderBy: {
          [pagination?.sortBy || "createdAt"]: pagination?.order || "asc",
        },
        skip: pagination?.skip || 0,
        take: pagination?.take || 5,
        include: commentInclude(currentUserId),
      }),
      prisma.comment.count({ where: { parentId } }),
    ]);

    return {
      replies: rawReplies.map((c) => this.processRawCommentForAPI(c)),
      total,
    };
  }

  public async update(
    commentId: string,
    userId: string,
    userRole: SystemRole | undefined,
    data: UpdateCommentDto,
  ): Promise<ProcessedCommentAPI> {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (
      !comment ||
      (comment.authorId !== userId && userRole !== "SUPER_ADMIN")
    ) {
      throw createHttpError(403, "Unauthorized to edit this comment.");
    }

    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: { text: data.text },
      include: commentInclude(userId),
    });

    return this.processRawCommentForAPI(updated);
  }

  /**
   * OPTIMIZED DELETE:
   * Uses a Recursive CTE to find and count ALL descendants (replies to replies)
   * to ensure the parent Post.commentsCount stays perfectly in sync.
   */
  public async delete(
    commentId: string,
    userId: string,
    userRole: SystemRole | undefined,
  ): Promise<void> {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (!comment) throw createHttpError(404, "Comment not found.");
    if (comment.authorId !== userId && userRole !== "SUPER_ADMIN") {
      throw createHttpError(403, "Unauthorized.");
    }

    const descendants: { id: string }[] = await prisma.$queryRaw`
      WITH RECURSIVE subordinates AS (
        SELECT id FROM comments WHERE id = ${commentId}
        UNION ALL
        SELECT c.id FROM comments c
        INNER JOIN subordinates s ON s.id = c."parentId"
      )
      SELECT id FROM subordinates;
    `;

    await prisma.$transaction([
      prisma.comment.delete({ where: { id: commentId } }),
      prisma.post.update({
        where: { id: comment.postId },
        data: { commentsCount: { decrement: descendants.length } },
      }),
    ]);
  }

  /**
   * OPTIMIZED TOGGLE:
   * Atomic operations inside a single transaction.
   * Eliminates unnecessary 'pings' to the DB.
   */
  public async toggleReaction(
    commentId: string,
    userId: string,
    data: ToggleReactionDto,
  ) {
    const { reaction } = data;

    return await prisma.$transaction(async (tx) => {
      const existing = await tx.commentUserReaction.findUnique({
        where: { userId_commentId: { userId, commentId } },
      });

      if (existing) {
        if (existing.reaction === reaction) {
          // 1. UNDO
          await tx.commentUserReaction.delete({ where: { id: existing.id } });
          await tx.comment.update({
            where: { id: commentId },
            data: {
              [reaction === "LIKED" ? "likesCount" : "dislikesCount"]: {
                decrement: 1,
              },
            },
          });
        } else {
          // 2. SWAP
          await tx.commentUserReaction.update({
            where: { id: existing.id },
            data: { reaction },
          });
          await tx.comment.update({
            where: { id: commentId },
            data: {
              likesCount: {
                [reaction === "LIKED" ? "increment" : "decrement"]: 1,
              },
              dislikesCount: {
                [reaction === "LIKED" ? "decrement" : "increment"]: 1,
              },
            },
          });
        }
      } else {
        // 3. NEW
        await tx.commentUserReaction.create({
          data: { userId, commentId, reaction },
        });
        await tx.comment.update({
          where: { id: commentId },
          data: {
            [reaction === "LIKED" ? "likesCount" : "dislikesCount"]: {
              increment: 1,
            },
          },
        });
      }

      const finalState = await tx.comment.findUnique({
        where: { id: commentId },
        select: { likesCount: true, dislikesCount: true },
      });

      return {
        likes: finalState?.likesCount ?? 0,
        dislikes: finalState?.dislikesCount ?? 0,
        isLikedByCurrentUser:
          reaction === "LIKED" && (!existing || existing.reaction !== "LIKED"),
        isDislikedByCurrentUser:
          reaction === "DISLIKED" &&
          (!existing || existing.reaction !== "DISLIKED"),
      };
    });
  }
}

export const commentService = new CommentService();
