//src/features/projectUpdate/projectUpdate.validation.ts
import { z } from "zod";
import { ProjectUpdateCategory } from "@prisma-client";

const categoryValues = Object.values(ProjectUpdateCategory) as [
  string,
  ...string[]
];

export const createProjectUpdateSchema = z.object({
  body: z.object({
    version: z.string().min(1, "Version is required"),

    date: z.coerce.date({
      message: "A valid date is required.",
    }),

    title: z.string().min(3, "Title must be at least 3 characters").max(255),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),

    category: z.enum(categoryValues, {
      message: "Please select a valid category.",
    }),
  }),
});

export const updateProjectUpdateSchema = z.object({
  body: z.object({
    version: z.string().min(1).optional(),

    date: z.coerce
      .date({
        message: "A valid date is required.",
      })
      .optional(),

    title: z.string().min(3).max(255).optional(),
    description: z.string().min(10).optional(),
    category: z.enum(categoryValues).optional(),
  }),
});
