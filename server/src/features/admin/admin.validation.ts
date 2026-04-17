//src/features/admin/admin.validation.ts
import { z } from "zod";
import { SystemRole, UserStatus } from "@prisma-client";

const systemRoleValues = Object.values(SystemRole) as [string, ...string[]];
const userStatusValues = Object.values(UserStatus) as [string, ...string[]];

export const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum(systemRoleValues, {
      message: "Please select a valid system role.",
    }),
  }),
});

export const updateSystemConfigSchema = z.object({
  body: z.object({
    maintenanceMode: z.boolean().optional(),

    maintenanceMessage: z
      .string()
      .max(200, "Maintenance message cannot exceed 200 characters.")
      .optional()
      .or(z.literal("")),
  }),
});

export const updateUserStatusSchema = z
  .object({
    body: z.object({
      status: z.enum(userStatusValues, {
        message: "Please select a valid user status.",
      }),

      reason: z
        .string()
        .max(500, "Reason is too long (max 500 characters).")
        .optional()
        .or(z.literal("")),

      expiresAt: z
        .string()
        .datetime({ message: "Invalid ISO date format." })
        .optional()
        .nullable()
        .or(z.literal("")),
    }),
  })
  .refine(
    (data) => {
      const { status, reason } = data.body;
      const isSanction =
        status === UserStatus.BANNED || status === UserStatus.SUSPENDED;

      if (isSanction) {
        return !!reason && reason.trim().length >= 5;
      }
      return true;
    },
    {
      message:
        "A technical reason (min 5 characters) is required for sanctions.",
      path: ["body", "reason"],
    },
  );
