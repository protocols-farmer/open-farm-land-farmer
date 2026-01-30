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
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
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
  const maxTagsToShow = 2; // Reduced to save space
  const remainingTags = tags.length - maxTagsToShow;
  const tagsToShow = tags.slice(0, maxTagsToShow);

  return (
    <div className="flex flex-wrap items-center gap-1">
      {tagsToShow.map((postTag) => (
        <Badge
          key={postTag.tag.id}
          variant="secondary"
          className="font-normal text-[10px] px-1.5 py-0 h-4"
        >
          {postTag.tag.name}
        </Badge>
      ))}
      {tags.length > maxTagsToShow && (
        <Badge
          variant="outline"
          className="font-normal text-[10px] px-1.5 py-0 h-4"
        >
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

  const [savePost, { isLoading: isSaving }] = useSavePostMutation();
  const [unsavePost, { isLoading: isUnsaving }] = useUnsavePostMutation();
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [unlikePost, { isLoading: isUnliking }] = useUnlikePostMutation();
  const [sharePost, { isLoading: isSharing }] = useSharePostMutation();

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAuthAction(async () => {
      if (isSaving || isUnsaving) return;
      try {
        if (post.isSavedByCurrentUser) await unsavePost(post.id).unwrap();
        else await savePost(post.id).unwrap();
      } catch (err) {
        toast.error("Failed to update save status.");
      }
    }, "save");
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAuthAction(async () => {
      if (isLiking || isUnliking) return;
      try {
        if (post.isLikedByCurrentUser) await unlikePost(post.id).unwrap();
        else await likePost(post.id).unwrap();
      } catch (err) {
        toast.error("Failed to update like status.");
      }
    }, "like");
  };

  const handleOpenShareDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAuthAction(() => {
      setLinkCopied(false);
      setShowShareDialog(true);
    }, "share");
  };

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
      <Card className="relative flex flex-col h-full group overflow-hidden border-border/60 hover:border-border hover:shadow-lg transition-all duration-300">
        <Link
          href={href}
          className="relative block aspect-video w-full overflow-hidden bg-muted/40"
        >
          <Image
            src={post.images?.[0]?.url || FALLBACK_POST_IMAGE}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 capitalize text-[10px] bg-background/80 backdrop-blur-md h-5"
          >
            {post.category.toLowerCase()}
          </Badge>
        </Link>

        {/* COMPACT ACTION ROW */}
        <div className="flex items-center justify-between px-2 py-1 border-b bg-muted/5">
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-2 gap-1.5",
                post.isLikedByCurrentUser && "text-red-500",
              )}
              onClick={handleToggleLike}
            >
              {isLiking || isUnliking ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Heart
                  className={cn(
                    "h-3.5 w-3.5",
                    post.isLikedByCurrentUser && "fill-current",
                  )}
                />
              )}
              <span className="text-[11px] font-bold">
                {formatCompactNumber(post.likesCount)}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-8 px-2 gap-1.5",
                post.isSavedByCurrentUser && "text-primary",
              )}
              onClick={handleToggleSave}
            >
              {isSaving || isUnsaving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Bookmark
                  className={cn(
                    "h-3.5 w-3.5",
                    post.isSavedByCurrentUser && "fill-current",
                  )}
                />
              )}
              <span className="text-[11px] font-bold">
                {formatCompactNumber(post.savedCount)}
              </span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={handleOpenShareDialog}
          >
            <Share2 className="h-3.5 w-3.5" />
          </Button>
        </div>

        <CardContent className="p-3 flex flex-col flex-grow space-y-2">
          <CardTitle className="text-base leading-snug font-bold line-clamp-2">
            <Link href={href} className="hover:text-primary transition-colors">
              {post.title}
            </Link>
          </CardTitle>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {post.description}
          </p>

          <TagsDisplay tags={post.tags} />

          <div className="flex items-center justify-between mt-auto pt-2">
            <Link
              href={`/profile/${post.author.username}`}
              className="flex items-center gap-2 group/author min-w-0"
            >
              <Avatar className="w-6 h-6 flex-shrink-0 group-hover/author:ring-1 group-hover/author:ring-primary ring-offset-1 transition-all">
                <AvatarImage src={post.author.profileImage ?? undefined} />
                <AvatarFallback className="text-[10px] bg-muted">
                  {post.author.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <span className="text-xs font-semibold block truncate group-hover/author:text-primary transition-colors">
                  {post.author.name}
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  {timeAgo}
                </span>
              </div>
            </Link>
            <div className="flex items-center text-muted-foreground text-[10px] gap-2.5 shrink-0">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatCompactNumber(post.viewsCount)}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3 w-3" />
                {formatCompactNumber(post.commentsCount)}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-2 pt-0">
          <Button
            size="sm"
            variant="outline"
            className="w-full h-8 text-xs hover:bg-accent hover:text-accent-foreground group/btn"
            onClick={() => router.push(href)}
          >
            {smartActionText}
            <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" /> Share Post
            </DialogTitle>
            <DialogDescription>
              Copy the link to share this post with others.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-2">
            <Input
              defaultValue={`${typeof window !== "undefined" ? window.location.origin : ""}${href}`}
              readOnly
              className="flex-1 h-9 text-sm"
            />
            <Button size="sm" className="px-3" onClick={handleShareAndCopy}>
              {linkCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" size="sm">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
