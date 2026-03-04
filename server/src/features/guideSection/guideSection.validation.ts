//src/features/guideSection/guideSection.validation.ts
import { z } from "zod";

/**
 * createGuideSectionSchema
 * Updated to make title optional, allowing sections to be created
 * with only content/images/video.
 */
export const createGuideSectionSchema = z.object({
  body: z.object({
    // FIX: Made optional and allowed empty strings to prevent 400 errors
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long.")
      .optional()
      .or(z.literal("")),

    content: z.string().min(10, "Content must be at least 10 characters long."),

    // Coerce form data from string to number (Multer sends everything as strings)
    order: z.coerce.number().int().positive("Order must be a positive number."),

    videoUrl: z
      .string()
      .url("Please provide a valid URL.")
      .optional()
      .or(z.literal("")),

    // Note: Image is handled by Multer middleware, not validated in this Zod body schema
  }),
});

/**
 * updateGuideSectionSchema
 */
export const updateGuideSectionSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional().or(z.literal("")),
    content: z.string().min(10).optional(),
    order: z.coerce.number().int().positive().optional(),
    videoUrl: z.string().url().optional().or(z.literal("")),
  }),
});
