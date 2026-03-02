//src/lib/features/social-auth/socialTypes.ts
import { SanitizedUserDto } from "../user/userTypes";

/**
 * The standard response from your backend social endpoints.
 * Matches the structure returned by socialAuthController.
 */
export interface SocialAuthResponse {
  status: string;
  message: string;
  data: {
    user: SanitizedUserDto;
    tokens: {
      accessToken: string;
      refreshToken: string;
      refreshTokenExpiresAt: string;
    };
  };
}

/**
 * Input for the social login mutations.
 * We only need the code sent back from the provider.
 */
export interface SocialLoginInput {
  code: string;
}
