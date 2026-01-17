// src/features/user/user.validation.ts
import { z } from "zod";
import { userValidationRules } from "./user.shared.schema.js";

export const updateUserProfileSchema = z.object({
  body: z.object({
    name: userValidationRules.name.optional(),
    username: userValidationRules.username.optional(),
    bio: userValidationRules.bio, // Usually z.string().max(250).optional().nullable()
    title: z.string().max(100, "Title is too long.").optional().nullable(),
    location: z
      .string()
      .max(100, "Location is too long.")
      .optional()
      .nullable(),

    /**
     * REFINED: URL Handling
     * When using FormData, empty inputs are often sent as empty strings ("").
     * .or(z.literal("")) allows the user to "clear" their social links.
     */
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
  }),
});
