// src/features/opportunities/opportunity.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { createHttpError } from "@/utils/error.factory.js";
import { opportunityService } from "./opportunity.service.js";

class OpportunityController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const posterId = req.user?.id;
    if (!posterId) throw createHttpError(401, "Authentication required.");

    const newOpportunity = await opportunityService.create(req.body, posterId);
    res.status(201).json({ success: true, data: newOpportunity });
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
    const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
    const take = req.query.take ? parseInt(req.query.take as string) : 10;
    const { opportunities, total } = await opportunityService.findAll({
      skip,
      take,
    });
    res.status(200).json({ success: true, data: opportunities, total });
  });

  findOne = asyncHandler(async (req: Request, res: Response) => {
    const opportunity = await opportunityService.findOne(req.params.id);
    res.status(200).json({ success: true, data: opportunity });
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const updated = await opportunityService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  });

  remove = asyncHandler(async (req: Request, res: Response) => {
    await opportunityService.remove(req.params.id);
    res.status(204).send();
  });
}

export const opportunityController = new OpportunityController();
