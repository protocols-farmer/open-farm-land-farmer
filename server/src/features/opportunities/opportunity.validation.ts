//src/features/opportunities/opportunity.validation.ts
import { z } from "zod";
import { OpportunityType } from "@prisma-client";

const isImageUrl = async (url: string | undefined): Promise<boolean> => {
  if (!url) return true;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    return (
      response.ok &&
      response.headers.get("Content-Type")?.startsWith("image/") === true
    );
  } catch {
    return false;
  }
};

const opportunityTypeValues = Object.values(OpportunityType) as [
  string,
  ...string[]
];

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

  applyUrl: z.url("Please provide a valid URL for the application link"),

  companyLogo: z
    .url("Please provide a valid URL for the company logo")
    .optional()
    .or(z.literal(""))
    .refine(isImageUrl, {
      message: "URL must point to a valid, accessible image.",
    }),

  isRemote: z.boolean().optional(),
  salaryRange: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
  qualifications: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export const createOpportunitySchema = z.object({
  body: opportunitySchema,
});
export const updateOpportunitySchema = z.object({
  body: opportunitySchema.partial(),
});
