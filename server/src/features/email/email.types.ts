//src/features/email/email.types.ts
export enum EmailType {
  VERIFICATION = "VERIFICATION",
  PASSWORD_RESET = "PASSWORD_RESET",
  NEW_OPPORTUNITY = "NEW_OPPORTUNITY",
  SYSTEM_UPDATE = "SYSTEM_UPDATE",
}

export interface BaseEmailOptions {
  to: string;
  subject: string;
}

export interface VerificationEmailData {
  name: string;
  url: string; // The frontend link with token
}

export interface PasswordResetEmailData {
  name: string;
  url: string;
}

export interface MarketingOpportunityData {
  title: string;
  companyName: string;
  location: string;
  url: string;
  type: string;
  salaryRange?: string | null;
  tags: string[];
}
export interface SystemUpdateData {
  title: string;
  version?: string | null;
  contentPreview: string;
  url: string;
}
/**
 * Structured response for the Email Service
 */
export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: {
    code: number;
    message: string;
    providerDetails?: any;
  };
}
