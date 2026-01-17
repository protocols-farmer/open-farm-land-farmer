import prisma from "@/db/prisma.js";
import { Prisma, ProjectUpdate } from "@prisma-client";
import { createHttpError } from "@/utils/error.factory.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "@/config/cloudinary.js";
import {
  CreateProjectUpdateDto,
  UpdateProjectUpdateDto,
} from "./projectUpdate.types.js";

class ProjectUpdateService {
  /**
   * Create a new project update entry.
   */
  async create(
    userId: string,
    postId: string,
    data: CreateProjectUpdateDto,
    imageFile?: Express.Multer.File
  ): Promise<ProjectUpdate> {
    const parentPost = await prisma.post.findUnique({ where: { id: postId } });
    if (!parentPost || parentPost.authorId !== userId) {
      throw createHttpError(
        403,
        "You are not authorized to update this project."
      );
    }

    const createData: Prisma.ProjectUpdateCreateInput = {
      ...data,
      date: new Date(data.date),
      post: { connect: { id: postId } },
    };

    if (imageFile) {
      const result = await uploadToCloudinary(
        imageFile.path,
        "project_updates"
      );
      createData.imageUrl = result.secure_url;
      createData.imagePublicId = result.public_id;
    }

    return prisma.projectUpdate.create({ data: createData });
  }

  /**
   * Update an existing project update entry.
   */
  async update(
    userId: string,
    updateId: string,
    data: UpdateProjectUpdateDto,
    imageFile?: Express.Multer.File
  ): Promise<ProjectUpdate> {
    const projectUpdate = await prisma.projectUpdate.findUnique({
      where: { id: updateId },
      include: { post: true },
    });

    if (!projectUpdate || projectUpdate.post.authorId !== userId) {
      throw createHttpError(403, "You are not authorized to edit this entry.");
    }

    const updateData: Prisma.ProjectUpdateUpdateInput = { ...data };
    if (data.date) updateData.date = new Date(data.date);

    if (imageFile) {
      // If a new image is uploaded, delete the old one first
      if (projectUpdate.imagePublicId) {
        await deleteFromCloudinary(projectUpdate.imagePublicId);
      }
      const result = await uploadToCloudinary(
        imageFile.path,
        "project_updates"
      );
      updateData.imageUrl = result.secure_url;
      updateData.imagePublicId = result.public_id;
    }

    return prisma.projectUpdate.update({
      where: { id: updateId },
      data: updateData,
    });
  }

  /**
   * Delete a project update entry.
   */
  async delete(userId: string, updateId: string): Promise<void> {
    const projectUpdate = await prisma.projectUpdate.findUnique({
      where: { id: updateId },
      include: { post: true },
    });

    if (!projectUpdate || projectUpdate.post.authorId !== userId) {
      throw createHttpError(
        403,
        "You are not authorized to delete this entry."
      );
    }

    if (projectUpdate.imagePublicId) {
      await deleteFromCloudinary(projectUpdate.imagePublicId);
    }

    await prisma.projectUpdate.delete({ where: { id: updateId } });
  }
}

export const projectUpdateService = new ProjectUpdateService();
