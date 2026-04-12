// src/lib/schemas/opportunity.schemas.ts
import { z } from "zod";

/**
 * Syncs with Backend 'OpportunityType' Prisma Enum.
 */
const OpportunityTypeEnum = z.enum(
  ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"],
  {
    required_error: "Selection of an opportunity type is mandatory.",
  },
);

export const opportunitySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title cannot exceed 100 characters."),

  companyName: z
    .string()
    .min(1, "Company name is required.")
    .max(100, "Company name cannot exceed 100 characters."),

  location: z
    .string()
    .min(1, "Location is required.")
    .max(100, "Location cannot exceed 100 characters."),

  type: OpportunityTypeEnum,

  fullDescription: z
    .string()
    .min(20, "A minimum of 20 characters is required.")
    .max(3000, "Description cannot exceed 3000 characters."),

  applyUrl: z
    .string()
    .url({ message: "Provide a valid HTTPS application link." })
    .max(500, "URL is excessively long."),

  companyLogo: z.any().optional(),

  // Strict casting to ensure resolver compatibility
  isRemote: z.boolean().default(false) as z.ZodType<boolean>,

  salaryRange: z
    .string()
    .max(50, "Salary range info is too long (max 50 chars).")
    .optional()
    .or(z.literal("")),

  tags: z
    .array(
      z
        .string()
        .min(1, "Tag cannot be empty.")
        .max(25, "Tag is too long (max 25 chars)")
        .regex(/^[a-zA-Z0-9-]+$/, "Alphanumeric and hyphens only"),
    )
    .min(1, "At least one tag is required.")
    .max(10, "Up to 10 tags allowed."),

  responsibilities: z
    .string()
    .max(1000, "Responsibilities text is too long (max 1000 chars).")
    .optional()
    .or(z.literal("")),

  qualifications: z
    .string()
    .max(1000, "Qualifications text is too long (max 1000 chars).")
    .optional()
    .or(z.literal("")),
});

export type OpportunityFormValues = z.infer<typeof opportunitySchema>;
