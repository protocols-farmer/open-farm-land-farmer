//src/features/reports/report.types.ts
import {
  ReportType,
  ReportStatus,
  Severity,
  IssueReport,
} from "@prisma-client";

/**
 * Interface for the JSON attachment objects stored in Cloudinary.
 */
export interface ReportAttachment {
  url: string;
  publicId: string;
  resourceType: "image" | "raw"; // raw for log files, image for screenshots
}

/**
 * Data required to create a new bug or vulnerability report.
 */
export interface CreateReportDto {
  title: string;
  description: string;
  reproductionSteps?: string;
  type: ReportType;
  severity: Severity;
  // Note: attachments are handled via the controller after Cloudinary upload
}

/**
 * Data used by Super Admins to triage or resolve a report.
 */
export interface UpdateReportAdminDto {
  status?: ReportStatus;
  adminNotes?: string;
  severity?: Severity;
}

/**
 * Query parameters for filtering and paginating reports in the Admin Panel.
 */
export interface ReportQueryDto {
  page?: number;
  limit?: number;
  type?: ReportType;
  status?: ReportStatus;
  severity?: Severity;
  q?: string; // Search by title or reporter
}

/**
 * The response shape for a report, including the joined reporter data.
 */
export type SanitizedReport = IssueReport & {
  reporter: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  resolver?: {
    id: string;
    username: string;
  } | null;
};
