//src/features/appeals/appeal.validation.ts
import { z } from "zod";
import { AppealStatus } from "@prisma-client";

export const submitAppealSchema = z.object({
  body: z.object({
    reason: z
      .string({
        message: "An appeal reason is required.",
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
      message: "Please select a valid review status (Approved or Rejected).",
    }),

    adminNotes: z
      .string({
        message: "Admin notes must be text.",
      })
      .trim()
      .min(5, "Admin notes must be at least 5 characters.")
      .max(1000, "Admin notes cannot exceed 1000 characters.")
      .optional()
      .or(z.literal("")),
  }),
});
