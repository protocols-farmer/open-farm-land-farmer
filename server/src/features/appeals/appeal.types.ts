//src/features/appeals/appeal.types.ts
import { AppealStatus, SanctionType, UserStatus } from "@prisma-client";

export interface CreateAppealDto {
  reason: string;
}

export interface ReviewAppealDto {
  status: AppealStatus;
  adminNotes?: string;
}

export interface AdminAppealQuery {
  page?: number;
  limit?: number;
  status?: AppealStatus;
  q?: string;
}

export interface AdminAppealRow {
  id: string;
  reason: string;
  status: AppealStatus;
  adminNotes: string | null;
  createdAt: Date;
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
    expiresAt: Date | null;
  };
  reviewer?: {
    id: string;
    username: string;
  } | null;
}
