// src/features/updates/update.validation.ts
import { z } from "zod";
import { UpdateCategory } from "@prisma-client";

const updateCategoryValues = Object.values(UpdateCategory) as [
  string,
  ...string[],
];

// src/features/updates/update.validation.ts
export const createUpdateSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters.")
      .max(100, "Title cannot exceed 100 characters."), // 🚜 Matches Opportunity Title limit
    content: z.string().min(20, "Content must be at least 20 characters."),
    category: z.enum(updateCategoryValues, {
      message: "Please select a valid category.",
    }),
    version: z.string().trim().optional().nullable(), // 🚜 Trim whitespace
  }),
});

export const updateUpdateSchema = z.object({
  body: createUpdateSchema.shape.body.partial(),
});
