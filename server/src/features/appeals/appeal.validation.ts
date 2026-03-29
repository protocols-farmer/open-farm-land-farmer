// src/features/appeals/appeal.validation.ts
import { z } from "zod";
import { AppealStatus } from "@prisma-client";

export const submitAppealSchema = z.object({
  body: z.object({
    reason: z
      .string({
        message: "An appeal reason is required and must be text.",
      })
      .trim()
      .min(10, "Your appeal must be at least 10 characters long.")
      .max(
        500,
        "Your appeal is too long. Please keep it under 500 characters.",
      ),
  }),
});

export const reviewAppealSchema = z.object({
  body: z.object({
    status: z.enum([AppealStatus.APPROVED, AppealStatus.REJECTED], {
      message: "Status must be exactly APPROVED or REJECTED.",
    }),
    adminNotes: z
      .string({
        message: "Admin notes must be text.",
      })
      .trim()
      .max(1000, "Admin notes cannot exceed 1000 characters.")
      .optional(),
  }),
});
