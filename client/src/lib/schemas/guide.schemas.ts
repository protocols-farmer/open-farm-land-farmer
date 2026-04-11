//src/lib/schemas/guide.schemas.ts
import { z } from "zod";

// ==========================================
// GUIDE STEP SCHEMAS
// ==========================================

export const createGuideStepSchema = z.object({
  title: z
    .string()
    .min(3, "Step title must be at least 3 characters.")
    .max(150, "Step title cannot exceed 150 characters."),

  description: z
    .string()
    .min(10, "Technical briefing must be at least 10 characters.")
    .max(1000, "Technical briefing cannot exceed 1000 characters."),

  order: z.coerce.number().int().positive("Order must be a positive number."),
});

export const updateGuideStepSchema = z.object({
  title: z
    .string()
    .min(3, "Step title must be at least 3 characters.")
    .max(150, "Step title cannot exceed 150 characters.")
    .optional(),

  description: z
    .string()
    .min(10, "Technical briefing must be at least 10 characters.")
    .max(1000, "Technical briefing cannot exceed 1000 characters.")
    .optional(),

  order: z.coerce
    .number()
    .int()
    .positive("Order must be a positive number.")
    .optional(),
});

export type CreateGuideStepValues = z.infer<typeof createGuideStepSchema>;
export type UpdateGuideStepValues = z.infer<typeof updateGuideStepSchema>;

// ==========================================
// GUIDE SECTION SCHEMAS
// ==========================================

export const createGuideSectionSchema = z.object({
  title: z
    .string()
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

export type CreateGuideSectionValues = z.infer<typeof createGuideSectionSchema>;
export type UpdateGuideSectionValues = z.infer<typeof updateGuideSectionSchema>;
