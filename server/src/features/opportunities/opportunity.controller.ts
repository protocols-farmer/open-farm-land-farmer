// server/src/features/opportunities/opportunity.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { createHttpError } from "@/utils/error.factory.js";
import { opportunityService } from "./opportunity.service.js";
import { uploadToCloudinary } from "@/config/cloudinary.js";
import { logger } from "@/config/logger.js";
import { OpportunityType } from "@prisma-client";

class OpportunityController {
  private prepareData(rawData: any) {
    const data = { ...rawData };
    if (data.isRemote !== undefined) {
      data.isRemote = data.isRemote === "true" || data.isRemote === true;
    }
    const arrayFields = ["tags", "responsibilities", "qualifications"];
    arrayFields.forEach((field) => {
      if (data[field]) {
        try {
          data[field] =
            typeof data[field] === "string"
              ? JSON.parse(data[field])
              : data[field];
        } catch (e) {
          logger.warn(
            { field, value: data[field] },
            `⚠️ Failed to parse ${field} as JSON.`,
          );
        }
      }
    });
    return data;
  }

  create = asyncHandler(async (req: Request, res: Response) => {
    const posterId = req.user?.id;
    if (!posterId) throw createHttpError(401, "Authentication required.");

    const opportunityData = this.prepareData(req.body);

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.path, "company_logos");
        opportunityData.companyLogo = result.secure_url;
        opportunityData.companyLogoPublicId = result.public_id;
      } catch (error) {
        throw createHttpError(500, "Could not upload company logo.");
      }
    }

    const newOpportunity = await opportunityService.create(
      opportunityData,
      posterId,
    );
    res.status(201).json({ success: true, data: newOpportunity });
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
    const take = req.query.take ? parseInt(req.query.take as string) : 12;

    const { opportunities, total } = await opportunityService.findAll({
      skip,
      take,
      q: req.query.q as string,
      type: req.query.type as OpportunityType,
      isRemote: req.query.isRemote as string,
      tags: req.query.tags as string,
    });

    res.status(200).json({
      success: true,
      data: opportunities,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / take),
        currentPage: Math.floor(skip / take) + 1,
      },
    });
  });

  findOne = asyncHandler(async (req: Request, res: Response) => {
    const opportunity = await opportunityService.findOne(req.params.id);
    res.status(200).json({ success: true, data: opportunity });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const updateData = this.prepareData(req.body);

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.path, "company_logos");
        updateData.companyLogo = result.secure_url;
        updateData.companyLogoPublicId = result.public_id;
      } catch (error) {
        throw createHttpError(500, "Could not upload new company logo.");
      }
    }

    const updated = await opportunityService.update(req.params.id, updateData);
    res.status(200).json({ success: true, data: updated });
  });

  remove = asyncHandler(async (req: Request, res: Response) => {
    await opportunityService.remove(req.params.id);
    res.status(204).send();
  });
}

export const opportunityController = new OpportunityController();
