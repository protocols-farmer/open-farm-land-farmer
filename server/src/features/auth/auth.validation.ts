//src/features/auth/auth.validation.ts
import { z } from "zod";
import { userValidationRules } from "../user/user.shared.schema.js";

const passwordPolicy = userValidationRules.password
  .regex(/[A-Z]/, "Include at least one uppercase letter.")
  .regex(/[0-9]/, "Include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Include at least one special character.");

export const signupSchema = z.object({
  body: z.object({
    email: userValidationRules.email,
    password: passwordPolicy,
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required."),
    password: z.string().min(1, "Password is required."),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required."),
    newPassword: passwordPolicy,
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: userValidationRules.email,
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(1, "Reset token is required."),
    password: passwordPolicy,
  }),
});

export type SignupInput = z.infer<typeof signupSchema>["body"];
export type LoginInput = z.infer<typeof loginSchema>["body"];
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>["body"];
