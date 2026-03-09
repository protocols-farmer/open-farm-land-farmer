//src/components/pages/articles/ArticleDetails.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 🚜 ADDED
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast"; // 🚜 ADDED
import DOMPurify from "dompurify";
import "highlight.js/styles/github-dark.css";

// --- HOOKS & API ---
import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
  useDeletePostMutation, // 🚜 ADDED
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

// --- UI COMPONENTS ---
import PostInteractionHub from "../../shared/PostInteractionHub";
import CommentSection from "../posts/CommentSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"; // 🚜 ADDED
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // 🚜 ADDED
import {
  Edit,
  ExternalLink,
  Github,
  Terminal,
  Trash2,
  MoreHorizontal,
} from "lucide-react"; // 🚜 UPDATED

const PageSkeleton = () => (
  <section className="mx-auto max-w-7xl py-8 space-y-12 animate-pulse">
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="h-fit flex flex-col gap-4">
        <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-lg" />
          ))}
        </div>
      </div>
      <div className="lg:col-span-1 flex flex-col space-y-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-4/5" />
          <div className="flex items-center gap-4 pt-4 border-t">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
        <Skeleton className="h-20 w-full rounded-lg" />
        <Skeleton className="h-28 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  </section>
);

export default function DiscussionDetails({ postId }: { postId: string }) {
  const router = useRouter(); // 🚜 ADDED
  const {
    data: post,
    isLoading,
    isError,
  } = useGetPostByIdQuery(postId, { skip: !postId });

  const currentUser = useAppSelector(selectCurrentUser);
  const [recordPostView] = useRecordPostViewMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation(); // 🚜 ADDED

  /**
   * FIX 1: DERIVED IMAGE STATE
   */
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const mainImage = selectedImage || post?.images?.[0]?.url;

  /**
   * FIX 2: MEMOIZED SANITIZATION
   */
  const sanitizedContent = useMemo(() => {
    const content = post?.content;
    if (!content) return "";

    return DOMPurify.sanitize(content, {
      ADD_ATTR: ["class"],
    });
  }, [post?.content]);

  /**
   * ANALYTICAL EFFECTS
   */
  useEffect(() => {
    if (postId && currentUser) recordPostView(postId);
  }, [postId, currentUser, recordPostView]);

  // 🚜 DELETE HANDLER
  const handleDelete = async () => {
    if (!post) return;
    try {
      await deletePost(post.id).unwrap();
      toast.success("Discussion deleted successfully.");
      router.push("/discussions");
    } catch (err) {
      toast.error("Failed to delete the discussion.");
    }
  };

  if (isLoading) return <PageSkeleton />;

  if (isError || !post) {
    return (
      <section className="container mx-auto py-10">
        <Alert variant="destructive" className="max-w-md mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Post Not Found</AlertTitle>
          <AlertDescription>
            This discussion has been moved or returned to the soil.
          </AlertDescription>
        </Alert>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl py-8 space-y-12 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* --- Left Column: Sticky Image Gallery --- */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-muted shadow-sm">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground uppercase text-xs font-bold">
                No images provided
              </div>
            )}
          </div>
          {post.images && post.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {post.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all ${
                    mainImage === img.url
                      ? "border-primary shadow-md"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- Right Column: Post Details & Actions --- */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <header className="space-y-4">
            <Badge variant="secondary" className="w-fit capitalize font-bold">
              {post.category.toLowerCase()}
            </Badge>
            <h1 className="text-4xl font-black uppercase tracking-tighter md:text-5xl leading-none break-all">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>

            {/* 🚜 UPDATED AUTHOR ACTIONS: Added Delete Logic with Confirmation Dialog */}
            {currentUser?.id === post.author.id && (
              <div className="flex items-center gap-2 pt-2">
                <Button asChild variant="outline" className="flex-1 font-bold">
                  <Link href={`/posts/${post.id}/update`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Discussion
                  </Link>
                </Button>

                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive font-semibold cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-black uppercase tracking-tighter">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this discussion harvest.
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="font-bold">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 font-bold"
                      >
                        {isDeleting ? "Deleting..." : "Confirm Deletion"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}

            <div className="flex items-center gap-4 pt-6 border-t">
              <Link
                href={`/profile/${post.author.username}`}
                className="flex items-center gap-3 group"
              >
                <Avatar className="h-12 w-12 border shadow-sm">
                  <AvatarImage src={post.author.profileImage ?? undefined} />
                  <AvatarFallback className="font-bold">
                    {post.author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-foreground group-hover:underline decoration-primary">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    Posted{" "}
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
            </div>
          </header>

          <PostInteractionHub post={post} />

          <Card className="bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {post.tags.map((postTag) => (
                <Badge
                  key={postTag.tag.id}
                  variant="outline"
                  className="bg-background"
                >
                  # {postTag.tag.name}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {post.githubLink && (
              <Button asChild className="font-bold">
                <a
                  href={post.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Repo
                </a>
              </Button>
            )}
            {post.externalLink && (
              <Button variant="outline" asChild className="font-bold">
                <a
                  href={post.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* --- Main Content Area --- */}
      {sanitizedContent && (
        <div className="mx-auto max-w-4xl px-4">
          <div
            className="prose prose-lg prose-neutral prose-quoteless dark:prose-invert max-w-none break-words"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      )}

      <Separator />

      {/* --- Comments Section --- */}
      <div id="comments" className="max-w-4xl mx-auto w-full">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter">
              Discussions ({post.commentsCount})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <CommentSection
              postId={post.id}
              totalComments={post.commentsCount}
            />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
