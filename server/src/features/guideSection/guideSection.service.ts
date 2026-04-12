import prisma from "@/db/prisma.js";
import { Prisma, GuideSection } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/config/cloudinary.js";
import {
  CreateGuideSectionDto,
  UpdateGuideSectionDto,
} from "./guideSection.types.js";

class GuideSectionService {
  /**
   * Internal security check to ensure user is the author of the parent guide via section ID.
   */
  private async verifyAuthorshipBySection(userId: string, sectionId: string) {
    const section = await prisma.guideSection.findUnique({
      where: { id: sectionId },
      include: { step: { include: { post: { select: { authorId: true } } } } },
    });

    if (!section) throw createHttpError(404, "Guide section not found.");

    if (section.step.post.authorId !== userId) {
      throw createHttpError(
        403,
        "You are not authorized to modify this technical section.",
      );
    }
    return section;
  }

  /**
   * Internal security check to ensure user is the author of the parent guide via step ID.
   */
  private async verifyAuthorshipByStep(userId: string, stepId: string) {
    const step = await prisma.guideStep.findUnique({
      where: { id: stepId },
      include: { post: { select: { authorId: true } } },
    });

    if (!step) throw createHttpError(404, "Parent guide step not found.");

    if (step.post.authorId !== userId) {
      throw createHttpError(
        403,
        "You are not authorized to add sections to this guide.",
      );
    }
  }

  /**
   * Create a new guide section.
   * Handles empty title strings by converting them to null to prevent UI spacing issues.
   */
  async create(
    userId: string,
    stepId: string,
    data: CreateGuideSectionDto,
    imageFile?: Express.Multer.File,
  ): Promise<GuideSection> {
    await this.verifyAuthorshipByStep(userId, stepId);

    const createData: Prisma.GuideSectionCreateInput = {
      content: data.content,
      order: Number(data.order),
      // 🚜 NULL Logic: Ensures empty strings don't render as empty headers in the UI
      title: data.title?.trim() ? data.title : null,
      videoUrl: data.videoUrl || null,
      step: { connect: { id: stepId } },
    };

    if (imageFile) {
      const result = await uploadToCloudinary(imageFile.path, "guide_sections");
      createData.imageUrl = result.secure_url;
      createData.imagePublicId = result.public_id;
    }

    return prisma.guideSection.create({ data: createData });
  }

  /**
   * Update an existing guide section.
   * Logic: Handles explicit image removal, replacement, and title nullification.
   */
  async update(
    userId: string,
    sectionId: string,
    data: UpdateGuideSectionDto & { removeImage?: string },
    imageFile?: Express.Multer.File,
  ): Promise<GuideSection> {
    const guideSection = await this.verifyAuthorshipBySection(
      userId,
      sectionId,
    );

    const updateData: Prisma.GuideSectionUpdateInput = {};

    if (data.content !== undefined) updateData.content = data.content;
    if (data.order !== undefined) updateData.order = Number(data.order);
    if (data.videoUrl !== undefined)
      updateData.videoUrl = data.videoUrl || null;

    if (data.title !== undefined) {
      updateData.title = data.title?.trim() ? data.title : null;
    }

    // 1. 🚜 EXPLICIT REMOVAL: User cleared the image in the UI
    if (data.removeImage === "true" && !imageFile) {
      if (guideSection.imagePublicId) {
        await deleteFromCloudinary(guideSection.imagePublicId);
      }
      updateData.imageUrl = null;
      updateData.imagePublicId = null;
    }

    // 2. 🚜 IMAGE REPLACEMENT: User uploaded a new file
    if (imageFile) {
      if (guideSection.imagePublicId) {
        await deleteFromCloudinary(guideSection.imagePublicId);
      }
      const result = await uploadToCloudinary(imageFile.path, "guide_sections");
      updateData.imageUrl = result.secure_url;
      updateData.imagePublicId = result.public_id;
    }

    return prisma.guideSection.update({
      where: { id: sectionId },
      data: updateData,
    });
  }

  /**
   * Delete a guide section.
   * Ensures Cloudinary assets are purged before the record is removed.
   */
  async delete(userId: string, sectionId: string): Promise<void> {
    const guideSection = await this.verifyAuthorshipBySection(
      userId,
      sectionId,
    );

    if (guideSection.imagePublicId) {
      await deleteFromCloudinary(guideSection.imagePublicId);
    }

    await prisma.guideSection.delete({ where: { id: sectionId } });
  }
}

export const guideSectionService = new GuideSectionService();
