//src/lib/schemas/opportunity.schemas.ts
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

  companyName: z.string().min(1, "Company name is required."),

  location: z.string().min(1, "Location is required."),

  type: OpportunityTypeEnum,

  fullDescription: z
    .string()
    .min(20, "A minimum of 20 characters is required for the description."),

  applyUrl: z
    .string()
    .url({ message: "Provide a valid HTTPS application link." }),

  /**
   * 🚜 REFINED: Supports both binary File (new upload) and String (retained logo).
   * Standard .url() check is removed here because File objects don't have URLs.
   */
  companyLogo: z.any().optional(),

  isRemote: z.boolean().optional().default(false),

  salaryRange: z.string().optional().or(z.literal("")),

  /**
   * 🚜 THE POST WAY: Tags are now a strict array of strings.
   * This allows the ReactHashTags component to control the field directly.
   */
  tags: z
    .array(
      z
        .string()
        .min(1, "Tag cannot be empty.")
        .max(25, "Tag is too long (max 25 chars)")
        .regex(
          /^[a-zA-Z0-9-]+$/,
          "Tags must be alphanumeric with hyphens only",
        ),
    )
    .min(1, "At least one tag is required.")
    .max(10, "Up to 10 tags allowed."),

  /**
   * Keep responsibilities and qualifications as strings for the basic <Input /> UI.
   * Conversion to string[] happens in the form's onSubmit.
   */
  responsibilities: z.string().optional().or(z.literal("")),
  qualifications: z.string().optional().or(z.literal("")),
});

export type OpportunityFormValues = z.infer<typeof opportunitySchema>;
