//src/features/opportunities/opportunity.service.ts

import prisma from "@/db/prisma.js";
import { createHttpError } from "@/utils/error.factory.js";
import {
  CreateOpportunityDto,
  UpdateOpportunityDto,
} from "./opportunity.types.js";
import { emailService } from "../email/email.service.js";
import { config } from "@/config/index.js";
import { logger } from "@/config/logger.js";
import { deleteFromCloudinary } from "@/config/cloudinary.js"; // 🚜 Added

class OpportunityService {
  /**
   * Helper to ensure tags are unique, trimmed, and lowercase.
   * Prevents P2002 unique constraint errors on OpportunityTag table.
   */
  private sanitizeTags(tags: any): string[] {
    if (!tags || !Array.isArray(tags)) return [];

    const normalizedTags = tags.map((t: any) => {
      if (typeof t === "string") return t;
      if (typeof t === "object" && t.name) return t.name;
      return String(t);
    });

    return [
      ...new Set(normalizedTags.map((t: string) => t.trim().toLowerCase())),
    ].filter((t) => t.length > 0);
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
        // 🚜 DEV LOG: Visual feedback in terminal
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
        let failureCount = 0; // 🚜 Track failures separately

        for (const user of users) {
          try {
            await emailService.sendOpportunityAlert(user.email, {
              title: newOpportunity.title,
              companyName: newOpportunity.companyName,
              location: newOpportunity.location,
              type: newOpportunity.type, // 🚜 Added
              salaryRange: newOpportunity.salaryRange, // 🚜 Added
              tags: newOpportunity.tags.map((t) => t.tag.name), // 🚜 Added
              url: opportunityUrl,
            });
            successCount++;
          } catch (err) {
            failureCount++; // 🚜 Increment on error
            logger.warn(
              { err, email: user.email },
              "Failed to send opportunity alert email",
            );
          }
        }

        // 🚜 Updated logger with the full success/fail ratio
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
   * Retrieves all job opportunities with pagination.
   */
  public async findAll(pagination: { skip: number; take: number }) {
    const { skip, take } = pagination;
    const [opportunities, total] = await prisma.$transaction([
      prisma.opportunity.findMany({
        skip,
        take,
        orderBy: { postedAt: "desc" },
        include: {
          poster: { select: { name: true, profileImage: true } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.opportunity.count(),
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
    const { tags, retainedLogoUrl, ...opportunityData } = data; // 🚜 Added retainedLogoUrl
    const uniqueTags = this.sanitizeTags(tags);

    const currentOpportunity = await this.findOne(id);

    // 🚜 Asset Cleanup: If a new logo is uploaded, delete the old one from Cloudinary
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

    // 🚜 Final Wipe: Cleanup Cloudinary asset before DB deletion
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
