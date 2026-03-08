//src/lib/schemas/update.schemas.ts
import { z } from "zod";

const UpdateCategoryEnum = z.enum(["APP_UPDATE", "MARKETING", "COMMUNITY"], {
  required_error: "You must select an update category.",
});

export const createUpdateSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long.")
    .max(255, "Title cannot exceed 255 characters."), // Synced with backend limit

  content: z.string().min(20, "Content must be at least 20 characters long."),

  category: UpdateCategoryEnum,

  // Fix: Allows the field to be optional or an empty string from the HTML input
  version: z.string().optional().or(z.literal("")),
});

export type CreateUpdateFormValues = z.infer<typeof createUpdateSchema>;

export const updateUpdateSchema = createUpdateSchema.partial();
export type UpdateUpdateFormValues = z.infer<typeof updateUpdateSchema>;
