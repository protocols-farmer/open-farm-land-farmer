// src/features/updates/update.validation.ts
import { z } from "zod";
import { UpdateCategory } from "@prisma-client";

const updateCategoryValues = Object.values(UpdateCategory) as [
  string,
  ...string[],
];

export const createUpdateSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters.")
      .max(150, "Title cannot exceed 150 characters."), // 🚜 Synced with frontend

    content: z
      .string()
      .min(20, "Content must be at least 20 characters.")
      .max(5000, "Content is too long (max 5000 characters)."), // 🚜 Security cap

    category: z.enum(updateCategoryValues, {
      message: "Please select a valid category.",
    }),

    version: z
      .string()
      .trim()
      .max(20, "Version identifier is too long (max 20 characters).") // 🚜 Cap for version
      .optional()
      .nullable(),
  }),
});

export const updateUpdateSchema = z.object({
  body: createUpdateSchema.shape.body.partial(),
});
