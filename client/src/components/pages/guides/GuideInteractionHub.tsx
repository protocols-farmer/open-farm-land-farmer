//src/components/pages/guides/GuideInteractionHub.tsx
"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Heart,
  Bookmark,
  Share2,
  Copy,
  Check,
  Loader2,
  MessageSquare,
  Eye,
} from "lucide-react";
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
import { cn, formatCompactNumber } from "@/lib/utils";
import { CornerFlourish } from "@/components/shared/Ornates";

interface GuideInteractionHubProps {
  post: PostDto;
}

export default function GuideInteractionHub({
  post,
}: GuideInteractionHubProps) {
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
        setLinkCopied(false);
        setShowShareDialog(false);
      }, 1500);
    } catch (err) {
      toast.error("Could not copy link.");
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="bg-card p-3 flex items-center justify-between  border-3 border-double  ">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 text-xs font-black   text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            <span>{formatCompactNumber(post.viewsCount)} Views</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-black   text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{formatCompactNumber(post.commentsCount)} Comments</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-none border transition-all",
                  post.isLikedByCurrentUser
                    ? "border-destructive/20 bg-destructive/5 text-destructive"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-muted",
                )}
                onClick={handleToggleLike}
                disabled={isLikePending}
              >
                {isLikePending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      post.isLikedByCurrentUser && "fill-current",
                    )}
                  />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-[10px] font-bold  ">
              Endorse Field Work
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-9 w-9 rounded-none border transition-all",
                  post.isSavedByCurrentUser
                    ? "border-primary/20 bg-primary/5 text-primary"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-muted",
                )}
                onClick={handleToggleSave}
                disabled={isSavePending}
              >
                {isSavePending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Bookmark
                    className={cn(
                      "h-4 w-4",
                      post.isSavedByCurrentUser && "fill-current",
                    )}
                  />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-[10px] font-bold  ">
              Archive to Ledger
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-none border border-transparent text-muted-foreground hover:border-border hover:bg-muted transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAuthAction(() => setShowShareDialog(true), "share");
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="text-[10px] font-bold  ">
              Dispatch Coordinates
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* SHARE DIALOG (Specialized for Guides) */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md rounded-none border-[3px] border-double border-border bg-card p-8">
          <CornerFlourish className="-top-1.5 -left-1.5 rotate-0" />
          <CornerFlourish className="-top-1.5 -right-1.5 rotate-90" />
          <CornerFlourish className="-bottom-1.5 -left-1.5 -rotate-90" />
          <CornerFlourish className="-bottom-1.5 -right-1.5 rotate-180" />

          <DialogHeader className="space-y-3">
            <DialogTitle className="font-black text-3xl  ">
              Share Guide
            </DialogTitle>
            <DialogDescription className="  text-muted-foreground">
              Share this guide with fellow cultivators by copying the link
              below.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2 mt-6">
            <Input
              value={typeof window !== "undefined" ? window.location.href : ""}
              readOnly
              className="flex-1 h-11 text-xs rounded-none border-dashed border-2 bg-muted/30 focus-visible:ring-primary/40"
            />
            <Button
              className="px-6 h-11 rounded-none font-black text-[10px]  "
              onClick={handleShareAndCopy}
              disabled={isSharing}
            >
              {linkCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-2" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-2" /> Copy
                </>
              )}
            </Button>
          </div>

          <DialogFooter className="sm:justify-start mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                className=" rounded-none text-xs font-bold "
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
