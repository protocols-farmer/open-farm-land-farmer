//src/lib/schemas/appeal.schemas.ts
import { z } from "zod";

export const submitAppealSchema = z.object({
  reason: z
    .string({
      message: "An appeal reason is required.",
    })
    .trim()
    .min(10, "Your appeal must be at least 10 characters long.")
    .max(500, "Your appeal is too long. Please keep it under 500 characters."),
});

export const reviewAppealSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"], {
    message: "Please select a valid review status (Approved or Rejected).",
  }),

  adminNotes: z
    .string()
    .trim()
    .min(5, "Admin notes must be at least 5 characters.")
    .max(1000, "Admin notes cannot exceed 1000 characters.")
    .optional()
    .or(z.literal("")),
});

export type SubmitAppealFormValues = z.infer<typeof submitAppealSchema>;
export type ReviewAppealFormValues = z.infer<typeof reviewAppealSchema>;
