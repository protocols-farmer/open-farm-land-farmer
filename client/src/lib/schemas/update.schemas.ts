// src/lib/schemas/update.schemas.ts
import { z } from "zod";

/**
 * 🚜 Update Validation Schema
 * Matches the backend's allowed categories and character limits.
 */
export const createUpdateSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(150, "Title cannot exceed 150 characters."),

  content: z
    .string()
    .min(20, "Content must be at least 20 characters.")
    .max(5000, "Content is too long (max 5000 characters)."),

  category: z.enum(["APP_UPDATE", "MARKETING", "COMMUNITY"], {
    errorMap: () => ({ message: "Please select a valid update category." }),
  }),

  version: z
    .string()
    .max(20, "Version identifier is too long (max 20 characters).")
    .optional()
    .or(z.literal("")),
});

export const updateUpdateSchema = createUpdateSchema.partial();

export type CreateUpdateFormValues = z.infer<typeof createUpdateSchema>;
export type UpdateUpdateFormValues = z.infer<typeof updateUpdateSchema>;
