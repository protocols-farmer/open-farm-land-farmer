//src/lib/features/settings/settingsTypes.ts
/**
 * Matches the Prisma ThemePreference enum.
 */
export type ThemePreference = "LIGHT" | "DARK" | "SYSTEM";

/**
 * The data structure for user settings.
 */
export interface UserSettingsDto {
  id: string;
  userId: string;
  theme: ThemePreference;
  notificationsEnabled: boolean;
  emailMarketing: boolean;
  emailUpdates: boolean;
  emailSocial: boolean;
  updatedAt: string; // Dates are strings in JSON responses
}

/**
 * API response structure.
 */
export interface SettingsResponse {
  success: boolean;
  message?: string;
  data: UserSettingsDto;
}

/**
 * Payload for updating settings (Partial allows for single-toggle updates).
 */
export interface UpdateSettingsPayload {
  theme?: ThemePreference;
  notificationsEnabled?: boolean;
  emailMarketing?: boolean;
  emailUpdates?: boolean;
  emailSocial?: boolean;
}
