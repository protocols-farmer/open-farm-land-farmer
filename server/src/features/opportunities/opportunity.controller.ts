//src/features/opportunities/opportunity.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { createHttpError } from "@/utils/error.factory.js";
import { opportunityService } from "./opportunity.service.js";
import { uploadToCloudinary } from "@/config/cloudinary.js";
import { logger } from "@/config/logger.js";

class OpportunityController {
  /**
   * Helper to cast FormData strings back to proper types for Prisma.
   * Handles Booleans and JSON-encoded Arrays.
   */
  private prepareData(rawData: any) {
    const data = { ...rawData };

    // 1. 🚜 Cast isRemote from "true"/"false" string to actual Boolean
    if (data.isRemote !== undefined) {
      data.isRemote = data.isRemote === "true" || data.isRemote === true;
    }

    // 2. 🚜 Parse JSON strings back into actual Arrays for Prisma
    const arrayFields = ["tags", "responsibilities", "qualifications"];
    arrayFields.forEach((field) => {
      if (data[field]) {
        try {
          data[field] =
            typeof data[field] === "string"
              ? JSON.parse(data[field])
              : data[field];
        } catch (e) {
          // If parsing fails, we keep it as is or handle it as an error
          logger.warn(
            { field, value: data[field] },
            `⚠️ Failed to parse ${field} as JSON.`,
          );
        }
      }
    });

    return data;
  }

  /**
   * Creates a new opportunity and handles logo upload to Cloudinary.
   */
  create = asyncHandler(async (req: Request, res: Response) => {
    const posterId = req.user?.id;
    if (!posterId) throw createHttpError(401, "Authentication required.");

    // 🚜 Cast types from FormData
    const opportunityData = this.prepareData(req.body);

    // Handle Company Logo Upload
    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.path, "company_logos");
        opportunityData.companyLogo = result.secure_url;
        opportunityData.companyLogoPublicId = result.public_id;
      } catch (error) {
        logger.error(
          { error },
          "❌ Failed to upload company logo to Cloudinary.",
        );
        throw createHttpError(500, "Could not upload company logo.");
      }
    }

    const newOpportunity = await opportunityService.create(
      opportunityData,
      posterId,
    );
    res.status(201).json({ success: true, data: newOpportunity });
  });

  /**
   * Retrieves all job opportunities with pagination.
   */
  findAll = asyncHandler(async (req: Request, res: Response) => {
    const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
    const take = req.query.take ? parseInt(req.query.take as string) : 10;
    const { opportunities, total } = await opportunityService.findAll({
      skip,
      take,
    });
    res.status(200).json({ success: true, data: opportunities, total });
  });

  /**
   * Retrieves a single opportunity by ID.
   */
  findOne = asyncHandler(async (req: Request, res: Response) => {
    const opportunity = await opportunityService.findOne(req.params.id);
    res.status(200).json({ success: true, data: opportunity });
  });

  /**
   * Updates opportunity and handles logo replacement.
   */
  update = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // 🚜 Cast types from FormData
    const updateData = this.prepareData(req.body);

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.path, "company_logos");
        updateData.companyLogo = result.secure_url;
        updateData.companyLogoPublicId = result.public_id;
      } catch (error) {
        logger.error({ error }, "❌ Failed to upload new logo.");
        throw createHttpError(500, "Could not upload new company logo.");
      }
    }

    const updated = await opportunityService.update(id, updateData);
    res.status(200).json({ success: true, data: updated });
  });

  /**
   * Removes an opportunity.
   */
  remove = asyncHandler(async (req: Request, res: Response) => {
    await opportunityService.remove(req.params.id);
    res.status(204).send();
  });
}

export const opportunityController = new OpportunityController();
