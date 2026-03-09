//src/features/post/post.service.ts
import prisma from "@/db/prisma.js";
import { Post, SystemRole, Prisma, SharePlatform } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";
import { deleteFromCloudinary } from "@/config/cloudinary.js";
import { PostQueryFilters } from "./post.types.js";

interface CreatePostData {
  title: string;
  description: string;
  content: string;
  category: Post["category"];
  tags: { name: string }[];
  images?: { url: string; publicId: string }[];
  externalLink?: string;
  githubLink?: string;
}

type UpdatePostData = Partial<Omit<CreatePostData, "images">> & {
  retainedImageUrls?: string[];
  newImages?: { url: string; publicId: string }[];
  postTags?: string;
};

export class PostService {
  /**
   * 🚜 TAG GUARD: Sanitizes tags to prevent paragraph-pasting.
   * Enforces lowercase, trims, removes spaces, and caps length at 25 chars.
   */
  private sanitizeTags(tags: any): string[] {
    if (!tags || !Array.isArray(tags)) return [];

    const normalizedTags = tags.map((t: any) => {
      const name = typeof t === "string" ? t : t.name ? t.name : String(t);

      return name.trim().toLowerCase().substring(0, 25);
    });

    return [
      ...new Set(
        normalizedTags.filter(
          (t) => t.length > 0 && !/\s/.test(t) && /^[a-z0-9-]+$/.test(t),
        ),
      ),
    ].slice(0, 10);
  }

