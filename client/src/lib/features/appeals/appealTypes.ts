//src/lib/features/appeals/appealTypes.ts

export type AppealStatus = "PENDING" | "APPROVED" | "REJECTED";
export type SanctionType = "SUSPENSION" | "BAN";
export type UserStatus = "ACTIVE" | "SUSPENDED" | "DEACTIVATED" | "BANNED";

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

export interface AppealRow {
  id: string;
  reason: string;
  status: AppealStatus;
  adminNotes: string | null;
  createdAt: string;
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
    expiresAt: string | null;
  };
  reviewer?: {
    id: string;
    username: string;
  } | null;
}

export interface SubmitAppealResponse {
  success: boolean;
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
  success: boolean;
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
  success: boolean;
  message: string;
  data: AppealRow;
}
