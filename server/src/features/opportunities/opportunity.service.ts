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
  private sanitizeTags(tags: any): string[] {
    if (!tags || !Array.isArray(tags)) return [];
    const normalizedTags = tags.map((t: any) => {
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

  public async create(data: CreateOpportunityDto, posterId: string) {
    const { tags, ...opportunityData } = data;
    const uniqueTags = this.sanitizeTags(tags);

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

    // Background Broadcast
    prisma.user
      .findMany({
        where: { status: "ACTIVE", settings: { emailMarketing: true } },
        select: { email: true },
      })
      .then(async (users) => {
        if (users.length === 0) return;
        const opportunityUrl = `${config.socialAuth.frontendUrl}/opportunities/${newOpportunity.id}`;
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
          } catch (err) {
            logger.warn(
              { err, email: user.email },
              "Opportunity alert failed.",
            );
          }
        }
      })
      .catch((err) =>
        logger.error({ err }, "Broadcast initialization failed."),
      );

    return newOpportunity;
  }

  public async findAll(filters: OpportunityQueryFilters) {
    const skip = Number(filters.skip) || 0;
    const take = Number(filters.take) || 12;
    const { q, type, isRemote, tags } = filters;
    const where: Prisma.OpportunityWhereInput = {};

    if (q) {
      where.OR = [
        { title: { contains: q, mode: "insensitive" } },
        { companyName: { contains: q, mode: "insensitive" } },
        { fullDescription: { contains: q, mode: "insensitive" } },
      ];
    }
    if (type) where.type = type;
    if (isRemote !== undefined)
      where.isRemote = isRemote === "true" || isRemote === true;
    if (tags) {
      const tagList = tags.split(",").map((t) => t.trim().toLowerCase());
      if (tagList.length > 0) {
        where.tags = {
          some: { tag: { name: { in: tagList, mode: "insensitive" } } },
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

  public async update(id: string, data: UpdateOpportunityDto) {
    const { tags, retainedLogoUrl, ...opportunityData } = data;
    const uniqueTags = this.sanitizeTags(tags);
    const current = await this.findOne(id);

    if (
      opportunityData.companyLogoPublicId &&
      current.companyLogoPublicId &&
      current.companyLogoPublicId !== opportunityData.companyLogoPublicId
    ) {
      deleteFromCloudinary(current.companyLogoPublicId).catch((err) =>
        logger.error(err, "Old logo cleanup failed."),
      );
    }

    return prisma.opportunity.update({
      where: { id },
      data: {
        ...opportunityData,
        tags: {
          deleteMany: {},
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
  }

  public async remove(id: string) {
    const opportunity = await this.findOne(id);
    if (opportunity.companyLogoPublicId) {
      await deleteFromCloudinary(opportunity.companyLogoPublicId).catch((err) =>
        logger.error(err, "Cleanup failure."),
      );
    }
    await prisma.opportunity.delete({ where: { id } });
  }
}

export const opportunityService = new OpportunityService();
