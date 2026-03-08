//src/features/auth/auth.validation.ts
import { z } from "zod";

/**
 * Common Password Rules
 */
const passwordRules = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[A-Z]/, "Include at least one uppercase letter.")
  .regex(/[0-9]/, "Include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character.");

export const signupSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Invalid email address.")
      .trim()
      .toLowerCase(),
    password: passwordRules,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Invalid email address."),
    password: z.string().min(1, "Password is required."),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: passwordRules,
  }),
});

// NEW: Forgot Password Schema
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Please provide a valid email address."),
  }),
});

// NEW: Reset Password Schema
export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, "Reset token is required."),
    password: passwordRules,
  }),
});

export type SignupInput = z.infer<typeof signupSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>["body"];
