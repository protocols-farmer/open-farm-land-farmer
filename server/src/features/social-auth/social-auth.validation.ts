//src/features/social-auth/social-auth.validation.ts

import { z } from "zod";

export const socialCallbackSchema = z.object({
  query: z.object({
    code: z
      .string()
      .min(1, "Authorization code is required from the provider."),
  }),
});

export type SocialCallbackInput = z.infer<typeof socialCallbackSchema>["query"];
