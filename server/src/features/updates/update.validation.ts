//src/features/updates/update.validation.ts
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
      .max(150, "Title cannot exceed 150 characters."),

    content: z
      .string()
      .min(20, "Content must be at least 20 characters.")
      .max(5000, "Content is too long (max 5000 characters)."),

    category: z.enum(updateCategoryValues, {
      message: "Please select a valid update category.",
    }),

    version: z
      .string()
      .trim()
      .max(20, "Version identifier is too long (max 20 characters).")
      .optional()
      .nullable()
      .or(z.literal("")),
  }),
});

export const updateUpdateSchema = z.object({
  body: createUpdateSchema.shape.body.partial(),
});
