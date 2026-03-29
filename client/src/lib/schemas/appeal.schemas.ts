//src/lib/schemas/appeal.schemas.ts
import { z } from "zod";

export const submitAppealSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(10, "Your appeal must be at least 10 characters long.")
    .max(500, "Your appeal is too long. Please keep it under 500 characters."),
});

export type SubmitAppealFormValues = z.infer<typeof submitAppealSchema>;
