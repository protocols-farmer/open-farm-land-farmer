import { z } from "zod";

/**
 * 🚜 Opportunity Validation Schema
 * This schema represents the FORM STATE.
 * Note: responsibilities and qualifications are strings here because
 * they are handled by a Textarea. We convert them to arrays in onSubmit.
 */
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

  // 🚜 SYNCED: Using string enum to match the backend's OpportunityType values
  type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"], {
    errorMap: () => ({ message: "Please select a valid opportunity type." }),
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

  companyLogo: z.any().optional(),

  // 🚜 FIX: Strict boolean (no .default) to resolve the Type 'undefined' error
  isRemote: z.boolean(),

  salaryRange: z
    .string()
    .max(50, "Salary range must be under 50 characters.")
    .optional()
    .or(z.literal("")),

  // 🚜 UI FIX: These are strings in the form because they use a Textarea.
  // We keep the min(1) to match the backend's min(1) array requirement.
  responsibilities: z
    .string()
    .min(1, "At least one responsibility is required.")
    .max(2000, "Responsibilities text is too long."),

  qualifications: z
    .string()
    .min(1, "At least one qualification is required.")
    .max(2000, "Qualifications text is too long."),

  tags: z
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
});

export type OpportunityFormValues = z.infer<typeof opportunitySchema>;
