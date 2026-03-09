// server/src/features/opportunities/opportunity.service.ts

import prisma from "@/db/prisma.js";
import { Prisma } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";
import {
  CreateOpportunityDto,
  UpdateOpportunityDto,
  OpportunityQueryFilters,
} from "./opportunity.types.js";
import { emailService } from "../email/email.service.js";
import { config } from "@/config/index.js";
import { logger } from "@/config/logger.js";
import { deleteFromCloudinary } from "@/config/cloudinary.js";

class OpportunityService {
  /**
   * Helper to ensure tags are unique, trimmed, and lowercase.
   * Prevents P2002 unique constraint errors on OpportunityTag table.
   */
  /**
   * 🚜 TAG GUARD: Hardened sanitization for job opportunities.
   * Enforces lowercase, trims, rejects spaces, and hard-caps length at 25 chars.
   */
  private sanitizeTags(tags: any): string[] {
    if (!tags || !Array.isArray(tags)) return [];

    const normalizedTags = tags.map((t: any) => {
      // Handle string or object {name: '...'}
      const name =
        typeof t === "string" ? t : t?.name ? String(t.name) : String(t);

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
  /**
   * Creates a new job opportunity and notifies subscribed wanderers.
   * Includes full broadcast tracking (Found, Success, Failure) in the logs.
   */
  public async create(data: CreateOpportunityDto, posterId: string) {
    const { tags, ...opportunityData } = data;
    const uniqueTags = this.sanitizeTags(tags);

    // 1. Create the database record
    const newOpportunity = await prisma.opportunity.create({
      data: {
        ...opportunityData,
        poster: { connect: { id: posterId } },
        ...(uniqueTags.length > 0 && {
          tags: {
            create: uniqueTags.map((tagName) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName },
                },
              },
            })),
          },
        }),
      },
      include: {
        poster: { select: { name: true, profileImage: true } },
        tags: { include: { tag: true } },
      },
    });

    // 2. Trigger Marketing Emails (Non-blocking / Background)
    prisma.user
      .findMany({
        where: {
          status: "ACTIVE",
          settings: { emailMarketing: true },
        },
        select: { email: true, name: true },
      })
      .then(async (users) => {
        console.log(
          `🚀 OPPORTUNITY BROADCAST: Found ${users.length} eligible users.`,
        );

        if (users.length === 0) {
          console.warn(
            "⚠️ BROADCAST ABORTED: No active users with marketing enabled found.",
          );
          return;
        }

        const opportunityUrl = `${config.socialAuth.frontendUrl}/opportunities/${newOpportunity.id}`;
        let successCount = 0;
        let failureCount = 0;

        for (const user of users) {
          try {
            await emailService.sendOpportunityAlert(user.email, {
              title: newOpportunity.title,
              companyName: newOpportunity.companyName,
              location: newOpportunity.location,
              type: newOpportunity.type,
              salaryRange: newOpportunity.salaryRange,
              tags: newOpportunity.tags.map((t) => t.tag.name),
              url: opportunityUrl,
            });
            successCount++;
          } catch (err) {
            failureCount++;
            logger.warn(
              { err, email: user.email },
              "Failed to send opportunity alert email",
            );
          }
        }

        logger.info(
          {
            totalAudience: users.length,
            successful: successCount,
            failed: failureCount,
            opportunityId: newOpportunity.id,
          },
          "📢 Opportunity broadcast completed.",
        );
      })
      .catch((err) => {
        logger.error(
          { err },
          "❌ Critical failure in fetching users for broadcast",
        );
      });

    return newOpportunity;
  }

  /**
   * 🚜 REFINED: Retrieves all job opportunities with search and filtering.
   */
  public async findAll(filters: OpportunityQueryFilters) {
    const skip = Number(filters.skip) || 0;
    const take = Number(filters.take) || 10;
    const { q, type, isRemote, tags } = filters;

    const where: Prisma.OpportunityWhereInput = {};

    // 1. Fuzzy Search: Title, Company, or Description
    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { companyName: { contains: q, mode: "insensitive" } },
        { fullDescription: { contains: q, mode: "insensitive" } },
      ];
    }

    // 2. Strict Enum Filtering: Opportunity Type
    if (type) {
      where.type = type;
    }

    // 3. Remote Filtering: Boolean logic
    if (isRemote !== undefined) {
      where.isRemote = isRemote === "true" || isRemote === true;
    }

    // 4. Tag Filtering: Intersection via join table
    if (tags) {
      const tagList = tags.split(",").map((t) => t.trim().toLowerCase());
      if (tagList.length > 0) {
        where.tags = {
          some: {
            tag: {
              name: { in: tagList, mode: "insensitive" },
            },
          },
        };
      }
    }

    const [opportunities, total] = await prisma.$transaction([
      prisma.opportunity.findMany({
        where,
        skip,
        take,
        orderBy: { postedAt: "desc" },
        include: {
          poster: { select: { name: true, profileImage: true } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.opportunity.count({ where }),
    ]);

    return { opportunities, total };
  }

  /**
   * Retrieves a single job opportunity by its ID.
   */
  public async findOne(id: string) {
    const opportunity = await prisma.opportunity.findUnique({
      where: { id },
      include: {
        poster: { select: { name: true, profileImage: true } },
        tags: { include: { tag: true } },
      },
    });
    if (!opportunity) throw createHttpError(404, "Opportunity not found.");
    return opportunity;
  }

  /**
   * Updates an existing job opportunity.
   */
  public async update(id: string, data: UpdateOpportunityDto) {
    const { tags, retainedLogoUrl, ...opportunityData } = data;
    const uniqueTags = this.sanitizeTags(tags);

    const currentOpportunity = await this.findOne(id);

    if (
      opportunityData.companyLogoPublicId &&
      currentOpportunity.companyLogoPublicId &&
      currentOpportunity.companyLogoPublicId !==
        opportunityData.companyLogoPublicId
    ) {
      deleteFromCloudinary(currentOpportunity.companyLogoPublicId).catch(
        (err) =>
          logger.error(
            { err, publicId: currentOpportunity.companyLogoPublicId },
            "Failed to delete old company logo during update",
          ),
      );
    }

    const updatedOpportunity = await prisma.opportunity.update({
      where: { id },
      data: {
        ...opportunityData,
        tags: {
          deleteMany: {}, // Clear old relations
          create: uniqueTags.map((tagName) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
      include: {
        poster: { select: { name: true, profileImage: true } },
        tags: { include: { tag: true } },
      },
    });
    return updatedOpportunity;
  }

  /**
   * Deletes a job opportunity.
   */
  public async remove(id: string) {
    const opportunity = await this.findOne(id);

    if (opportunity.companyLogoPublicId) {
      await deleteFromCloudinary(opportunity.companyLogoPublicId).catch((err) =>
        logger.error(
          { err, publicId: opportunity.companyLogoPublicId },
          "Failed to delete company logo during opportunity removal",
        ),
      );
    }

    await prisma.opportunity.delete({ where: { id } });
  }
}

export const opportunityService = new OpportunityService();
