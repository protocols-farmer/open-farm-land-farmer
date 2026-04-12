import prisma from "@/db/prisma.js";
import { SystemRole } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";
import { CreateUpdateDto, UpdateUpdateDto } from "./update.types.js";
import { emailService } from "../email/email.service.js";
import { config } from "@/config/index.js";
import { logger } from "@/config/logger.js";

class UpdateService {
  public async create(data: CreateUpdateDto, authorId: string) {
    const newUpdate = await prisma.update.create({
      data: {
        ...data,
        author: { connect: { id: authorId } },
      },
      include: { author: { select: { name: true, profileImage: true } } },
    });

    // Broadcast in background
    prisma.user
      .findMany({
        where: { status: "ACTIVE", settings: { emailUpdates: true } },
        select: { email: true },
      })
      .then(async (users) => {
        if (users.length === 0) return;

        const updateUrl = `${config.socialAuth.frontendUrl}/updates/${newUpdate.id}`;
        for (const user of users) {
          try {
            await emailService.sendSystemUpdate(user.email, {
              title: newUpdate.title,
              version: newUpdate.version || null,
              contentPreview:
                newUpdate.content.replace(/[#*`_]/g, "").substring(0, 200) +
                "...",
              url: updateUrl,
            });
          } catch (err) {
            logger.warn({ err, email: user.email }, "Update email failed.");
          }
        }
      })
      .catch((err) =>
        logger.error({ err }, "Broadcast initialization failed."),
      );

    return newUpdate;
  }

  public async findAll(pagination: { skip: number; take: number }) {
    const { skip, take } = pagination;
    const [updates, total] = await prisma.$transaction([
      prisma.update.findMany({
        skip,
        take,
        orderBy: { publishedAt: "desc" },
        include: { author: { select: { name: true, profileImage: true } } },
      }),
      prisma.update.count(),
    ]);
    return { updates, total };
  }

  public async findOne(id: string) {
    const update = await prisma.update.findUnique({
      where: { id },
      include: { author: { select: { name: true, profileImage: true } } },
    });
    if (!update) throw createHttpError(404, "Update not found.");
    return update;
  }

  public async update(
    id: string,
    data: UpdateUpdateDto,
    userId: string,
    userRole: SystemRole,
  ) {
    const updateToModify = await this.findOne(id);
    const isAuthorized =
      updateToModify.authorId === userId ||
      userRole === SystemRole.SUPER_ADMIN ||
      userRole === SystemRole.DEVELOPER;

    if (!isAuthorized) throw createHttpError(403, "Not authorized to modify.");

    return prisma.update.update({
      where: { id },
      data,
      include: { author: { select: { name: true, profileImage: true } } },
    });
  }

  public async remove(id: string, userId: string, userRole: SystemRole) {
    const updateToModify = await this.findOne(id);
    const isAuthorized =
      updateToModify.authorId === userId ||
      userRole === SystemRole.SUPER_ADMIN ||
      userRole === SystemRole.DEVELOPER;

    if (!isAuthorized) throw createHttpError(403, "Not authorized to delete.");

    await prisma.update.delete({ where: { id } });
  }

  public async getLatestVersion() {
    return prisma.update.findFirst({
      where: {
        category: "APP_UPDATE",
        AND: [{ version: { not: null } }, { version: { not: "" } }],
      },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        version: true,
        title: true,
        publishedAt: true,
      },
    });
  }
}

export const updateService = new UpdateService();
