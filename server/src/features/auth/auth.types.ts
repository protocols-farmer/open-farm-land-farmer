//src/features/auth/auth.types.ts
import { JwtPayload as OriginalJwtPayload } from "jsonwebtoken";
import { SystemRole } from "@prisma-client";

export interface DecodedAccessTokenPayload {
  id: string;
  email: string;
  systemRole: SystemRole;
  type: "access";
  iat: number;
  exp: number;
  username: string;
  name: string | null;
  profileImage?: string;
  bannerImage?: string;
}
export interface DecodedRefreshTokenPayload extends OriginalJwtPayload {
  id: string;
  jti: string;
  type: "refresh";
}

export interface SignUpInputDto {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface LoginInputDto {
  email: string;
  password: string;
}

export interface RefreshTokenInputDto {
  incomingRefreshToken: string;
}

export interface LogoutInputDto {
  userId?: string | undefined;
  incomingRefreshToken?: string | undefined;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}

export interface UpdateUserProfileDto {
  name?: string;
  profileImage?: string;
  bannerImage?: string;
  username?: string;
  bio?: string;
  title?: string;
  location?: string;
}
export interface ChangePasswordInputDto {
  currentPassword: string;
  newPassword: string;
}

export interface SignUpRequestDto {
  email: string;
  password: string;
}

export interface SignUpInputDto {
  email: string;
  username: string;
  password: string;
  name: string;
}

export interface UserJWTPayload {
  id: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  systemRole: SystemRole;
  name: string;
  profileImage?: string;
  type: "access";
}
