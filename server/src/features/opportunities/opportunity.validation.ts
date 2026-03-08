//src/features/opportunities/opportunity.validation.ts
import { z } from "zod";
import { OpportunityType } from "@prisma-client";

const opportunityTypeValues = Object.values(OpportunityType) as [
  string,
  ...string[],
];

/**
 * 🚜 Helper: Custom Regex for secure, well-structured URLs.
 * Ensures the link starts with https and has a valid domain.
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

  companyName: z.string().min(1, "Company name is required"),

  location: z.string().min(1, "Location is required"),

  type: z.enum(opportunityTypeValues, {
    message: "Please select a valid opportunity type.",
  }),

  fullDescription: z
    .string()
    .min(20, "Full description must be at least 20 characters long"),

  applyUrl: secureUrlSchema,

  // 🚜 Note: companyLogo is validated as a file by Multer in the routes,
  // so we treat it as an optional string in the body schema.
  companyLogo: z.string().optional(),
  retainedLogoUrl: z.string().optional(),

  // Transform checkbox strings from FormData back to booleans
  isRemote: z.preprocess((val) => val === "true" || val === true, z.boolean()),

  salaryRange: z.string().optional().or(z.literal("")),

  // Preprocess arrays because FormData sends them as strings
  responsibilities: z
    .preprocess(preprocessArray, z.array(z.string()))
    .optional(),
  qualifications: z.preprocess(preprocessArray, z.array(z.string())).optional(),
  tags: z.preprocess(preprocessArray, z.array(z.string())).optional(),
});

export const createOpportunitySchema = z.object({
  body: opportunitySchema,
});

export const updateOpportunitySchema = z.object({
  body: opportunitySchema.partial(),
});
