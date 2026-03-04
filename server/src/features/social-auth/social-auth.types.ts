//src/features/social-auth/social-auth.types.ts
import { AuthTokens } from "@/features/auth/auth.types.js";
import { SafeUser } from "@/features/user/user.service.js";

export interface SocialProfile {
  email: string;
  name: string;
  image?: string | null;
  sub?: string;
  id?: string;
}

export interface SocialAuthResponse {
  user: SafeUser;
  tokens: AuthTokens;
}

export interface GoogleTokenResponse {
  access_token: string;
  id_token: string;
  expires_in: number;
}
