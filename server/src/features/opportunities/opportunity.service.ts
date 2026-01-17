// src/features/opportunities/opportunity.service.ts
import prisma from "@/db/prisma.js";
import { createHttpError } from "@/utils/error.factory.js";
import {
  CreateOpportunityDto,
  UpdateOpportunityDto,
} from "./opportunity.types.js";

class OpportunityService {
  /**
   * Creates a new job opportunity.
   * @param data - The data for the new opportunity.
   * @param posterId - The ID of the user posting the opportunity.
   */
  public async create(data: CreateOpportunityDto, posterId: string) {
    const { tags, ...opportunityData } = data;

    const newOpportunity = await prisma.opportunity.create({
      data: {
        ...opportunityData,
        poster: { connect: { id: posterId } },
        ...(tags &&
          tags.length > 0 && {
            tags: {
              create: tags.map((tagName) => ({
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
    return newOpportunity;
  }

  /**
   * Retrieves all job opportunities with pagination.
   * @param pagination - Skip and take values for pagination.
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
   * @param id - The ID of the opportunity.
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
   * @param id - The ID of the opportunity to update.
   * @param data - The new data for the opportunity.
   */
  public async update(id: string, data: UpdateOpportunityDto) {
    const { tags, ...opportunityData } = data;

    const updatedOpportunity = await prisma.opportunity.update({
      where: { id },
      data: {
        ...opportunityData,
        ...(tags && {
          tags: {
            deleteMany: {}, // Remove all existing tags
            create: tags.map((tagName) => ({
              // Create new tag connections
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
    return updatedOpportunity;
  }

  /**
   * Deletes a job opportunity.
   * @param id - The ID of the opportunity to delete.
   */
  public async remove(id: string) {
    // First ensure the opportunity exists
    await this.findOne(id);
    await prisma.opportunity.delete({ where: { id } });
  }
}

export const opportunityService = new OpportunityService();
