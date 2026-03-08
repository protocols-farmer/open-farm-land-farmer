//src/lib/schemas/settings.schemas.ts
import { z } from "zod";

/**
 * Validates the Settings Form.
 * FIXED: Removed .optional() and ensured defaults match the strict boolean requirements.
 */
export const updateSettingsFormSchema = z.object({
  theme: z.enum(["LIGHT", "DARK", "SYSTEM"], {
    required_error: "Please select a theme preference.",
  }),
  // Removing the 'undefined' possibility by using strict booleans
  notificationsEnabled: z.boolean(),
  emailMarketing: z.boolean(),
  emailUpdates: z.boolean(),
  emailSocial: z.boolean(),
});

export type UpdateSettingsFormValues = z.infer<typeof updateSettingsFormSchema>;
