import prisma from "@/db/prisma.js";
import { createHttpError } from "@/utils/error.factory.js";
import {
  AdminAppealQuery,
  AdminAppealRow,
  CreateAppealDto,
  ReviewAppealDto,
} from "./appeal.types.js";

class AppealService {
  /**
   * User Submits an Appeal
   * Logic: Trims reason and links it to the latest active sanction.
   */
  public async submitAppeal(userId: string, data: CreateAppealDto) {
    const activeSanction = await prisma.userSanction.findFirst({
      where: { userId, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
    });

    if (!activeSanction) {
      throw createHttpError(
        404,
        "No active suspension or ban found to appeal.",
      );
    }

    const existingAppeal = await prisma.appeal.findUnique({
      where: { sanctionId: activeSanction.id },
    });

    if (existingAppeal) {
      throw createHttpError(
        409,
        "You have already submitted an appeal for this action.",
      );
    }

    return await prisma.$transaction(async (tx) => {
      const appeal = await tx.appeal.create({
        data: {
          reason: data.reason.trim(),
          userId,
          sanctionId: activeSanction.id,
        },
      });

      await tx.userSanction.update({
        where: { id: activeSanction.id },
        data: { status: "APPEALED" },
      });

      return appeal;
    });
  }

  /**
   * Admin fetches all appeals (with search and pagination)
   */
  public async getAppeals(
    query: AdminAppealQuery,
  ): Promise<{ appeals: AdminAppealRow[]; total: number }> {
    const { page = 1, limit = 10, status, q } = query;
    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (q) {
      where.user = {
        OR: [
          { username: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } },
        ],
      };
    }

    const [appeals, total] = await prisma.$transaction([
      prisma.appeal.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              profileImage: true,
              status: true,
            },
          },
          sanction: {
            select: { id: true, type: true, reason: true, expiresAt: true },
          },
          reviewer: {
            select: { id: true, username: true },
          },
        },
      }),
      prisma.appeal.count({ where }),
    ]);

    return { appeals: appeals as unknown as AdminAppealRow[], total };
  }

  /**
   * Admin reviews (Approves or Rejects) an appeal
   * Logic: Trims admin notes and updates user status accordingly.
   */
  public async reviewAppeal(
    appealId: string,
    adminId: string,
    data: ReviewAppealDto,
  ) {
    const appeal = await prisma.appeal.findUnique({
      where: { id: appealId },
      include: { sanction: true },
    });

    if (!appeal) {
      throw createHttpError(404, "Appeal not found.");
    }

    if (appeal.status !== "PENDING") {
      throw createHttpError(400, "This appeal has already been reviewed.");
    }

    return await prisma.$transaction(async (tx) => {
      const updatedAppeal = await tx.appeal.update({
        where: { id: appealId },
        data: {
          status: data.status,

          adminNotes: data.adminNotes?.trim() || null,
          reviewerId: adminId,
        },
      });

      if (data.status === "APPROVED") {
        await tx.userSanction.update({
          where: { id: appeal.sanctionId },
          data: { status: "EXPIRED" },
        });

        await tx.user.update({
          where: { id: appeal.userId },
          data: { status: "ACTIVE" },
        });
      } else if (data.status === "REJECTED") {
        await tx.userSanction.update({
          where: { id: appeal.sanctionId },
          data: { status: "ACTIVE" },
        });
      }

      return updatedAppeal;
    });
  }
}

export const appealService = new AppealService();
