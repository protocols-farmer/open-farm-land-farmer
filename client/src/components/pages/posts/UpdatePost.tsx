"use client";

import React, { useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

// --- HOOKS & API ---
import {
  useUpdatePostMutation,
  useGetPostByIdQuery,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

// --- SCHEMAS & TYPES ---
import {
  updatePostSchema,
  UpdatePostFormValues,
} from "@/lib/schemas/post.schemas";
import {
  PostImageDto,
  PostCategory,
  PostDto,
} from "@/lib/features/post/postTypes";

// --- UI COMPONENTS ---
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Loader2,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

// --- CUSTOM COMPONENTS & UTILS ---
import ReactHashTags from "./ReactHashTags";
import RichTextEditor from "./RichTextEditor";
import ImageUploadWithCropper from "./ImageUploadWithCropper";
import { getApiErrorMessage } from "@/lib/utils";

const postCategories: PostCategory[] = [
  "PROJECT",
  "BLOG",
  "RESOURCE",
  "ARTICLE",
  "SHOWCASE",
  "DISCUSSION",
  "GUIDE",
];

const getPostAction = (post: { id: string; category: PostCategory }) => {
  const categoryToPathMap: Record<PostCategory, string> = {
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

const PageSkeleton = () => (
  <div className="container mx-auto max-w-3xl py-8 animate-pulse">
    <div className="h-8 bg-secondary rounded w-1/4 mb-6" />
    <Card>
      <CardHeader>
        <div className="h-10 bg-secondary rounded w-3/4" />
        <div className="h-6 bg-secondary rounded w-1/2 mt-2" />
      </CardHeader>
      <Separator className="mb-6" />
      <CardContent className="space-y-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-6 bg-secondary rounded w-1/6" />
            <div className="h-10 bg-secondary rounded" />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default function UpdatePostPage() {
  const params = useParams();
  const postId = params.slug as string;
  const currentUser = useAppSelector(selectCurrentUser);

  const {
    data: postData,
    isLoading: isLoadingPost,
    isError,
  } = useGetPostByIdQuery(postId, { skip: !postId });

  if (isLoadingPost) return <PageSkeleton />;

  if (isError || !postData) {
    return (
      <div className="container mx-auto py-10 flex justify-center text-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Fetching Post</AlertTitle>
          <AlertDescription>
            Post not found.
            <Button variant="link" asChild className="block mt-2">
              <Link href="/">Return Home</Link>
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (currentUser?.id !== postData.authorId) {
    return (
      <div className="container mx-auto py-10 flex justify-center text-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Unauthorized</AlertTitle>
          <AlertDescription>
            You are not the author of this post.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <UpdatePostForm key={postData.id} postData={postData} />;
}

interface UpdatePostFormProps {
  postData: PostDto;
}

function UpdatePostForm({ postData }: UpdatePostFormProps) {
  const router = useRouter();
  const [updatePost, { isLoading: isUpdating, isSuccess }] =
    useUpdatePostMutation();
  const [formError, setFormError] = useState<string | null>(null);

  // Tracks which images already exist on Cloudinary that the user wants to keep
  const [retainedImages, setRetainedImages] = useState<PostImageDto[]>(
    postData.images
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdatePostFormValues>({
    resolver: zodResolver(updatePostSchema),
    mode: "onSubmit",
    defaultValues: {
      title: postData.title,
      description: postData.description,
      content: postData.content,
      category: postData.category,
      postTags: postData.tags.map((t) => t.tag.name),
      postImages: [], // New uploads start empty
      externalLink: postData.externalLink || "",
      githubLink: postData.githubLink || "",
    },
  });

  const handleImagesChange = useCallback(
    (files: File[], retained: PostImageDto[]) => {
      setValue("postImages", files, { shouldValidate: true });
      setRetainedImages(retained);
    },
    [setValue]
  );

  const handleContentChange = useCallback(
    (content: string) => setValue("content", content, { shouldValidate: true }),
    [setValue]
  );

  const onSubmit: SubmitHandler<UpdatePostFormValues> = async (data) => {
    setFormError(null);
    const formData = new FormData();

    formData.append("title", data.title || "");
    formData.append("description", data.description || "");
    formData.append("content", data.content || "");
    formData.append("category", data.category || "");
    formData.append("postTags", JSON.stringify(data.postTags || []));
    formData.append("externalLink", data.externalLink || "");
    formData.append("githubLink", data.githubLink || "");

    // FIX: Type Guard to handle the Union Type (File | Record)
    data.postImages?.forEach((item) => {
      if (item instanceof File) {
        formData.append("postImages", item);
      }
    });

    const retainedImageUrls = retainedImages.map((img) => img.url);
    formData.append("retainedImageUrls", JSON.stringify(retainedImageUrls));

    try {
      const response = await updatePost({
        postId: postData.id,
        formData,
      }).unwrap();
      const { href } = getPostAction(response.data);
      router.push(href);
    } catch (err: unknown) {
      setFormError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
      <Button variant="link" asChild className="px-0 mb-6 group">
        <Link
          href={`/posts/${postData.id}`}
          className="inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Post
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-black uppercase tracking-tighter">
            Update Harvest
          </CardTitle>
          <CardDescription>
            Refine your project journey details.
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
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-xs text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea id="description" {...register("description")} />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue />
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
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Controller
                  name="postTags"
                  control={control}
                  render={({ field }) => (
                    <ReactHashTags
                      onChange={field.onChange}
                      initialTags={field.value || []}
                    />
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Post Images (Current & New)</Label>
              <Controller
                name="postImages"
                control={control}
                render={({ field }) => (
                  <ImageUploadWithCropper
                    existingImages={retainedImages}
                    // Filter to only pass binary Files to the cropper component
                    value={(field.value || []).filter(
                      (i): i is File => i instanceof File
                    )}
                    onChange={handleImagesChange}
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
                    initialContent={field.value || ""}
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
                <Input id="externalLink" {...register("externalLink")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubLink">GitHub Link</Label>
                <Input id="githubLink" {...register("githubLink")} />
              </div>
            </div>

            <Separator />

            {isSuccess && (
              <Alert
                variant="default"
                className="border-green-500/50 text-green-700 bg-green-50"
              >
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Harvest updated successfully!
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isUpdating}
              className="w-full font-bold"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" /> Save Changes
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
