import { z } from "zod";

/**
 * Shared constants to match backend 'user.shared.schema.ts'
 */
const usernameRegex = /^[a-zA-Z0-9_]+$/;

/**
 * Strict Password Rules
 * We define this once to reuse it in both Signup and Change Password
 * to prevent users from setting weak passwords later.
 */
const passwordRules = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password is too long.")
  .regex(/[A-Z]/, "Include at least one uppercase letter.")
  .regex(/[0-9]/, "Include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character.");

/**
 * 1. LOGIN SCHEMA
 * Added trim() and toLowerCase() to prevent login failures
 * caused by auto-capitalization or stray spaces.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Invalid email address.")
    .trim()
    .toLowerCase(),
  password: z.string().min(1, "Password is required."),
});

/**
 * 2. SIGNUP SCHEMA (LEAN)
 * Only contains Email, Password, and Terms.
 * Name/Username generation is handled by the backend.
 */
export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Invalid email address.")
    .trim()
    .toLowerCase(),
  password: passwordRules,
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

/**
 * 3. CHANGE PASSWORD SCHEMA
 * Now uses the same strict 'passwordRules' as signup to ensure security.
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: passwordRules,
    confirmNewPassword: z.string().min(1, "Please confirm your new password."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match.",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from the current one.",
    path: ["newPassword"],
  });

/**
 * 4. UPDATE PROFILE SCHEMA
 * Fully synced with backend limits (Name: 50, Username: 50, Title: 100, Location: 100).
 */
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name is too long.")
    .optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(50, "Username cannot exceed 50 characters.")
    .regex(usernameRegex, "Letters, numbers, and underscores only.")
    .optional(),
  bio: z
    .string()
    .max(250, "Bio cannot exceed 250 characters.")
    .optional()
    .nullable(),
  title: z.string().max(100, "Title is too long.").optional().nullable(),
  location: z.string().max(100, "Location is too long.").optional().nullable(),

  // Social Links (Synced to allow clearing via empty string or null)
  twitterUrl: z
    .string()
    .url("Invalid Twitter URL")
    .optional()
    .or(z.literal(""))
    .nullable(),
  githubUrl: z
    .string()
    .url("Invalid GitHub URL")
    .optional()
    .or(z.literal(""))
    .nullable(),
  websiteUrl: z
    .string()
    .url("Invalid Website URL")
    .optional()
    .or(z.literal(""))
    .nullable(),
});

// Types inferred from schemas
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
