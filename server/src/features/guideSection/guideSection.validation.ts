//src/features/guideSection/guideSection.validation.ts
import { z } from "zod";

export const createGuideSectionSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long.")
      .max(150, "Title cannot exceed 150 characters.")
      .optional()
      .or(z.literal("")),

    content: z
      .string()
      .min(10, "Content must be at least 10 characters long.")
      .max(20000, "Content cannot exceed 20000 characters."),

    order: z.coerce.number().int().positive("Order must be a positive number."),

    videoUrl: z
      .string()
      .url("Please provide a valid URL.")
      .optional()
      .or(z.literal("")),
    image: z.any().optional(),
  }),
});

export const updateGuideSectionSchema = z.object({
  body: z.object({
    title: z
      .string()
      .max(150, "Title cannot exceed 150 characters.")
      .optional()
      .or(z.literal("")),
    content: z
      .string()
      .min(10, "Content must be at least 10 characters long.")
      .max(20000, "Content cannot exceed 20000 characters.")
      .optional(),
    order: z.coerce.number().int().positive().optional(),
    videoUrl: z.string().url().optional().or(z.literal("")),
    image: z.any().optional(),
    removeImage: z.string().optional(),
  }),
});
