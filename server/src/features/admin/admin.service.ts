//src/features/admin/admin.service.ts
import prisma from "@/db/prisma.js";
import { Prisma, SystemRole, UserStatus } from "@prisma-client";
import {
  AdminDashboardStats,
  AdminUserRow,
  AdminPostRow,
  AdminApiQuery,
  AdminCommentRow,
  AdminOpportunityRow,
  AdminUpdateRow,
  SanitizedUser,
} from "./admin.types.js";
import { userService } from "../user/user.service.js";
import { deleteFromCloudinary } from "@/config/cloudinary.js";

class AdminService {
  /**
   * Fetches key statistics for the admin dashboard.
   */
  public async getDashboardStats(): Promise<AdminDashboardStats> {
    const [
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
      totalSaves,
      totalShares,
      totalOpportunities,
      totalUpdates,
    ] = await prisma.$transaction([
      prisma.user.count(),
      prisma.post.count(),
      prisma.comment.count(),
      prisma.postLike.count(),
      prisma.postSave.count(),
      prisma.postShare.count(),
      prisma.opportunity.count(),
      prisma.update.count(),
    ]);

    return {
      totalUsers,
      totalPosts,
      totalComments,
      totalLikes,
      totalSaves,
      totalShares,
      totalOpportunities,
      totalUpdates,
    };
  }

