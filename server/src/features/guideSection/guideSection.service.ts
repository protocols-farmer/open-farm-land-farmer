//src/features/guideSection/guideSection.service.ts
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
   * Security check to ensure user is the author of the parent guide.
   */
  private async verifyAuthorshipBySection(userId: string, sectionId: string) {
    const section = await prisma.guideSection.findUnique({
      where: { id: sectionId },
      include: { step: { include: { post: { select: { authorId: true } } } } },
    });
    if (!section || section.step.post.authorId !== userId) {
      throw createHttpError(
        403,
        "You are not authorized to modify this section.",
      );
    }
    return section;
  }

  /**
   * Security check for creating a new section via stepId.
   */
  private async verifyAuthorshipByStep(userId: string, stepId: string) {
    const step = await prisma.guideStep.findUnique({
      where: { id: stepId },
      include: { post: { select: { authorId: true } } },
    });
    if (!step || step.post.authorId !== userId) {
      throw createHttpError(
        403,
        "You are not authorized to add a section to this step.",
      );
    }
  }

  /**
   * Create a new guide section.
   * Handles empty title strings by converting them to null to prevent UI gaps.
   */
  async create(
    userId: string,
    stepId: string,
    data: CreateGuideSectionDto,
    imageFile?: Express.Multer.File,
  ): Promise<GuideSection> {
    await this.verifyAuthorshipByStep(userId, stepId);

    // Build the create input explicitly to handle exactOptionalPropertyTypes
    const createData: Prisma.GuideSectionCreateInput = {
      content: data.content,
      order: Number(data.order),
      // If title is missing or just whitespace, store as null
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
   * Handles image replacement and explicit image removal via 'removeImage' flag.
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

    // Map properties explicitly to avoid 'undefined' type errors
    const updateData: Prisma.GuideSectionUpdateInput = {};

    if (data.content !== undefined) updateData.content = data.content;
    if (data.order !== undefined) updateData.order = Number(data.order);
    if (data.videoUrl !== undefined)
      updateData.videoUrl = data.videoUrl || null;

    // Explicitly nullify title if it's an empty string or whitespace
    if (data.title !== undefined) {
      updateData.title = data.title?.trim() ? data.title : null;
    }

    // 1. HANDLE EXPLICIT REMOVAL (When user clicks 'X' in UI)
    // We check for the string "true" because Multer/FormData converts booleans to strings.
    if (data.removeImage === "true" && !imageFile) {
      if (guideSection.imagePublicId) {
        await deleteFromCloudinary(guideSection.imagePublicId);
      }
      updateData.imageUrl = null;
      updateData.imagePublicId = null;
    }

    // 2. HANDLE IMAGE REPLACEMENT (New file uploaded)
    if (imageFile) {
      // Clean up the old asset first
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
