//src/lib/features/auth/authTypes.ts
import { SanitizedUserDto } from "../user/userTypes";

// --- DTOs for API requests ---
export interface LoginInputDto {
  email?: string;
  password?: string;
}

export interface SignUpInputDto extends LoginInputDto {
  username?: string;
  name?: string;
}

export interface ChangePasswordInputDto {
  currentPassword?: string;
  newPassword?: string;
}

// NEW: Forgot Password DTO
export interface ForgotPasswordInputDto {
  email: string;
}

// NEW: Reset Password DTO
export interface ResetPasswordInputDto {
  token: string;
  password?: string;
}

// NEW: Verify Email DTO
export interface VerifyEmailInputDto {
  token: string;
}

// --- API Response Shapes ---
export interface LoginApiResponse {
  status: "success" | "error" | "warning" | "social_account" | string;
  message: string;
  data: {
    user: SanitizedUserDto;
    tokens?: {
      accessToken: string;
    };
  };
}

export interface GeneralAuthResponse {
  status: "success" | "error" | "social_account" | string;
  message: string;
  data?: any;
}