  public async getAllUsers(
    query: AdminApiQuery,
  ): Promise<{ users: AdminUserRow[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      q,
      sortBy = "joinedAt",
      order = "desc",
    } = query;
    const where: Prisma.UserWhereInput = {};

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { username: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ];
    }

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          _count: { select: { posts: true, comments: true } },
          sanctionsReceived: {
            where: { status: "ACTIVE" },
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    const flattenedUsers = users.map((user) => ({
      ...user,
      postsCount: user._count.posts,
      commentsCount: user._count.comments,
      _count: undefined, // Clean up the payload
    }));

    return { users: flattenedUsers as any, total };
  }
  /**
   * Fetches a paginated, searchable list of all posts.
   */
  public async getAllPosts(
    query: AdminApiQuery,
  ): Promise<{ posts: AdminPostRow[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      q,
      sortBy = "createdAt",
      order = "desc",
      filterByCategory,
    } = query;
    const where: Prisma.PostWhereInput = {};

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { author: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    if (filterByCategory) where.category = filterByCategory;

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImage: true,
            },
          },
          images: { select: { url: true }, take: 1, orderBy: { order: "asc" } },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return { posts: posts as AdminPostRow[], total };
  }

  /**
   * Fetches all Opportunities (Searchable by title, company, or poster)
   */
  public async getAllOpportunities(
    query: AdminApiQuery,
  ): Promise<{ opportunities: AdminOpportunityRow[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      q,
      sortBy = "postedAt",
      order = "desc",
    } = query;
    const where: Prisma.OpportunityWhereInput = {};

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { companyName: { contains: q, mode: "insensitive" } },
        { poster: { username: { contains: q, mode: "insensitive" } } },
      ];
    }

    const [opportunities, total] = await prisma.$transaction([
      prisma.opportunity.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          poster: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImage: true,
            },
          },
          tags: { select: { tag: { select: { name: true } } } },
        },
      }),
      prisma.opportunity.count({ where }),
    ]);

    return { opportunities: opportunities as AdminOpportunityRow[], total };
  }

  /**
   * Fetches all Updates (Platform or Project updates)
   */
  public async getAllUpdates(
    query: AdminApiQuery,
  ): Promise<{ updates: AdminUpdateRow[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      q,
      sortBy = "publishedAt",
      order = "desc",
      filterByUpdateCategory,
    } = query;
    const where: Prisma.UpdateWhereInput = {};

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { version: { contains: q, mode: "insensitive" } },
      ];
    }

    if (filterByUpdateCategory) where.category = filterByUpdateCategory;

    const [updates, total] = await prisma.$transaction([
      prisma.update.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImage: true,
            },
          },
        },
      }),
      prisma.update.count({ where }),
    ]);

    return { updates: updates as AdminUpdateRow[], total };
  }

  /**
   * Fetches all comments.
   */
  public async getAllComments(
    query: AdminApiQuery,
  ): Promise<{ comments: AdminCommentRow[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      q,
      sortBy = "createdAt",
      order = "desc",
    } = query;
    const where: Prisma.CommentWhereInput = {};

    if (q) {
      where.OR = [
        { text: { contains: q, mode: "insensitive" } },
        { author: { username: { contains: q, mode: "insensitive" } } },
      ];
    }

    const [comments, total] = await prisma.$transaction([
      prisma.comment.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImage: true,
            },
          },
          post: { select: { id: true, title: true } },
        },
      }),
      prisma.comment.count({ where }),
    ]);

    return { comments: comments as AdminCommentRow[], total };
  }

  public async updateUserRole(
    userId: string,
    newRole: SystemRole,
  ): Promise<SanitizedUser> {
    return prisma.user.update({
      where: { id: userId },
      data: { systemRole: newRole },
    }) as Promise<SanitizedUser>;
  }

  public async deleteUser(userId: string): Promise<void> {
    await userService.deleteUserAccount(userId);
  }

  public async deletePost(postId: string): Promise<void> {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { images: true },
    });

    if (post && post.images.length > 0) {
      // Clean up Cloudinary assets
      await Promise.allSettled(
        post.images.map((img) => deleteFromCloudinary(img.publicId)),
      );
    }

    await prisma.post.delete({ where: { id: postId } });
  }

  public async deleteComment(commentId: string): Promise<void> {
    await prisma.comment.delete({ where: { id: commentId } });
  }

  public async deleteOpportunity(id: string): Promise<void> {
    await prisma.opportunity.delete({ where: { id } });
  }

  public async deleteUpdate(id: string): Promise<void> {
    await prisma.update.delete({ where: { id } });
  }

  public async getSystemConfig() {
    let config = await prisma.systemConfig.findFirst();
    if (!config) config = await prisma.systemConfig.create({ data: {} });
    return config;
  }

  public async updateSystemConfig(data: {
    maintenanceMode?: boolean;
    maintenanceMessage?: string;
  }) {
    const config = await this.getSystemConfig();
    const updateData: Prisma.SystemConfigUpdateInput = {};

    if (data.maintenanceMode !== undefined) {
      updateData.maintenanceMode = data.maintenanceMode;
    }

    if (data.maintenanceMessage !== undefined) {
      updateData.maintenanceMessage = data.maintenanceMessage.trim() || null;
    }

    return prisma.systemConfig.update({
      where: { id: config.id },
      data: updateData,
    });
  }

  public async updateUserStatus(
    userId: string,
    newStatus: UserStatus,
    adminId?: string,
    reason?: string,
    expiresAt?: Date | null,
  ): Promise<SanitizedUser> {
    return prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { status: newStatus },
      });

      if (
        (newStatus === "BANNED" || newStatus === "SUSPENDED") &&
        adminId &&
        reason
      ) {
        // 🚜 Sanitization: Ensure the sanction reason is trimmed
        const sanitizedReason = reason.trim();

        await tx.userSanction.updateMany({
          where: { userId, status: "ACTIVE" },
          data: { status: "EXPIRED" },
        });

        await tx.userSanction.create({
          data: {
            userId,
            adminId,
            reason: sanitizedReason,
            type: newStatus === "BANNED" ? "BAN" : "SUSPENSION",
            status: "ACTIVE",
            expiresAt: expiresAt || null,
          },
        });
      } else if (newStatus === "ACTIVE") {
        await tx.userSanction.updateMany({
          where: { userId, status: "ACTIVE" },
          data: { status: "EXPIRED" },
        });
      }

      return updatedUser;
    }) as Promise<SanitizedUser>;
  }
}

export const adminService = new AdminService();
