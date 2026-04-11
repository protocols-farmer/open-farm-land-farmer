import { z } from "zod";
import { ProjectUpdateCategory } from "@prisma-client";

const categoryValues = Object.values(ProjectUpdateCategory) as [
  string,
  ...string[],
];

/**
 * createProjectUpdateSchema
 * Explicitly defined for the backend request body.
 */
export const createProjectUpdateSchema = z.object({
  body: z.object({
    version: z
      .string()
      .min(1, "Version is required.")
      .max(50, "Version cannot exceed 50 characters."),

    date: z.coerce.date({
      message: "A valid date is required.",
    }),

    title: z
      .string()
      .min(3, "Title must be at least 3 characters.")
      .max(255, "Title cannot exceed 255 characters."),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters.")
      .max(2000, "Description cannot exceed 2000 characters."),

    category: z.enum(categoryValues, {
      message: "Please select a valid category.",
    }),

    image: z.any().optional(),
  }),
});

/**
 * updateProjectUpdateSchema
 * Everything is optional, including the removeImage signal.
 */
export const updateProjectUpdateSchema = z.object({
  body: z.object({
    version: z
      .string()
      .min(1, "Version is required.")
      .max(50, "Version cannot exceed 50 characters.")
      .optional(),

    date: z.coerce
      .date({
        message: "A valid date is required.",
      })
      .optional(),

    title: z
      .string()
      .min(3, "Title must be at least 3 characters.")
      .max(255, "Title cannot exceed 255 characters.")
      .optional(),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters.")
      .max(2000, "Description cannot exceed 2000 characters.")
      .optional(),

    category: z.enum(categoryValues).optional(),

    image: z.any().optional(),

    removeImage: z.string().optional(),
  }),
});
