"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// --- HOOKS & STATE MANAGEMENT ---
import { useAuthAction } from "@/lib/hooks/useAuthAction";
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
  useSharePostMutation,
} from "@/lib/features/post/postApiSlice";
import { PostDto, PostCategory } from "@/lib/features/post/postTypes";

// --- UI COMPONENTS & ICONS ---
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Heart,
  Bookmark,
  Share2,
  Eye,
  MessageSquare,
  Loader2,
  Copy,
  Check,
  Lock,
  ArrowRight,
} from "lucide-react";

// --- UTILITIES ---
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { formatCompactNumber } from "@/lib/utils";

const FALLBACK_POST_IMAGE = "/fallback-project.jpg";

interface PostCardProps {
  post: PostDto;
}

const TagsDisplay = ({ tags }: { tags: PostDto["tags"] }) => {
  if (!tags || tags.length === 0) return null;
  const maxTagsToShow = 3;
  const remainingTags = tags.length - (maxTagsToShow - 1);
  const tagsToShow =
    tags.length > maxTagsToShow ? tags.slice(0, maxTagsToShow - 1) : tags;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tagsToShow.map((postTag) => (
        <Badge key={postTag.tag.id} variant="secondary" className="font-normal">
          {postTag.tag.name}
        </Badge>
      ))}
      {tags.length > maxTagsToShow && (
        <Badge variant="outline" className="font-normal">
          +{remainingTags}
        </Badge>
      )}
    </div>
  );
};

const getPostAction = (post: PostDto) => {
  const category = post.category as PostCategory;
  const categoryToPathMap: Partial<Record<PostCategory, string>> = {
    PROJECT: "projects",
    SHOWCASE: "showcases",
    BLOG: "blogs",
    ARTICLE: "articles",
    RESOURCE: "resources",
    DISCUSSION: "discussions",
    GUIDE: "guides",
  };
  const path = categoryToPathMap[category] || "posts";
  return { href: `/${path}/${post.id}` };
};

