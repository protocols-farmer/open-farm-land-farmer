//src/components/pages/posts/PostCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuthAction } from "@/lib/hooks/useAuthAction";
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
  useSharePostMutation,
} from "@/lib/features/post/postApiSlice";
import { PostDto, PostCategory } from "@/lib/features/post/postTypes";

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

import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { formatCompactNumber } from "@/lib/utils";
import {
  CornerFlourish,
  FlourishOrnate,
  SideFlourish,
} from "@/components/shared/Ornates";

const FALLBACK_POST_IMAGE = "/fallback-project.jpg";

interface PostCardProps {
  post: PostDto;
}

const TagsDisplay = ({ tags }: { tags: PostDto["tags"] }) => {
  if (!tags || tags.length === 0) return null;
  const maxTagsToShow = 2;
  const remainingTags = tags.length - maxTagsToShow;
  const tagsToShow = tags.slice(0, maxTagsToShow);

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-1">
      {tagsToShow.map((postTag) => (
        <Badge
          key={postTag.tag.id}
          variant="outline"
          className="   text-[9px] px-1.5 py-0 h-4 rounded-none border-dashed border-primary/40 text-primary bg-transparent"
        >
          {postTag.tag.name}
        </Badge>
      ))}
      {tags.length > maxTagsToShow && (
        <Badge
          variant="outline"
          className="   text-[9px] px-1.5 py-0 h-4 rounded-none border-dashed border-muted-foreground/40 text-muted-foreground bg-transparent"
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
      <Card className="relative rounded-none flex flex-col h-full group overflow-visible border-[3px] border-double border-border/80 bg-card hover:border-primary/60 transition-colors duration-300 shadow-sm hover:shadow-lg">
        <CornerFlourish className="-top-1.5 -left-1.5 rotate-0" />
        <CornerFlourish className="-top-1.5 -right-1.5 rotate-90" />
        <CornerFlourish className="-bottom-1.5 -left-1.5 -rotate-90" />
        <CornerFlourish className="-bottom-1.5 -right-1.5 rotate-180" />

        <FlourishOrnate className="-top-2 -left-2 -rotate-90" />
        <FlourishOrnate className="-top-2 -right-2 rotate-0" />
        <FlourishOrnate className="-bottom-2 -right-2 rotate-90" />
        <FlourishOrnate className="-bottom-2 -left-2 rotate-180" />

        <SideFlourish className="-top-2 left-1/2 -translate-x-1/2 bg-card px-2" />
        <SideFlourish className="-bottom-2 left-1/2 -translate-x-1/2 rotate-180 bg-card px-2" />
        <SideFlourish className="-left-[14px] top-1/2 -translate-y-1/2 -rotate-90 bg-card px-2" />
        <SideFlourish className="-right-[14px] top-1/2 -translate-y-1/2 rotate-90 bg-card px-2" />

        <Link
          href={href}
          className="relative block aspect-video w-full overflow-hidden bg-secondary border-b-2 border-border/80"
        >
          <Image
            src={post.images?.[0]?.url || FALLBACK_POST_IMAGE}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover sepia-[.40] contrast-[1.15] saturate-50 transition-all duration-700 ease-out group-hover:scale-105 group-hover:sepia-0 group-hover:saturate-100"
          />

          <Badge
            variant="outline"
            className="absolute top-2 right-2    text-[9px] bg-background/95 border-dashed border-primary/60 text-primary rounded-none shadow-sm h-6 px-2"
          >
            {post.category}
          </Badge>
        </Link>

        <div className="flex items-center justify-between px-2 py-1 border-b border-dashed border-border/60 bg-muted/20">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2 gap-1.5 rounded-none hover:bg-transparent hover:text-destructive",
                post.isLikedByCurrentUser && "text-destructive",
              )}
              onClick={handleToggleLike}
            >
              {isLiking || isUnliking ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Heart
                  className={cn(
                    "h-3 w-3 transition-all",
                    post.isLikedByCurrentUser && "fill-current scale-110",
                  )}
                />
              )}
              <span className="text-[10px]  font-bold ">
                {formatCompactNumber(post.likesCount)}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2 gap-1.5 rounded-none hover:bg-transparent hover:text-primary",
                post.isSavedByCurrentUser && "text-primary",
              )}
              onClick={handleToggleSave}
            >
              {isSaving || isUnsaving ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Bookmark
                  className={cn(
                    "h-3 w-3 transition-all",
                    post.isSavedByCurrentUser && "fill-current scale-110",
                  )}
                />
              )}
              <span className="text-[10px]  font-bold ">
                {formatCompactNumber(post.savedCount)}
              </span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 rounded-none hover:bg-transparent hover:text-primary"
            onClick={handleOpenShareDialog}
          >
            <Share2 className="h-3 w-3" />
          </Button>
        </div>

        <CardContent className="p-4 flex flex-col flex-grow space-y-3">
          <CardTitle className="text-lg  leading-snug  font-bold line-clamp-2">
            <Link
              href={href}
              className="hover:text-primary hover:underline decoration-primary/30 decoration-2 underline-offset-4 transition-all"
            >
              {post.title}
            </Link>
          </CardTitle>

          <p className="text-sm  italic text-muted-foreground line-clamp-2 leading-relaxed">
            {post.description}
          </p>

          <TagsDisplay tags={post.tags} />

          <div className="flex items-end justify-between mt-auto pt-4 border-t border-dashed border-border/40">
            <Link
              href={`/profile/${post.author.username}`}
              className="flex items-center gap-2 group/author min-w-0"
            >
              <Avatar className="w-7 h-7 flex-shrink-0 rounded-none border border-border group-hover/author:border-primary transition-colors grayscale group-hover/author:grayscale-0">
                <AvatarImage
                  src={post.author.profileImage ?? undefined}
                  className="object-cover transition-all"
                />
                <AvatarFallback className="text-[10px] bg-card rounded-none border border-border font-black text-foreground">
                  {post.author.name?.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <span className="text-xs  font-bold block truncate group-hover/author:text-primary transition-colors">
                  {post.author.name}
                </span>
                <span className="text-[9px]   text-muted-foreground block">
                  {timeAgo}
                </span>
              </div>
            </Link>

            <div className="flex items-center text-muted-foreground text-[10px]  gap-3 shrink-0">
              <span className="flex items-center gap-1.5" title="Views">
                <Eye className="h-3 w-3 opacity-70" />
                {formatCompactNumber(post.viewsCount)}
              </span>
              <span className="flex items-center gap-1.5" title="Comments">
                <MessageSquare className="h-3 w-3 opacity-70" />
                {formatCompactNumber(post.commentsCount)}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-3 border-t-3 border-double ">
          <Button
            variant="outline"
            className=" cursor-pointer mt-3 rounded-none w-full h-10 border-3 border-double font-bold group/btn transition-all  "
            onClick={() => router.push(href)}
          >
            {smartActionText}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md rounded-none border-[3px] border-double border-border bg-card">
          <CornerFlourish className="-top-1.5 -left-1.5 rotate-0" />
          <CornerFlourish className="-top-1.5 -right-1.5 rotate-90" />
          <CornerFlourish className="-bottom-1.5 -left-1.5 -rotate-90" />
          <CornerFlourish className="-bottom-1.5 -right-1.5 rotate-180" />

          <DialogHeader>
            <DialogTitle className="flex items-center gap-2  text-xl">
              <Share2 className="h-5 w-5 text-primary" /> Dispatch Record
            </DialogTitle>
            <DialogDescription className=" italic text-muted-foreground">
              Copy the designation link below to share this archival entry.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mt-4">
            <Input
              defaultValue={`${typeof window !== "undefined" ? window.location.origin : ""}${href}`}
              readOnly
              className="flex-1 h-10 text-xs  rounded-none border-dashed focus-visible:ring-primary/50"
            />
            <Button
              size="sm"
              className="px-4 h-10 rounded-none   font-black text-[10px]"
              onClick={handleShareAndCopy}
            >
              {linkCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
                </>
              )}
            </Button>
          </div>
          <DialogFooter className="sm:justify-start mt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-none   font-black text-[10px] border-dashed"
              >
                Close Ledger
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
