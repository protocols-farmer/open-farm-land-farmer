// server/src/features/tag/tag.service.ts

import prisma from "@/db/prisma.js";
import { PostCategory, Prisma } from "@prisma-client";

interface TagQueryFilters {
  category?: PostCategory;
  likedByUserId?: string;
  savedByUserId?: string;
  authorId?: string; // Added to handle profile-specific filtering
}

class TagService {
  public async getAllTags(filters: TagQueryFilters) {
    const { category, likedByUserId, savedByUserId, authorId } = filters;

    const where: Prisma.TagWhereInput = {};
    const postFilter: Prisma.PostWhereInput = {};

    // Build the filter for the related Posts
    if (category) {
      postFilter.category = category;
    }
    if (authorId) {
      postFilter.authorId = authorId; // Filters tags to only those used by this author
    }
    if (likedByUserId) {
      postFilter.likedBy = { some: { userId: likedByUserId } };
    }
    if (savedByUserId) {
      postFilter.savedBy = { some: { userId: savedByUserId } };
    }

    // Apply the postFilter to the Tag query via the join table
    if (Object.keys(postFilter).length > 0) {
      where.posts = { some: { post: postFilter } };
    }

    return prisma.tag.findMany({
      where,
      orderBy: { name: "asc" },
      select: { name: true }, // Optimization: only fetch names for the filter bar
    });
  }
}

export const tagService = new TagService();
