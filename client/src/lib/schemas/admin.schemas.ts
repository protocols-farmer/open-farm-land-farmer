//src/lib/schemas/admin.schemas.ts
import { z } from "zod";
import { SystemRole, UserStatus } from "../features/admin/adminTypes";

/**
 * 🚜 Admin Validation Schemas
 * Synchronized with backend limits for high-integrity moderation.
 */

export const updateUserRoleSchema = z.object({
  role: z.nativeEnum(SystemRole, {
    errorMap: () => ({ message: "Please select a valid system role." }),
  }),
});

export const updateSystemConfigSchema = z.object({
  maintenanceMode: z.boolean().optional(),

  maintenanceMessage: z
    .string()
    .max(200, "Maintenance message cannot exceed 200 characters.")
    .optional()
    .or(z.literal("")),
});

export const updateUserStatusSchema = z
  .object({
    status: z.nativeEnum(UserStatus, {
      errorMap: () => ({ message: "Please select a valid user status." }),
    }),

    reason: z
      .string()
      .max(500, "Reason is too long (max 500 characters).")
      .optional()
      .or(z.literal("")),

    expiresAt: z.string().optional().nullable().or(z.literal("")),
  })
  .refine(
    (data) => {
      const isSanction =
        data.status === UserStatus.BANNED ||
        data.status === UserStatus.SUSPENDED;

      if (isSanction) {
        return !!data.reason && data.reason.trim().length >= 5;
      }
      return true;
    },
    {
      message:
        "A technical reason (min 5 characters) is required for sanctions.",
      path: ["reason"],
    },
  );

export type UpdateUserStatusValues = z.infer<typeof updateUserStatusSchema>;
export type UpdateSystemConfigValues = z.infer<typeof updateSystemConfigSchema>;
export type UpdateUserRoleValues = z.infer<typeof updateUserRoleSchema>;
