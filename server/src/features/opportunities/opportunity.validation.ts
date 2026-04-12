//src/features/opportunities/opportunity.validation.ts
import { z } from "zod";
import { OpportunityType } from "@prisma-client";

const opportunityTypeValues = Object.values(OpportunityType) as [
  string,
  ...string[],
];

const preprocessArray = (val: unknown) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return val
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean);
    }
  }
  return val;
};

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

  type: z.enum(opportunityTypeValues, {
    message: "Please select a valid opportunity type.",
  }),

  fullDescription: z
    .string()
    .min(20, "Full description must be at least 20 characters.")
    .max(3000, "Description is too long (max 3000 characters)."),

  applyUrl: z
    .string()
    .url("Please enter a valid URL.")
    .regex(/^https:\/\//, "For security, links must use HTTPS.")
    .max(500, "URL is excessively long."),

  companyLogo: z.string().optional().or(z.literal("")),
  retainedLogoUrl: z.string().optional().or(z.literal("")),

  isRemote: z.preprocess((val) => val === "true" || val === true, z.boolean()),

  salaryRange: z
    .string()
    .max(50, "Salary range must be under 50 characters.")
    .optional()
    .or(z.literal("")),

  responsibilities: z.preprocess(
    preprocessArray,
    z
      .array(z.string().max(200, "Each item must be under 200 characters."))
      .min(1, "At least one responsibility is required.")
      .max(20, "Maximum 20 items allowed."),
  ),

  qualifications: z.preprocess(
    preprocessArray,
    z
      .array(z.string().max(200, "Each item must be under 200 characters."))
      .min(1, "At least one qualification is required.")
      .max(20, "Maximum 20 items allowed."),
  ),

  tags: z.preprocess(
    preprocessArray,
    z
      .array(
        z
          .string()
          .min(1, "Tag cannot be empty.")
          .max(25, "Each tag must be under 25 characters.")
          .regex(
            /^[a-zA-Z0-9-]+$/,
            "Tags must be alphanumeric with hyphens only.",
          ),
      )
      .min(1, "At least one tag is required.")
      .max(10, "Up to 10 tags allowed."),
  ),
});

export const createOpportunitySchema = z.object({ body: opportunitySchema });
export const updateOpportunitySchema = z.object({
  body: opportunitySchema.partial(),
});
