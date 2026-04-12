//src/lib/schemas/guide.schemas.ts
import { z } from "zod";

export const createGuideSectionSchema = z.object({
  title: z
    .string()
    .min(3, "Section title must be at least 3 characters.")
    .max(150, "Section title cannot exceed 150 characters.")
    .optional()
    .or(z.literal("")),

  content: z
    .string()
    .min(10, "Technical content must be at least 10 characters.")
    .max(20000, "Technical content cannot exceed 20000 characters."),

  order: z.coerce.number().int().positive("Order must be a positive number."),

  videoUrl: z
    .string()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),

  image: z.any().optional(),
});

export const updateGuideSectionSchema = z.object({
  title: z
    .string()
    .min(3, "Section title must be at least 3 characters.")
    .max(150, "Section title cannot exceed 150 characters.")
    .optional()
    .or(z.literal("")),

  content: z
    .string()
    .min(10, "Technical content must be at least 10 characters.")
    .max(20000, "Technical content cannot exceed 20000 characters.")
    .optional(),

  order: z.coerce
    .number()
    .int()
    .positive("Order must be a positive number.")
    .optional(),

  videoUrl: z
    .string()
    .url("Please enter a valid URL.")
    .optional()
    .or(z.literal("")),

  image: z.any().optional(),
  removeImage: z.string().optional(),
});
