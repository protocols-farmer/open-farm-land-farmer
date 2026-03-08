import { z } from "zod";
import { ThemePreference } from "@prisma-client";

/**
 * Zod enums require a very specific tuple type [string, ...string[]].
 */
const themeValues = [
  ThemePreference.LIGHT,
  ThemePreference.DARK,
  ThemePreference.SYSTEM,
] as const;

export const updateSettingsSchema = z.object({
  body: z.object({
    theme: z.enum(themeValues).optional(),

    notificationsEnabled: z.boolean().optional(),

    emailMarketing: z.boolean().optional(),

    emailUpdates: z.boolean().optional(),

    emailSocial: z.boolean().optional(),
  }),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>["body"];
