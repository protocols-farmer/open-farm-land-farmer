// src/features/user/user.shared.schema.ts
import { z } from "zod";

/**
 * Shared validation rules to ensure consistency across the app.
 */
export const userValidationRules = {
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email address.")
    .trim()
    .toLowerCase(),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters long.")
    .max(50, "Username cannot exceed 50 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    )
    .trim(),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password is too long."),

  name: z
    .string()
    .min(1, "Name is required.")
    .max(50, "Name is too long.")
    .trim(),
  title: z.string().max(100, "Title is too long.").optional().nullable(),
  location: z.string().max(100, "Location is too long.").optional().nullable(),
  bio: z.string().max(250, "Bio cannot exceed 250 characters.").optional(),
};
