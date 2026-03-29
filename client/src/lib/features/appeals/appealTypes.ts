// src/lib/features/appeals/appealTypes.ts

// --- Enums (Mirrored from Backend) ---
export type AppealStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SanctionType = "SUSPENSION" | "BAN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED" | "BANNED";

// --- Request DTOs ---
export interface SubmitAppealRequest {
  reason: string;
}

export interface ReviewAppealRequest {
  status: AppealStatus;
  adminNotes?: string;
}

export interface AdminAppealQuery {
  page?: number;
  limit?: number;
  status?: AppealStatus | "";
  q?: string;
}

// --- Response Models ---
export interface AppealRow {
  id: string;
  reason: string;
  status: AppealStatus;
  adminNotes: string | null;
  createdAt: string; // ISO Date String
  user: {
    id: string;
    username: string;
    email: string;
    profileImage: string | null;
    status: UserStatus;
  };
  sanction: {
    id: string;
    type: SanctionType;
    reason: string;
    expiresAt: string | null; // ISO Date String
  };
  reviewer?: {
    id: string;
    username: string;
  } | null;
}

// --- API Responses ---
export interface SubmitAppealResponse {
  status: string;
  message: string;
  data: {
    id: string;
    reason: string;
    status: AppealStatus;
    userId: string;
    sanctionId: string;
    createdAt: string;
  };
}

export interface GetAdminAppealsResponse {
  status: string;
  data: {
    appeals: AppealRow[];
    pagination: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export interface ReviewAppealResponse {
  status: string;
  message: string;
  data: AppealRow;
}
