//src/components/shared/ActionButtons.tsx
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { PostDto } from "@/lib/features/post/postTypes";
import { useAuthAction } from "@/lib/hooks/useAuthAction";
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useSavePostMutation,
  useUnsavePostMutation,
  useSharePostMutation,
} from "@/lib/features/post/postApiSlice";
import { Button } from "@/components/ui/button";
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
import { Heart, Bookmark, Share2, Loader2, Copy, Check } from "lucide-react";

import { cn, formatCompactNumber } from "@/lib/utils";
import { CornerFlourish, FlourishOrnate, SideFlourish } from "./Ornates";

export default function ActionButtons({ post }: { post: PostDto }) {
  const handleAuthAction = useAuthAction();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // --- Mutations ---
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [unlikePost, { isLoading: isUnliking }] = useUnlikePostMutation();
  const [savePost, { isLoading: isSaving }] = useSavePostMutation();
  const [unsavePost, { isLoading: isUnsaving }] = useUnsavePostMutation();
  const [sharePost, { isLoading: isSharing }] = useSharePostMutation();

  const isLikePending = isLiking || isUnliking;
  const isSavePending = isSaving || isUnsaving;

  // --- Handlers ---
  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAuthAction(async () => {
      if (isLikePending) return;
      try {
        if (post.isLikedByCurrentUser) await unlikePost(post.id).unwrap();
        else await likePost(post.id).unwrap();
      } catch (err) {
        toast.error("Failed to update like status.");
      }
    }, "like");
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleAuthAction(async () => {
      if (isSavePending) return;
      try {
        if (post.isSavedByCurrentUser) await unsavePost(post.id).unwrap();
        else await savePost(post.id).unwrap();
      } catch (err) {
        toast.error("Failed to update save status.");
      }
    }, "save");
  };

  const handleShareAndCopy = async () => {
    const postUrl = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(postUrl);
      setLinkCopied(true);
      if (!isSharing)
        await sharePost({ postId: post.id, platform: "LINK_COPIED" }).unwrap();
      setTimeout(() => {
        setShowShareDialog(false);
        setLinkCopied(false);
      }, 1500);
    } catch (err) {
      toast.error("Could not copy link.");
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="grid grid-cols-3 w-full items-center justify-around rounded-none border-[3px] border-double border-border/80 bg-muted/20 p-1 gap-1">
        {/* LIKE */}
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "h-12 gap-3 rounded-none hover:bg-transparent hover:text-destructive w-full transition-all duration-300",
            post.isLikedByCurrentUser && "text-destructive bg-destructive/5",
          )}
          onClick={handleToggleLike}
          disabled={isLikePending}
        >
          {isLikePending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Heart
              className={cn(
                "h-5 w-5 transition-all",
                post.isLikedByCurrentUser && "fill-current scale-110",
              )}
            />
          )}
          <span className="text-xs font-bold">
            {formatCompactNumber(post.likesCount)}
          </span>
        </Button>

        {/* SAVE */}
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "h-12  gap-3 rounded-none hover:bg-transparent hover:text-primary w-full transition-all duration-300",
            post.isSavedByCurrentUser && "text-primary bg-primary/5",
          )}
          onClick={handleToggleSave}
          disabled={isSavePending}
        >
          {isSavePending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Bookmark
              className={cn(
                "h-5 w-5 transition-all",
                post.isSavedByCurrentUser && "fill-current scale-110",
              )}
            />
          )}
          <span className="text-xs font-bold">
            {formatCompactNumber(post.savedCount)}
          </span>
        </Button>

        {/* SHARE */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="h-12  gap-3 rounded-none hover:bg-transparent hover:text-primary w-full transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleAuthAction(() => {
                  setLinkCopied(false);
                  setShowShareDialog(true);
                }, "share");
              }}
            >
              <Share2 className="h-5 w-5" />
              <span className="text-xs font-bold">
                {formatCompactNumber(post.sharesCount)}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="rounded-none border-dashed">
            Dispatch Link
          </TooltipContent>
        </Tooltip>
      </div>

      {/* SHARE DIALOG */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md rounded-none border-3 border-double border-border bg-card">
          <CornerFlourish className="-top-1 -left-1 rotate-0 z-20" />
          <CornerFlourish className="-top-1 -right-1 rotate-90 z-20" />
          <CornerFlourish className="-bottom-1 -left-1 -rotate-90 z-20" />
          <CornerFlourish className="-bottom-1 -right-1 rotate-180 z-20" />

          <FlourishOrnate className="-top-2 -left-2 -rotate-90 z-20" />
          <FlourishOrnate className="-top-2 -right-2 rotate-0 z-20" />
          <FlourishOrnate className="-bottom-2 -right-2 rotate-90 z-20" />
          <FlourishOrnate className="-bottom-2 -left-2 rotate-180 z-20" />

          <SideFlourish className="-top-2 left-1/2 -translate-x-1/2 bg-card px-2 z-20" />
          <SideFlourish className="-bottom-2 left-1/2 -translate-x-1/2 rotate-180 bg-card px-2 z-20" />
          <SideFlourish className="-left-[14px] top-1/2 -translate-y-1/2 -rotate-90 bg-card px-2 z-20" />
          <SideFlourish className="-right-[14px] top-1/2 -translate-y-1/2 rotate-90 bg-card px-2 z-20" />

          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-black text-xl">
              <Share2 className="text-primary h-5 w-5" /> Share Post
            </DialogTitle>
            <DialogDescription className="italic">
              Copy the designation link below to share the post.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 mt-4">
            <Input
              value={typeof window !== "undefined" ? window.location.href : ""}
              readOnly
              className="flex-1 h-10 text-xs rounded-none border-dashed focus-visible:ring-primary/50"
            />
            <Button
              size="sm"
              className="px-4 h-10 rounded-none font-black "
              onClick={handleShareAndCopy}
              disabled={isSharing}
            >
              {linkCopied ? (
                <span className="flex items-center gap-1 text-background">
                  <Check className="h-3.5 w-3.5 mr-1.5" /> Copied
                </span>
              ) : (
                <span className="flex items-center gap-1 text-background">
                  <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
                </span>
              )}
            </Button>
          </div>

          <DialogFooter className="sm:justify-start mt-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-none font-bold  border-dashed"
              >
                Close Dialog
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}
