//src/lib/features/auth/authTypes.ts
import { SanitizedUserDto } from "../user/userTypes";

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

export interface ForgotPasswordInputDto {
  email: string;
}

export interface ResetPasswordInputDto {
  token: string;
  password?: string;
}

export interface VerifyEmailInputDto {
  token: string;
}

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
