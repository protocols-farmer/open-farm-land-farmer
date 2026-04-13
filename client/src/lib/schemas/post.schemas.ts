import { z } from "zod";

// --- CATEGORIES ---
export const postCategories = [
  "PROJECT",
  "BLOG",
  "RESOURCE",
  "ARTICLE",
  "SHOWCASE",
  "DISCUSSION",
  "GUIDE",
] as const;

// --- URL HELPERS ---
const externalUrlSchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .superRefine((url, ctx) => {
    if (url && url.length > 0) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "URL must start with 'http://' or 'https://'.",
        });
      }
    }
  });

const githubUrlSchema = z
  .string()
  .optional()
  .or(z.literal(""))
  .superRefine((url, ctx) => {
    if (url && url.length > 0) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "GitHub URL must start with 'http://' or 'https://'.",
        });
        return;
      }
      try {
        const hostname = new URL(url).hostname;
        if (hostname !== "github.com" && !hostname.endsWith(".github.com")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Must be a valid link from github.com.",
          });
        }
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid URL structure.",
        });
      }
    }
  });

// ==========================================
// 🚜 CREATE POST SCHEMA (Standalone)
// ==========================================
export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long.")
    .max(150, "Title cannot exceed 150 characters."),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters long.")
    .max(300, "Description cannot exceed 300 characters."),

  content: z
    .string()
    .min(20, "Main content must have at least 20 characters.")
    .max(50000, "Main content cannot exceed 50000 characters."),

  category: z.enum(postCategories, {
    required_error: "Please select a valid category.",
  }),

  postTags: z
    .array(
      z
        .string()
        .min(1, "Tag cannot be empty.")
        .max(25, "Each tag must be under 25 characters.")
        .regex(/^[a-zA-Z0-9-]+$/, "Tags must be alphanumeric with hyphens."),
    )
    .min(1, "At least one tag is required.")
    .max(10, "You can add up to 10 tags."),

  postImages: z
    .array(z.instanceof(File))
    .min(1, "A post must have at least one image.")
    .max(5, "You can upload a maximum of 5 images."),

  externalLink: externalUrlSchema,
  githubLink: githubUrlSchema,
});

// ==========================================
// 🚜 UPDATE POST SCHEMA (Standalone)
// ==========================================
export const updatePostSchema = z
  .object({
    title: z
      .string()
      .min(5, "Title must be at least 5 characters long.")
      .max(150, "Title cannot exceed 150 characters.")
      .optional(),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters long.")
      .max(300, "Description cannot exceed 300 characters.")
      .optional(),

    content: z
      .string()
      .min(20, "Main content must have at least 20 characters.")
      .max(50000, "Main content cannot exceed 50000 characters.")
      .optional(),

    category: z.enum(postCategories).optional(),

    postTags: z
      .array(
        z
          .string()
          .min(1, "Tag cannot be empty.")
          .max(25, "Each tag must be under 25 characters.")
          .regex(/^[a-zA-Z0-9-]+$/, "Tags must be alphanumeric with hyphens."),
      )
      .min(1, "At least one tag is required.")
      .max(10, "You can add up to 10 tags.")
      .optional(),

    // For updates, we handle new files AND IDs of images we want to keep
    postImages: z.array(z.instanceof(File)).default([]),
    retainedImages: z.array(z.string()).default([]),

    externalLink: externalUrlSchema,
    githubLink: githubUrlSchema,
  })
  .refine(
    (data) => {
      const totalImages =
        (data.postImages?.length || 0) + (data.retainedImages?.length || 0);
      return totalImages >= 1;
    },
    {
      message: "A post must have at least one image.",
      path: ["postImages"],
    },
  )
  .refine(
    (data) => {
      const totalImages =
        (data.postImages?.length || 0) + (data.retainedImages?.length || 0);
      return totalImages <= 5;
    },
    {
      message: "A post can have a maximum of 5 images total.",
      path: ["postImages"],
    },
  );

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
export type UpdatePostFormValues = z.infer<typeof updatePostSchema>;
