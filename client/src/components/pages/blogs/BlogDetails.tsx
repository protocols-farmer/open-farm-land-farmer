//src/components/pages/blogs/BlogDetails.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";

import {
  useGetPostByIdQuery,
  useRecordPostViewMutation,
  useDeletePostMutation,
} from "@/lib/features/post/postApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

import PostInteractionHub from "../../shared/PostInteractionHub";
import CommentSection from "../posts/CommentSection";
// --- TIPTAP RENDERER IMPORT ---
import TiptapRenderer from "../posts/TiptapRenderer";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
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
  ExternalLink,
  Github,
  Edit,
  Trash2,
  MoreHorizontal,
  Terminal,
  Clock,
  AlertTriangle,
  CircleChevronLeft,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CornerFlourish,
  FlourishOrnate,
  SideFlourish,
} from "@/components/shared/Ornates";

export default function BlogDetails({ postId }: { postId: string }) {
  const router = useRouter();
  const { data: post, isLoading, isError } = useGetPostByIdQuery(postId);
  const currentUser = useAppSelector(selectCurrentUser);

  const [recordPostView] = useRecordPostViewMutation();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const mainImage = selectedImage || post?.images?.[0]?.url;

  const readingTime = useMemo(() => {
    if (!post?.content) return 0;

    const wordsPerMinute = 225;

    let wordCount = 0;
    const wordRegex = /\s+/g;
    while (wordRegex.exec(post.content)) {
      wordCount++;
    }

    if (wordCount === 0 && post.content.length > 0) wordCount = 1;

    return Math.ceil(wordCount / wordsPerMinute);
  }, [post?.content]);

  useEffect(() => {
    if (postId && currentUser) recordPostView(postId);
  }, [postId, currentUser, recordPostView]);

  const handleDelete = async () => {
    if (!post) return;
    try {
      await deletePost(post.id).unwrap();
      toast.success("Blog post deleted.");
      router.push("/blogs");
    } catch (err) {
      toast.error("Deletion failed.");
    }
  };

  if (isLoading)
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="animate-pulse text-[10px] font-black   text-muted-foreground">
          Loading Content...
        </p>
      </div>
    );

  if (isError || !post)
    return (
      <div className="container py-20">
        <Alert
          variant="destructive"
          className="mx-auto max-w-xl rounded-none border-3 border-double"
        >
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle className="font-black  ">
            Post not found OR an error Occurred
          </AlertTitle>
          <AlertDescription className="font-medium">
            The requested blog post was not found. Please check the URL or try
            again later.
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <section className="  space-y-13 max-w-10xl mx-auto ">
      {/* --- INTRO SECTION --- */}
      <div className="grid grid-cols-1 gap-13 lg:grid-cols-2">
        <div className="flex flex-col space-y-11">
          <header className="space-y-3">
            <Button
              variant="outline"
              asChild
              className="rounded-none font-bold border-3 border-double "
            >
              <Link
                href="/blogs"
                className="flex items-center justify-center gap-3  font-bold w-fit "
              >
                <CircleChevronLeft className="h-4 w-4" />
                <span>Return to blogs</span>
              </Link>
            </Button>

            <div className="flex items-center  gap-3">
              <Badge className="rounded-none font-bold">{post.category}</Badge>
              <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-[10px]  ">
                <Clock className="h-3 w-3" />
                {readingTime} Minutes Read
              </div>
            </div>
            <div className="flex items-center gap-3 ">
              <Link
                href={`/profile/${post.author.username}`}
                className="flex items-center gap-3 group"
              >
                <Avatar className="h-14 w-14 border-3 border-double rounded-none">
                  <AvatarImage src={post.author.profileImage ?? undefined} />
                  <AvatarFallback className="font-black text-xl">
                    {post.author.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-black text-lg group-hover:underline decoration-primary decoration-2 underline-offset-3">
                    {post.author.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-black  ">
                    Created{" "}
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
            </div>
            <h1 className="text-xl md:text-3xl lg:text-5xl font-black wrap-break-words">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground font-medium italic  border-l-5 pl-3 wrap-break-words">
              {post.description}
            </p>

            {currentUser?.id === post.author.id && (
              <div className="flex items-center gap-3 ">
                <Button
                  asChild
                  variant="outline"
                  className="flex-1 font-bold rounded-none border-3 border-double "
                >
                  <Link href={`/posts/${post.id}/update`}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Blog
                  </Link>
                </Button>

                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-none border-3 border-double"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="rounded-none border-3 border-double"
                    >
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-destructive font-bold    cursor-pointer">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete Blog
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <AlertDialogContent className="rounded-none border-3 border-double">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="font-black text-2xl">
                        Confirm Deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription className="font-medium">
                        This will permanently remove this Blog from the
                        database. This cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-none cursor-pointer font-bold border-3 border-double">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-foreground cursor-pointer  font-bold hover:bg-destructive/90 font-bolder border-3 border-double rounded-none"
                      >
                        {isDeleting ? "Deleting..." : "Confirm Deletion"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </header>

          <PostInteractionHub post={post} />

          <div className="space-y-3">
            <h3 className=" font-bold text-primary">Technical Tags</h3>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((postTag) => (
                <Badge
                  key={postTag.tag.id}
                  variant="outline"
                  className=" rounded-none text-primary font-bold  border-3 border-double"
                >
                  # {postTag.tag.name}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {post.githubLink && (
              <Button
                asChild
                variant="outline"
                className="rounded-none border-3 border-double  "
              >
                <a
                  href={post.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" /> Repository
                </a>
              </Button>
            )}
            {post.externalLink && (
              <Button
                variant="outline"
                asChild
                className="rounded-none border-3 border-double  "
              >
                <a
                  href={post.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* --- IMAGE SECTION --- */}
        <div className="lg:sticky lg:top-24 h-fit flex flex-col gap-3">
          <div className="relative aspect-16/10 w-full border-3 border-double  bg-muted  group">
            <FlourishOrnate className="-top-2 -left-2 -rotate-90 z-20" />
            <FlourishOrnate className="-top-2 -right-2 rotate-0 z-20" />
            <FlourishOrnate className="-bottom-2 -right-2 rotate-90 z-20" />
            <FlourishOrnate className="-bottom-2 -left-2 rotate-180 z-20" />

            {isImageLoading && (
              <Skeleton className="absolute inset-0 z-10 rounded-none" />
            )}
            {mainImage ? (
              <Image
                src={mainImage}
                alt={post.title}
                fill
                className={cn(
                  "object-cover ",
                  isImageLoading ? "opacity-0" : "opacity-100",
                )}
                priority
                onLoad={() => setIsImageLoading(false)}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground font-black text-[10px] ">
                No Image Available
              </div>
            )}
          </div>

          <div className="p-3 bg-card border-3 border-double ">
            {post.images && post.images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {post.images.map((img) => {
                  const isActive = mainImage === img.url;
                  return (
                    <button
                      key={img.id}
                      onClick={() => {
                        if (!isActive) {
                          setIsImageLoading(true);
                          setSelectedImage(img.url);
                        }
                      }}
                      className={cn(
                        "relative aspect-square w-full overflow-hidden border-3 border-double transition-all",
                        isActive
                          ? "border-primary scale-90 ring-4 ring-primary/10"
                          : "border-transparent opacity-40 hover:opacity-100",
                      )}
                    >
                      <Image
                        src={img.url}
                        alt="thumbnail"
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <Separator className="h-3 " />

      {/* --- CONTENT AREA --- */}
      <div className=" w-full  p-6 border-3 border-double bg-background">
        <TiptapRenderer content={post.content || ""} />
      </div>

      <Separator className="h-0.5 border-dashed" />

      {/* --- DISCUSSIONS --- */}
      <div id="comments" className="w-full pb-24 flex flex-col gap-9">
        <div className="flex items-center gap-3 ">
          <h2 className="text-4xl font-black ">Comments</h2>
          <Badge
            variant="outline"
            className="font-black rounded-none border-3 border-double"
          >
            {post.commentsCount} Comments
          </Badge>
        </div>

        <CommentSection postId={post.id} totalComments={post.commentsCount} />
      </div>
    </section>
  );
}
