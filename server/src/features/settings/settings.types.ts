import { ThemePreference } from "@prisma-client";

/**
 * The structure of the settings object sent to the frontend.
 */
export interface UserSettingsDto {
  id: string;
  userId: string;
  theme: ThemePreference;
  notificationsEnabled: boolean;
  emailMarketing: boolean;
  emailUpdates: boolean;
  emailSocial: boolean;
  updatedAt: Date;
}

/**
 * 🚜 REFINED: Removed '| undefined' to satisfy exactOptionalPropertyTypes.
 * This ensures that if a toggle isn't changed, the key is omitted entirely
 * instead of being passed as 'undefined'.
 */
export interface UpdateSettingsDto {
  theme?: ThemePreference;
  notificationsEnabled?: boolean;
  emailMarketing?: boolean;
  emailUpdates?: boolean;
  emailSocial?: boolean;
}
