//src/features/user/user.validation.ts
import { z } from "zod";
import { userValidationRules } from "./user.shared.schema.js";

const normalizeNullFields = (val: unknown) => {
  if (val === "" || val === "null" || val === null || val === undefined)
    return null;
  return val;
};

export const updateUserProfileSchema = z.object({
  body: z.object({
    name: userValidationRules.name.optional(),
    username: userValidationRules.username.optional(),

    bio: z.preprocess(
      normalizeNullFields,
      userValidationRules.bio.nullable().optional(),
    ),
    title: z.preprocess(
      normalizeNullFields,
      userValidationRules.title.nullable().optional(),
    ),
    location: z.preprocess(
      normalizeNullFields,
      userValidationRules.location.nullable().optional(),
    ),

    twitterUrl: z.preprocess(
      normalizeNullFields,
      userValidationRules.socialUrl.nullable().optional(),
    ),
    githubUrl: z.preprocess(
      normalizeNullFields,
      userValidationRules.socialUrl.nullable().optional(),
    ),
    websiteUrl: z.preprocess(
      normalizeNullFields,
      userValidationRules.socialUrl.nullable().optional(),
    ),
  }),
});
