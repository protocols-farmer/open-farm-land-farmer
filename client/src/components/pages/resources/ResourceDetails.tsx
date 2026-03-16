//src/components/pages/resources/ResourceDetails.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import DOMPurify from "dompurify";
import "highlight.js/styles/github-dark.css";

import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
  useDeletePostMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

import PostInteractionHub from "../../shared/PostInteractionHub";
import CommentSection from "../posts/CommentSection";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  ExternalLink,
  Github,
  Terminal,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

export default function ResourceDetails({ postId }: { postId: string }) {
  const router = useRouter();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
  const currentUser = useAppSelector(selectCurrentUser);
  const [recordPostView] = useRecordPostViewMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

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

  const handleDelete = async () => {
    if (!post) return;
    try {
      await deletePost(post.id).unwrap();
      toast.success("Resource deleted successfully.");
      router.push("/resources");
    } catch (err) {
      toast.error("Failed to delete the resource.");
    }
  };

  if (isLoading)
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <p className="animate-pulse text-muted-foreground  font-black ">
          Loading Resource...
        </p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="container py-20">
        <Alert variant="destructive" className="max-w-xl mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Resource Not Found</AlertTitle>
          <AlertDescription>
            This resource has returned to the soil.
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <section className="mx-auto max-w-7xl py-8 space-y-12 animate-in fade-in duration-500">
      {/* --- Main Info: Gallery & Details --- */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left Side: Image Gallery */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden  border bg-muted shadow-sm">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground  text-xs font-bold">
                No gallery images
              </div>
            )}
          </div>
          {post.images && post.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {post.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square w-full overflow-hidden  border-2 transition-all ${
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

        {/* Right Side: Resource Metadata */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <header className="space-y-4">
            <Badge variant="secondary" className="w-fit capitalize font-bold">
              {post.category.toLowerCase()}
            </Badge>
            <h1 className="text-4xl font-black   md:text-5xl leading-none break-all">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>

            {/* 🚜 UPDATED AUTHOR ACTIONS: Added Delete Logic with Confirmation */}
            {currentUser?.id === post.author.id && (
              <div className="flex items-center gap-2 pt-2">
                <Button asChild variant="outline" className="flex-1 font-bold">
                  <Link href={`/posts/${post.id}/update`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Resource
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
                      <AlertDialogTitle className="font-black  ">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this resource harvest. This
                        action cannot be undone.
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
                href={`/user/${post.author.username}`}
                className="flex items-center gap-3 group"
              >
                <Avatar className="h-12 w-12 border shadow-sm">
                  <AvatarImage src={post.author.profileImage ?? undefined} />
                  <AvatarFallback className="font-bold">
                    {post.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-foreground group-hover:underline decoration-primary">
                    {post.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground  ">
                    Published{" "}
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
              <CardTitle className="text-sm font-black   text-muted-foreground">
                Relevant Tags
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
            {post.githubLink ? (
              <Button asChild className="font-bold">
                <a
                  href={post.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Repo
                </a>
              </Button>
            ) : (
              <div className="text-xs text-center text-muted-foreground p-3  border border-dashed font-bold  ">
                No Repo
              </div>
            )}
            {post.externalLink ? (
              <Button variant="outline" asChild className="font-bold">
                <a
                  href={post.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            ) : (
              <div className="text-xs text-center text-muted-foreground p-3  border border-dashed font-bold  ">
                No Demo
              </div>
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
            <CardTitle className="text-2xl font-black  ">
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