  public async createPost(
    authorId: string,
    data: CreatePostData,
  ): Promise<Post> {
    const { images, tags, ...postData } = data;
    const cleanTags = this.sanitizeTags(tags);

    return prisma.$transaction(async (tx) => {
      const createInput: Prisma.PostCreateInput = {
        title: postData.title,
        description: postData.description,
        content: postData.content,
        category: postData.category,
        author: { connect: { id: authorId } },
        tags: {
          create: cleanTags.map((tagName) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
        ...(postData.externalLink && { externalLink: postData.externalLink }),
        ...(postData.githubLink && { githubLink: postData.githubLink }),
      };
      const newPost = await tx.post.create({ data: createInput });

      if (images && images.length > 0) {
        await tx.postImage.createMany({
          data: images.map((img, index) => ({
            ...img,
            postId: newPost.id,
            order: index + 1,
          })),
        });
      }

      logger.info(
        { postId: newPost.id, authorId },
        "New post created successfully.",
      );
      return tx.post.findUniqueOrThrow({
        where: { id: newPost.id },
        include: {
          images: { orderBy: { order: "asc" } },
          tags: { include: { tag: true } },
        },
      });
    });
  }

  public async getPostById(postId: string, userId?: string) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: { id: true, name: true, username: true, profileImage: true },
        },
        images: { orderBy: { order: "asc" } },
        tags: { include: { tag: true } },

        projectJourney: {
          orderBy: { date: "desc" },
        },
        steps: {
          orderBy: { order: "asc" },
          include: {
            sections: {
              orderBy: { order: "asc" },
            },
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    if (userId) {
      const like = await prisma.postLike.findUnique({
        where: { userId_postId: { userId, postId } },
      });
      const save = await prisma.postSave.findUnique({
        where: { userId_postId: { userId, postId } },
      });

      return {
        ...post,
        isLikedByCurrentUser: !!like,
        isSavedByCurrentUser: !!save,
      };
    }

    return {
      ...post,
      isLikedByCurrentUser: false,
      isSavedByCurrentUser: false,
    };
  }

  public async getAllPosts(
    filters: PostQueryFilters,
    userId?: string,
  ): Promise<{ posts: any[]; total: number }> {
    const limit = filters.limit ? parseInt(String(filters.limit), 10) : 10;
    const page = filters.page ? parseInt(String(filters.page), 10) : 1;

    const {
      q,
      category,
      sort = "newest",
      tags,
      authorId,
      likedByUserId,
      savedByUserId,
    } = filters;
    const skip = (page - 1) * limit;

    const where: Prisma.PostWhereInput = {};

    if (authorId) {
      where.authorId = authorId;
    }
    if (likedByUserId) {
      where.likedBy = { some: { userId: likedByUserId } };
    }
    if (savedByUserId) {
      where.savedBy = { some: { userId: savedByUserId } };
    }

    if (category) {
      where.category = category;
    }
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { content: { contains: q, mode: "insensitive" } },
        { author: { name: { contains: q, mode: "insensitive" } } },
        { author: { username: { contains: q, mode: "insensitive" } } },
      ];
    }
    if (tags) {
      const tagList = tags.split(",");
      if (tagList.length > 0) {
        where.tags = {
          some: {
            tag: {
              name: {
                in: tagList,
                mode: "insensitive",
              },
            },
          },
        };
      }
    }

    const orderBy: Prisma.PostOrderByWithRelationInput = {};
    switch (sort) {
      case "oldest":
        orderBy.createdAt = "asc";
        break;
      case "title-asc":
        orderBy.title = "asc";
        break;
      case "title-desc":
        orderBy.title = "desc";
        break;
      case "newest":
      default:
        orderBy.createdAt = "desc";
        break;
    }

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              profileImage: true,
            },
          },
          images: { orderBy: { order: "asc" } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.post.count({ where }),
    ]);

    if (!userId || posts.length === 0) {
      return {
        posts: posts.map((p) => ({
          ...p,
          isLikedByCurrentUser: false,
          isSavedByCurrentUser: false,
        })),
        total,
      };
    }

    const postIds = posts.map((p) => p.id);
    const userLikes = await prisma.postLike.findMany({
      where: { userId: userId, postId: { in: postIds } },
      select: { postId: true },
    });
    const userSaves = await prisma.postSave.findMany({
      where: { userId: userId, postId: { in: postIds } },
      select: { postId: true },
    });
    const likedPostIds = new Set(userLikes.map((like) => like.postId));
    const savedPostIds = new Set(userSaves.map((save) => save.postId));
    const enrichedPosts = posts.map((post) => ({
      ...post,
      isLikedByCurrentUser: likedPostIds.has(post.id),
      isSavedByCurrentUser: savedPostIds.has(post.id),
    }));

    return { posts: enrichedPosts, total };
  }
  public async updatePost(
    userId: string,
    postId: string,
    data: UpdatePostData,
  ): Promise<Post> {
    const {
      retainedImageUrls = [],
      newImages = [],
      tags,
      postTags,
      ...textData
    } = data;

    const postToUpdate = await prisma.post.findUnique({
      where: { id: postId },
      include: { images: true },
    });

    if (!postToUpdate) throw createHttpError(404, "Post not found.");
    if (postToUpdate.authorId !== userId)
      throw createHttpError(403, "You are not authorized to edit this post.");

    const imagesToDelete = postToUpdate.images.filter(
      (img) => !retainedImageUrls.includes(img.url),
    );

    if (imagesToDelete.length > 0) {
      const deletePromises = imagesToDelete.map((img) =>
        deleteFromCloudinary(img.publicId).catch((err) =>
          logger.error(
            { err, publicId: img.publicId },
            "Cloudinary asset deletion failed",
          ),
        ),
      );
      Promise.allSettled(deletePromises);
    }

    return prisma.$transaction(async (tx) => {
      if (imagesToDelete.length > 0) {
        await tx.postImage.deleteMany({
          where: { id: { in: imagesToDelete.map((img) => img.id) } },
        });
      }
      if (newImages && newImages.length > 0) {
        await tx.postImage.createMany({
          data: newImages.map((img, index) => ({
            ...img,
            postId,
            order: retainedImageUrls.length + index + 1,
          })),
        });
      }

      const updateInput: Prisma.PostUpdateInput = { ...textData };

      if (tags) {
        updateInput.tags = {
          deleteMany: {},
          create: tags.map((tag) => ({
            tag: {
              connectOrCreate: {
                where: { name: tag.name },
                create: { name: tag.name },
              },
            },
          })),
        };
      }

      const updatedPost = await tx.post.update({
        where: { id: postId },
        data: updateInput,
        include: {
          images: { orderBy: { order: "asc" } },
          tags: { include: { tag: true } },
        },
      });

      logger.info({ postId, userId }, "Post updated successfully.");
      return updatedPost;
    });
  }

  public async deletePost(
    userId: string,
    userRole: SystemRole,
    postId: string,
  ): Promise<void> {
    const postToDelete = await prisma.post.findUnique({
      where: { id: postId },
      include: { images: true },
    });

    if (!postToDelete) return;
    if (postToDelete.authorId !== userId && userRole !== "SUPER_ADMIN") {
      throw createHttpError(403, "You are not authorized to delete this post.");
    }

    if (postToDelete.images.length > 0) {
      const deletePromises = postToDelete.images.map((img) =>
        deleteFromCloudinary(img.publicId).catch((err) =>
          logger.error(
            { err, publicId: img.publicId },
            "Cloudinary asset deletion failed",
          ),
        ),
      );
      Promise.allSettled(deletePromises);
    }

    await prisma.post.delete({ where: { id: postId } });
    logger.info({ postId, userId }, "Post and associated assets deleted.");
  }

  public async likePost(userId: string, postId: string): Promise<Post> {
    const existingLike = await prisma.postLike.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existingLike) {
      return prisma.post.findUniqueOrThrow({ where: { id: postId } });
    }

    const [, updatedPost] = await prisma.$transaction([
      prisma.postLike.create({ data: { userId, postId } }),
      prisma.post.update({
        where: { id: postId },
        data: { likesCount: { increment: 1 } },
      }),
    ]);

    return updatedPost;
  }

  public async unlikePost(userId: string, postId: string): Promise<Post> {
    const existingLike = await prisma.postLike.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (!existingLike) {
      return prisma.post.findUniqueOrThrow({ where: { id: postId } });
    }

    const [, updatedPost] = await prisma.$transaction([
      prisma.postLike.delete({ where: { id: existingLike.id } }),
      prisma.post.update({
        where: { id: postId },
        data: { likesCount: { decrement: 1 } },
      }),
    ]);

    return updatedPost;
  }

  public async savePost(userId: string, postId: string): Promise<Post> {
    const existingSave = await prisma.postSave.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existingSave) {
      return prisma.post.findUniqueOrThrow({ where: { id: postId } });
    }

    const [, updatedPost] = await prisma.$transaction([
      prisma.postSave.create({ data: { userId, postId } }),
      prisma.post.update({
        where: { id: postId },
        data: { savedCount: { increment: 1 } },
      }),
    ]);
    return updatedPost;
  }

  public async unsavePost(userId: string, postId: string): Promise<Post> {
    const existingSave = await prisma.postSave.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (!existingSave) {
      return prisma.post.findUniqueOrThrow({ where: { id: postId } });
    }

    const [, updatedPost] = await prisma.$transaction([
      prisma.postSave.delete({ where: { id: existingSave.id } }),
      prisma.post.update({
        where: { id: postId },
        data: { savedCount: { decrement: 1 } },
      }),
    ]);
    return updatedPost;
  }

  public async sharePost(
    sharerId: string,
    postId: string,
    platform: SharePlatform,
  ): Promise<Post> {
    const [, updatedPost] = await prisma.$transaction([
      prisma.postShare.create({ data: { sharerId, postId, platform } }),
      prisma.post.update({
        where: { id: postId },
        data: { sharesCount: { increment: 1 } },
      }),
    ]);
    return updatedPost;
  }

  public async recordPostView(userId: string, postId: string): Promise<void> {
    const existingView = await prisma.postView.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    if (existingView) {
      await prisma.postView.update({
        where: { id: existingView.id },
        data: { viewCountByUser: { increment: 1 } },
      });
    } else {
      try {
        await prisma.$transaction([
          prisma.postView.create({ data: { userId, postId } }),
          prisma.post.update({
            where: { id: postId },
            data: { viewsCount: { increment: 1 } },
          }),
        ]);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(
            "Race condition on PostView creation handled gracefully. Ignoring duplicate create.",
          );
        } else {
          throw error;
        }
      }
    }
  }
}

export const postService = new PostService();
