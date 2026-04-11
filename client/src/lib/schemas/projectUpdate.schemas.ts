import { z } from "zod";

/**
 * createProjectUpdateSchema
 * Fully expanded for the frontend form state.
 */
export const createProjectUpdateSchema = z.object({
  version: z
    .string()
    .min(1, "Version is required (e.g., v1.0.0).")
    .max(50, "Version is too long."),

  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
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

  category: z.string().min(1, "Please select a category."),

  image: z.any().optional(),
});

/**
 * updateProjectUpdateSchema
 * Fully expanded and separate for the edit form.
 */
export const updateProjectUpdateSchema = z.object({
  version: z
    .string()
    .min(1, "Version is required.")
    .max(50, "Version is too long.")
    .optional(),

  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
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

  category: z.string().min(1, "Please select a category.").optional(),

  image: z.any().optional(),

  removeImage: z.string().optional(),
});

export type CreateProjectUpdateValues = z.infer<
  typeof createProjectUpdateSchema
>;
export type UpdateProjectUpdateValues = z.infer<
  typeof updateProjectUpdateSchema
>;
