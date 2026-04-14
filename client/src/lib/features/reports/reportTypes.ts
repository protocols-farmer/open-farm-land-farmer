//src/lib/features/reports/reportTypes.ts
import { SanitizedUserDto } from "../user/userTypes";

export enum ReportType {
  BUG = "BUG",
  VULNERABILITY = "VULNERABILITY",
}

export enum ReportStatus {
  OPEN = "OPEN",
  TRIAGED = "TRIAGED",
  FIXED = "FIXED",
  DISMISSED = "DISMISSED",
}

export enum Severity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL",
}

export interface ReportAttachment {
  url: string;
  publicId: string;
  resourceType: "image" | "raw";
}

export interface IssueReportDto {
  id: string;
  title: string;
  description: string;
  reproductionSteps: string | null;
  type: ReportType;
  severity: Severity;
  status: ReportStatus;
  attachments: ReportAttachment[];
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
  reporterId: string;
  resolvedById: string | null;
  reporter: Pick<SanitizedUserDto, "id" | "name" | "username" | "profileImage">;
  resolver?: {
    id: string;
    username: string;
  } | null;
}

export interface ReportQuery {
  page?: number;
  limit?: number;
  type?: ReportType;
  status?: ReportStatus;
  severity?: Severity;
  q?: string;
}

export interface GetReportsApiResponse {
  success: boolean;
  data: {
    reports: IssueReportDto[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface SingleReportApiResponse {
  success: boolean;
  data: IssueReportDto;
}
