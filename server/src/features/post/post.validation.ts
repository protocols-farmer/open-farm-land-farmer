import { z } from "zod";
import { PostCategory } from "@prisma-client";

const postCategoryValues = Object.values(PostCategory) as [string, ...string[]];

const preprocessTags = (val: unknown) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch (e) {
      return val;
    }
  }
  return val;
};

const externalLinkSchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .superRefine((url, ctx) => {
    if (url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL must start with 'http://' or 'https://'.",
        });
      }
      try {
        new URL(url);
      } catch (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid URL structure.",
        });
      }
    }
  });

const strictGitHubLinkSchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .superRefine((url, ctx) => {
    if (url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL must start with 'http://' or 'https://'.",
        });

        return;
      }
      try {
        const hostname = new URL(url).hostname;
        if (hostname !== "github.com" && !hostname.endsWith(".github.com")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "URL must be a valid link from github.com.",
          });
        }
      } catch (error) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter a valid URL structure.",
        });
      }
    }
  });

// 🚜 CREATE SCHEMA
export const createPostSchema = z.object({
  body: z.object({
    // UPDATED: Min 5 (matches frontend)
    title: z
      .string()
      .min(5, "Title must be at least 5 characters long.")
      .max(255),

    // UPDATED: Min 10 (matches frontend)
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long.")
      .max(500),

    // UPDATED: Min 20 and Max 50,000 (matches frontend and adds hacker protection)
    content: z
      .string()
      .min(20, "Main content must have at least 20 characters.")
      .max(
        50000,
        "Main content is too long. It cannot exceed 50000 characters.",
      ),

    category: z.enum(postCategoryValues, {
      message: "Please select a valid category.",
    }),

    postTags: z.preprocess(
      preprocessTags,
      z
        .array(
          z
            .string()
            .min(1, "Tag cannot be empty.")
            .max(25, "Each tag must be under 25 characters.")
            .regex(/^[a-zA-Z0-9-]+$/, "Invalid tag format."),
        )
        .min(1, "At least one tag is required.")
        .max(10, "You can add up to 10 tags."),
    ),
    externalLink: externalLinkSchema,
    githubLink: strictGitHubLinkSchema,
  }),
});

// 🚜 UPDATE SCHEMA
// Logic: We use the exact same rules as Create to ensure data quality remains high.
export const updatePostSchema = z.object({
  body: z.object({
    // UPDATED: Min 5 (matches createPostSchema)
    title: z
      .string()
      .min(5, "Title must be at least 5 characters long.")
      .max(255),

    // UPDATED: Min 10 (matches createPostSchema)
    description: z
      .string()
      .min(10, "Description must be at least 10 characters long.")
      .max(500),

    // UPDATED: Min 20 and Max 50,000 (matches createPostSchema)
    content: z
      .string()
      .min(20, "Main content must have at least 20 characters.")
      .max(
        50000,
        "Main content is too long. It cannot exceed 50000 characters.",
      ),

    category: z.enum(postCategoryValues, {
      message: "Please select a valid category.",
    }),

    postTags: z.preprocess(
      preprocessTags,
      z
        .array(
          z
            .string()
            .min(1, "Tag cannot be empty.")
            .max(25, "Each tag must be under 25 characters.")
            .regex(/^[a-zA-Z0-9-]+$/, "Invalid tag format."),
        )
        .min(1, "At least one tag is required.")
        .max(10, "You can add up to 10 tags."),
    ),
    externalLink: externalLinkSchema,
    githubLink: strictGitHubLinkSchema,
  }),
});
