//src/lib/schemas/auth.schemas.ts
import { z } from "zod";

const usernameRegex = /^[a-zA-Z0-9_]+$/;

const passwordRules = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password is too long.")
  .regex(/[A-Z]/, "Include at least one uppercase letter.")
  .regex(/[0-9]/, "Include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character.");

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Invalid email address.")
    .trim()
    .toLowerCase(),
  password: z.string().min(1, "Password is required."),
});

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

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name cannot exceed 50 characters."),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(50, "Username cannot exceed 50 characters.")
    .regex(usernameRegex, "Letters, numbers, and underscores only."),

  bio: z
    .string()
    .max(250, "Bio cannot exceed 250 characters.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  title: z
    .string()
    .max(100, "Title cannot exceed 100 characters.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  location: z
    .string()
    .max(100, "Location cannot exceed 100 characters.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  twitterUrl: z
    .string()
    .url("Invalid Twitter URL")
    .max(255, "URL is too long.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  githubUrl: z
    .string()
    .url("Invalid GitHub URL")
    .max(255, "URL is too long.")
    .optional()
    .or(z.literal(""))
    .nullable(),

  websiteUrl: z
    .string()
    .url("Invalid Website URL")
    .max(255, "URL is too long.")
    .optional()
    .or(z.literal(""))
    .nullable(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
