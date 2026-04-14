//src/features/reports/report.validation.ts
import { z } from "zod";
import { ReportType, ReportStatus, Severity } from "@prisma-client";

const reportTypeValues = Object.values(ReportType) as [string, ...string[]];
const reportStatusValues = Object.values(ReportStatus) as [string, ...string[]];
const severityValues = Object.values(Severity) as [string, ...string[]];

/**
 * Validates the initial submission from a user.
 */
export const createReportSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, "Title is too short (min 5 characters).")
      .max(150, "Title is too long (max 150 characters).")
      .trim(),

    description: z
      .string()
      .min(
        20,
        "Please provide a more detailed description (min 20 characters).",
      )
      .max(2000, "Description is too long."),

    reproductionSteps: z
      .string()
      .min(10, "Reproduction steps are required (min 10 characters).")
      .max(2000, "Reproduction steps are too long.")
      .optional()
      .or(z.literal("")),

    type: z.enum(reportTypeValues, {
      message: "Please select a valid report type (BUG or VULNERABILITY).",
    }),

    severity: z.enum(severityValues, {
      message: "Please select a valid severity level.",
    }),
  }),
});

/**
 * Validates Admin updates to an existing report.
 */
export const updateReportAdminSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid report ID format."),
  }),
  body: z.object({
    status: z.enum(reportStatusValues).optional(),

    /**
     * 🚜 Logic Update: If an admin provides notes, they should be meaningful.
     * We allow an empty string but enforce 5 chars if they start typing.
     */
    adminNotes: z
      .string()
      .max(1000, "Admin notes cannot exceed 1000 characters.")
      .refine((val) => val.length === 0 || val.trim().length >= 5, {
        message: "Admin notes must be at least 5 characters if provided.",
      })
      .optional()
      .or(z.literal("")),

    severity: z.enum(severityValues).optional(),
  }),
});

/**
 * Validates query parameters for the admin list view.
 */
export const reportQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
    type: z.enum(reportTypeValues).optional(),
    status: z.enum(reportStatusValues).optional(),
    severity: z.enum(severityValues).optional(),
    q: z.string().optional(),
  }),
});