const getSmartActionText = (category: PostCategory): string => {
  const actionTextMap: Record<PostCategory, string> = {
    ARTICLE: "Read Article",
    BLOG: "Read Blog",
    PROJECT: "Explore Project",
    SHOWCASE: "View Showcase",
    GUIDE: "Start Guide",
    RESOURCE: "Get Resource",
    DISCUSSION: "Join Discussion",
  };
  return actionTextMap[category] || "View Post";
};

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const handleAuthAction = useAuthAction();

  const [showShareDialog, setShowShareDialog] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // RTK Query Mutations
  const [savePost, { isLoading: isSaving }] = useSavePostMutation();
  const [unsavePost, { isLoading: isUnsaving }] = useUnsavePostMutation();
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [unlikePost, { isLoading: isUnliking }] = useUnlikePostMutation();
  const [sharePost, { isLoading: isSharing }] = useSharePostMutation();

  const handleToggleSave = () =>
    handleAuthAction(async () => {
      if (isSaving || isUnsaving) return;
      try {
        if (post.isSavedByCurrentUser) await unsavePost(post.id).unwrap();
        else await savePost(post.id).unwrap();
      } catch (err) {
        toast.error("Failed to update save status.");
      }
    }, "save");

  const handleToggleLike = () =>
    handleAuthAction(async () => {
      if (isLiking || isUnliking) return;
      try {
        if (post.isLikedByCurrentUser) await unlikePost(post.id).unwrap();
        else await likePost(post.id).unwrap();
      } catch (err) {
        toast.error("Failed to update like status.");
      }
    }, "like");

  const handleOpenShareDialog = () =>
    handleAuthAction(() => {
      setLinkCopied(false);
      setShowShareDialog(true);
    }, "share");

  const handleShareAndCopy = async () => {
    const postUrl = `${window.location.origin}${getPostAction(post).href}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      setLinkCopied(true);
      if (!isSharing)
        await sharePost({ postId: post.id, platform: "LINK_COPIED" }).unwrap();
      setTimeout(() => setShowShareDialog(false), 1500);
    } catch (err) {
      toast.error("Could not copy link.");
    }
  };

  const timeAgo = post?.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : null;
  const { href } = getPostAction(post);
  const smartActionText = getSmartActionText(post.category);

  return (
    <TooltipProvider delayDuration={200}>
      <Card className="relative flex flex-col h-full group overflow-hidden border-border/60 hover:border-border hover:shadow-xl transition-all duration-300">
        <Link
          href={href}
          onClick={(e) => {
            e.preventDefault();
            handleAuthAction(() => router.push(href), "view");
          }}
        >
          <div className="aspect-video w-full overflow-hidden bg-muted/40 relative">
            <Image
              src={post.images?.[0]?.url || FALLBACK_POST_IMAGE}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 capitalize text-xs"
            >
              {post.category.toLowerCase()}
            </Badge>
          </div>
        </Link>

        <div className="flex items-center justify-around w-full p-2 border-b">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-1.5",
                  post.isLikedByCurrentUser && "text-red-500"
                )}
                onClick={handleToggleLike}
                disabled={isLiking || isUnliking}
              >
                {isLiking || isUnliking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      post.isLikedByCurrentUser && "fill-current"
                    )}
                  />
                )}
                <span className="text-xs font-semibold">
                  {formatCompactNumber(post.likesCount)}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {post.isLikedByCurrentUser ? "Unlike" : "Like"}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-1.5",
                  post.isSavedByCurrentUser && "text-primary"
                )}
                onClick={handleToggleSave}
                disabled={isSaving || isUnsaving}
              >
                {isSaving || isUnsaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Bookmark
                    className={cn(
                      "h-4 w-4",
                      post.isSavedByCurrentUser && "fill-current"
                    )}
                  />
                )}
                <span className="text-xs font-semibold">
                  {formatCompactNumber(post.savedCount)}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {post.isSavedByCurrentUser ? "Unsave" : "Save"}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={handleOpenShareDialog}
                disabled={isSharing}
              >
                {isSharing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
                <span className="text-xs font-semibold">
                  {formatCompactNumber(post.sharesCount)}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share</TooltipContent>
          </Tooltip>
        </div>

        {/* === REFACTORED: Title, Description, and Tags are now all in CardContent to fix the gap === */}
        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-lg leading-snug font-bold line-clamp-2 mb-2">
            <Link
              href={href}
              onClick={(e) => {
                e.preventDefault();
                handleAuthAction(() => router.push(href), "view");
              }}
              className="hover:text-primary transition-colors"
            >
              {post.title}
            </Link>
          </CardTitle>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {post.description}
          </p>

          <div className="mb-4">
            <TagsDisplay tags={post.tags} />
          </div>

          {/* This div now uses mt-auto to push itself to the bottom of the flex container */}
          <div className="flex items-center justify-between mt-auto">
            <Link
              href={`/profile/${post.author.username}`}
              className="flex items-center gap-2 group/author min-w-0 mr-2"
            >
              <Avatar className="w-8 h-8 flex-shrink-0 group-hover/author:ring-2 group-hover/author:ring-primary ring-offset-2 ring-offset-background transition-all">
                <AvatarImage
                  src={post.author.profileImage ?? undefined}
                  alt={post.author.name}
                />
                <AvatarFallback className="text-xs bg-muted">
                  {post.author.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <span className="text-sm font-medium text-foreground truncate group-hover/author:text-primary transition-colors">
                  {post.author.name}
                </span>
                {timeAgo && (
                  <span className="text-xs text-muted-foreground block">
                    {timeAgo}
                  </span>
                )}
              </div>
            </Link>
            <div className="flex items-center text-muted-foreground text-xs gap-3">
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {formatCompactNumber(post.viewsCount)}
                </TooltipTrigger>
                <TooltipContent>Views</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {formatCompactNumber(post.commentsCount)}
                </TooltipTrigger>
                <TooltipContent>Comments</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 mt-auto border-t">
          <Button
            size="sm"
            className="w-full"
            onClick={() => handleAuthAction(() => router.push(href), "view")}
          >
            {smartActionText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Dialogs remain unchanged */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 /> Share Post
            </DialogTitle>
            <DialogDescription>
              Copy the link to share this post with others.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-2">
            <Input
              id="link"
              defaultValue={`${
                typeof window !== "undefined" ? window.location.origin : ""
              }${href}`}
              readOnly
              className="flex-1"
            />
            <Button
              type="button"
              size="sm"
              className="px-3"
              onClick={handleShareAndCopy}
              disabled={isSharing}
            >
              {linkCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">{linkCopied ? "Copied" : "Copy"}</span>
            </Button>
          </div>
          {linkCopied && (
            <p className="text-sm text-green-600 mt-2 text-center">
              Link copied to clipboard!
            </p>
          )}
          <DialogFooter className="sm:justify-start mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
