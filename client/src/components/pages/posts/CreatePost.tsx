//src/components/pages/posts/CreatePost.tsx
"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePostMutation } from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import {
  createPostSchema,
  CreatePostFormValues,
} from "@/lib/schemas/post.schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import ReactHashTags from "./ReactHashTags";
import RichTextEditor from "./RichTextEditor";
import ImageUploadWithCropper from "./ImageUploadWithCropper";
import {
  Loader2,
  PlusCircle,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { getApiErrorMessage } from "@/lib/utils";
import { PostImageDto, PostCategory } from "@/lib/features/post/postTypes";

const postCategories = [
  "PROJECT",
  "BLOG",
  "RESOURCE",
  "ARTICLE",
  "SHOWCASE",
  "DISCUSSION",
  "GUIDE",
] as const;

/**
 * Helper to determine the correct post URL based on category
 */
const getPostAction = (post: { id: string; category: PostCategory }) => {
  const categoryToPathMap: Partial<Record<PostCategory, string>> = {
    PROJECT: "projects",
    SHOWCASE: "showcases",
    BLOG: "blogs",
    ARTICLE: "articles",
    RESOURCE: "resources",
    DISCUSSION: "discussions",
    GUIDE: "guides",
  };
  const path = categoryToPathMap[post.category] || "posts";
  return { href: `/${path}/${post.id}` };
};

export default function CreatePostPage() {
  const router = useRouter();
  const currentUser = useAppSelector(selectCurrentUser);
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    // Using a safer cast for the resolver to prevent the string[] | undefined error
    resolver: zodResolver(createPostSchema) as any,
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      content: "",
      // Cast the empty string to the category type to satisfy the initial state
      category: "" as unknown as CreatePostFormValues["category"],
      postTags: [],
      postImages: [],
      externalLink: "",
      githubLink: "",
    },
  });

  const handleTagsChange = useCallback(
    (tags: string[]) => setValue("postTags", tags, { shouldValidate: true }),
    [setValue],
  );

  const handleImagesChange = useCallback(
    (files: File[]) => setValue("postImages", files, { shouldValidate: true }),
    [setValue],
  );

  const handleContentChange = useCallback(
    (content: string) => setValue("content", content, { shouldValidate: true }),
    [setValue],
  );

  const stableEmptyArray = useMemo(() => [], []);

  const onSubmit: SubmitHandler<CreatePostFormValues> = async (data) => {
    setFormError(null);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("category", data.category);
    formData.append("postTags", JSON.stringify(data.postTags));

    if (data.externalLink) formData.append("externalLink", data.externalLink);
    if (data.githubLink) formData.append("githubLink", data.githubLink);

    data.postImages.forEach((file) => {
      formData.append("postImages", file);
    });

    try {
      const response = await createPost(formData).unwrap();
      const { href } = getPostAction(response.data);
      router.push(href);
    } catch (err: unknown) {
      // PROPER TYPE GUARDING: No more lazy 'any' here
      if (err && typeof err === "object" && "data" in err) {
        setFormError(getApiErrorMessage(err));
      } else {
        setFormError("An unexpected error occurred while creating the post.");
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <Card className="w-full max-w-md text-center p-8">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Log in to sow your next project.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/auth/login">Log In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Button variant="link" asChild className="px-0 mb-6 group">
        <Link href="/" className="inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-black uppercase tracking-tighter">
            Sow a New Post
          </CardTitle>
          <CardDescription>
            Share your project journey without the AI fluff.
          </CardDescription>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {formError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input
                id="title"
                placeholder="A catchy headline..."
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                placeholder="What is this about?"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {postCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-xs text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Controller
                  name="postTags"
                  control={control}
                  render={({ field }) => (
                    <ReactHashTags
                      onChange={handleTagsChange}
                      initialTags={field.value}
                    />
                  )}
                />
                {errors.postTags && (
                  <p className="text-xs text-destructive">
                    {errors.postTags.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Post Images (Max 5)</Label>
              <Controller
                name="postImages"
                control={control}
                render={({ field }) => (
                  <ImageUploadWithCropper
                    value={field.value}
                    onChange={handleImagesChange}
                    existingImages={stableEmptyArray}
                    maxFiles={5}
                  />
                )}
              />
              {errors.postImages && (
                <p className="text-xs text-destructive">
                  {errors.postImages.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Main Content</Label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    onChange={handleContentChange}
                    initialContent={field.value}
                  />
                )}
              />
              {errors.content && (
                <p className="text-xs text-destructive">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="externalLink">External Link</Label>
                <Input
                  id="externalLink"
                  placeholder="https://..."
                  {...register("externalLink")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input
                  id="githubLink"
                  placeholder="https://github.com/..."
                  {...register("githubLink")}
                />
                {errors.githubLink && (
                  <p className="text-xs text-destructive">
                    {errors.githubLink.message}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {isSuccess && (
              <Alert
                variant="default"
                className="border-green-500/20 bg-green-500/10 text-green-600 dark:text-green-400"
              >
                <CheckCircle className="h-4 w-4" />
                <AlertTitle className="font-bold">
                  Post Creation Successful!
                </AlertTitle>
                <AlertDescription>
                  Your project has been created. Redirecting to your post...
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full font-bold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sowing...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-5 w-5" /> Publish Post
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
