//src/lib/schemas/report.schema.ts
import { z } from "zod";
import {
  ReportType,
  Severity,
  ReportStatus,
} from "../features/reports/reportTypes";

export const submitReportSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(150, "Title is too long."),

  description: z
    .string()
    .min(20, "Please provide a more detailed description (min 20 characters).")
    .max(2000, "Description cannot exceed 2000 characters."),

  reproductionSteps: z
    .string()
    .min(10, "Reproduction steps are required to help us debug.")
    .max(2000, "Steps are too long.")
    .optional()
    .or(z.literal("")),

  type: z.nativeEnum(ReportType, {
    errorMap: () => ({ message: "Please select a valid report type." }),
  }),

  severity: z.nativeEnum(Severity, {
    errorMap: () => ({ message: "Please select a severity level." }),
  }),

  attachments: z.any().optional(),
});

// 🚜 ADD THIS: Admin Triage Schema
export const updateReportAdminSchema = z.object({
  status: z.nativeEnum(ReportStatus),
  severity: z.nativeEnum(Severity),
  adminNotes: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters.")
    .refine((val) => val.length === 0 || val.trim().length >= 5, {
      message: "Admin notes must be at least 5 characters if provided.",
    })
    .optional()
    .or(z.literal("")),
});

export type SubmitReportFormValues = z.infer<typeof submitReportSchema>;
export type UpdateReportAdminValues = z.infer<typeof updateReportAdminSchema>;
