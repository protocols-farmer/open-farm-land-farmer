// server/src/features/opportunities/opportunity.validation.ts
import { z } from "zod";
import { OpportunityType } from "@prisma-client";

const opportunityTypeValues = Object.values(OpportunityType) as [
  string,
  ...string[],
];

/**
 * 🚜 Helper: Custom Regex for secure, well-structured URLs.
 */
const secureUrlSchema = z
  .string()
  .url("Please enter a valid URL.")
  .regex(/^https:\/\//, "For security, links must use HTTPS.");

/**
 * Helper to handle incoming JSON strings for arrays (FormData behavior)
 */
const preprocessArray = (val: unknown) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return val.split(",").map((s: string) => s.trim());
    }
  }
  return val;
};

export const opportunitySchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),

  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(100, "Company name cannot exceed 100 characters"),

  location: z
    .string()
    .min(1, "Location is required")
    .max(100, "Location cannot exceed 100 characters"),

  type: z.enum(opportunityTypeValues, {
    message: "Please select a valid opportunity type.",
  }),

  fullDescription: z
    .string()
    .min(20, "Full description must be at least 20 characters long")
    .max(3000, "Description is too long (max 3000 characters)"),

  applyUrl: secureUrlSchema.max(500, "URL is excessively long"),

  companyLogo: z.string().optional().or(z.literal("")),
  retainedLogoUrl: z.string().optional().or(z.literal("")),

  isRemote: z.preprocess((val) => val === "true" || val === true, z.boolean()),

  salaryRange: z
    .string()
    .max(50, "Salary range must be under 50 characters")
    .optional()
    .or(z.literal("")),

  // 🚜 HARDENED: Capped array length and string length per item
  responsibilities: z
    .preprocess(
      preprocessArray,
      z
        .array(z.string().max(200, "Each item must be under 200 chars"))
        .max(20, "Maximum 20 items allowed"),
    )
    .optional(),

  qualifications: z
    .preprocess(
      preprocessArray,
      z
        .array(z.string().max(200, "Each item must be under 200 chars"))
        .max(20, "Maximum 20 items allowed"),
    )
    .optional(),

  tags: z
    .preprocess(
      preprocessArray,
      z
        .array(
          z
            .string()
            .min(1, "Tag cannot be empty.")
            .max(25, "Each tag must be under 25 characters.")
            .regex(
              /^[a-zA-Z0-9-]+$/,
              "Tags must be alphanumeric with hyphens only",
            ),
        )
        .max(10, "You can add up to 10 tags."),
    )
    .optional(),
});

export const createOpportunitySchema = z.object({
  body: opportunitySchema,
});

export const updateOpportunitySchema = z.object({
  body: opportunitySchema.partial(),
});
