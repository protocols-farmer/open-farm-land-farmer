//src/features/guideSection/guideStep.validation.ts
import { z } from "zod";

export const createGuideStepSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Step title must be at least 3 characters.")
      .max(150, "Step title cannot exceed 150 characters."),

    description: z
      .string()
      .min(10, "Technical briefing must be at least 10 characters.")
      .max(1000, "Technical briefing cannot exceed 1000 characters."),

    order: z.coerce.number().int().positive("Order must be a positive number."),
  }),
});

export const updateGuideStepSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(150).optional(),
    description: z.string().min(10).max(1000).optional(),
    order: z.coerce.number().int().positive().optional(),
  }),
});
