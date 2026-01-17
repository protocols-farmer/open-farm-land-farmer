// FILE: src/lib/schemas/post.schemas.ts
import { z } from "zod";

export const postCategories = [
  "PROJECT",
  "BLOG",
  "RESOURCE",
  "ARTICLE",
  "SHOWCASE",
  "DISCUSSION",
  "GUIDE",
] as const;

const flexibleGithubRegex =
  /^https?:\/\/(www\.)?github\.com\/[\w.-]+(\/[\w.-]+)?\/?$/;

// Ensure these return strings (empty or otherwise) to prevent 'undefined' leaks
const githubUrlSchema = z
  .string()
  .url("Please enter a valid URL.")
  .regex(
    flexibleGithubRegex,
    "Please provide a valid GitHub profile or repository link."
  )
  .or(z.literal(""))
  .nullable()
  .default("");

const externalUrlSchema = z
  .string()
  .url("Please enter a valid URL.")
  .or(z.literal(""))
  .nullable()
  .default("");

export const createPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(500, "Description cannot exceed 500 characters."),
  content: z.string().min(20, "Main content must have at least 20 characters."),
  category: z.enum(postCategories, {
    required_error: "You must select a post category.",
  }),
  // Force arrays to always be arrays, even in the input
  postTags: z
    .array(z.string().min(1, "Tag cannot be empty"))
    .max(10, "You can add a maximum of 10 tags.")
    .default([]),
  postImages: z
    .array(z.instanceof(File))
    .max(5, "You can upload a maximum of 5 images.")
    .default([]),
  externalLink: externalUrlSchema,
  githubLink: githubUrlSchema,
});

// THIS IS THE KEY: We need the Output type for the SubmitHandler
export type CreatePostFormValues = z.output<typeof createPostSchema>;
// This is used for the useForm default values if needed
export type CreatePostInputValues = z.input<typeof createPostSchema>;

export const updatePostSchema = createPostSchema
  .extend({
    postImages: z
      .array(z.union([z.instanceof(File), z.record(z.unknown())]))
      .default([]),
  })
  .partial();

export type UpdatePostFormValues = z.output<typeof updatePostSchema>;
