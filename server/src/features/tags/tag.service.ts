// server/src/features/tag/tag.service.ts

import prisma from "@/db/prisma.js";
import { PostCategory, Prisma } from "@prisma-client";

export interface TagQueryFilters {
  context?: "POST" | "OPPORTUNITY" | undefined;
  category?: PostCategory | undefined;
  likedByUserId?: string | undefined;
  savedByUserId?: string | undefined;
  authorId?: string | undefined;
}

class TagService {
  public async getAllTags(filters: TagQueryFilters) {
    const { context, category, likedByUserId, savedByUserId, authorId } =
      filters;

    const where: Prisma.TagWhereInput = {};

    // 🚜 CASE 1: Fetching Opportunity-specific tags
    if (context === "OPPORTUNITY") {
      where.opportunities = { some: {} };
    }
    // 🚜 CASE 2: Fetching Post-specific tags
    else if (context === "POST") {
      const postFilter: Prisma.PostWhereInput = {};

      if (category) postFilter.category = category;
      if (authorId) postFilter.authorId = authorId;
      if (likedByUserId)
        postFilter.likedBy = { some: { userId: likedByUserId } };
      if (savedByUserId)
        postFilter.savedBy = { some: { userId: savedByUserId } };

      where.posts = {
        some: {
          post: Object.keys(postFilter).length > 0 ? postFilter : {},
        },
      };
    }
    // 🚜 CASE 3: No context (Global Tag Fetch)
    else {
      // Return tags that are attached to EITHER a post OR an opportunity.
      // This ensures we don't return "orphaned" tags with 0 content.
      where.OR = [{ posts: { some: {} } }, { opportunities: { some: {} } }];
    }

    return prisma.tag.findMany({
      where,
      orderBy: { name: "asc" },
      take: 100, // 🚜 CAP THE PAYLOAD: Prevents sending 5,000+ tags over the network
      select: { name: true },
    });
  }
}

export const tagService = new TagService();
