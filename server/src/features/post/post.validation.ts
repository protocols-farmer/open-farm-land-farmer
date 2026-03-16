// server/src/features/post/post.validation.ts
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

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required.").max(500),
    content: z.string().min(1, "Post content cannot be empty."),
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

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required").max(500),
    content: z.string().min(1, "Post content cannot be empty."),
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
