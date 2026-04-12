//src/features/guideSection/guideStep.service.ts
import prisma from "@/db/prisma.js";
import { GuideStep, Prisma } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";
import { CreateGuideStepDto, UpdateGuideStepDto } from "./guideStep.types.js";

class GuideStepService {
  /**
   * Internal security check to ensure the user owns the parent Post.
   */
  private async verifyAuthorship(userId: string, postId: string) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw createHttpError(404, "Parent post not found.");

    if (post.authorId !== userId) {
      throw createHttpError(
        403,
        "Not authorized to modify this guide's structure.",
      );
    }
  }

  /**
   * Creates a new technical step.
   * Forces 'order' to Number to handle FormData/Query string inputs.
   */
  async create(
    userId: string,
    postId: string,
    data: CreateGuideStepDto,
  ): Promise<GuideStep> {
    await this.verifyAuthorship(userId, postId);

    return prisma.guideStep.create({
      data: {
        title: data.title,
        description: data.description,
        order: Number(data.order),
        post: { connect: { id: postId } },
      },
    });
  }

  /**
   * Updates step details.
   * Performs an inclusive lookup to verify authorship via the relation tree.
   */
  async update(
    userId: string,
    stepId: string,
    data: UpdateGuideStepDto,
  ): Promise<GuideStep> {
    const step = await prisma.guideStep.findUnique({
      where: { id: stepId },
      include: { post: { select: { authorId: true } } },
    });

    if (!step) throw createHttpError(404, "Guide step not found.");

    if (step.post.authorId !== userId) {
      throw createHttpError(403, "Unauthorized: You do not own this guide.");
    }

    // 🚜 Strictly map data to avoid unexpected payload injection
    const updateData: Prisma.GuideStepUpdateInput = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.order !== undefined) updateData.order = Number(data.order);

    return prisma.guideStep.update({
      where: { id: stepId },
      data: updateData,
    });
  }

  /**
   * Removes a step.
   * Cascade deletion of associated GuideSections is handled at the database level.
   */
  async delete(userId: string, stepId: string): Promise<void> {
    const step = await prisma.guideStep.findUnique({
      where: { id: stepId },
      include: { post: { select: { authorId: true } } },
    });

    if (!step) throw createHttpError(404, "Guide step not found.");

    if (step.post.authorId !== userId) {
      throw createHttpError(403, "Unauthorized deletion attempt.");
    }

    await prisma.guideStep.delete({ where: { id: stepId } });
  }
}

export const guideStepService = new GuideStepService();
