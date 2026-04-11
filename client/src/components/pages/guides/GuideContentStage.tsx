//src/components/pages/guides/GuideContentStage.tsx
"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PostDto } from "@/lib/features/post/postTypes";

interface GuideContentStageProps {
  post: PostDto;
  title: string;
  isOverview?: boolean;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export default function GuideContentStage({
  post,
  title,
  isOverview = false,
  actions,
  children,
}: GuideContentStageProps) {
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="mx-auto w-full space-y-7">
      {/* --- HEADER SECTION --- */}
      <header className="bg-card space-y-6 animate-in fade-in slide-in-from-top-3 duration-700 border-3 border-double p-6 relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="rounded-none font-bold px-3">
              {post.category}
            </Badge>
            <span className="flex items-center font-semibold text-xs text-muted-foreground">
              <Calendar className="mr-1.5 h-3.5 w-3.5" />
              Published {timeAgo}
            </span>

            {!isOverview && (
              <>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30" />
                <div className="flex items-center text-xs font-bold text-primary">
                  <Clock className="mr-1.5 h-3.5 w-3.5" />
                  Active Segment
                </div>
              </>
            )}
          </div>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>

        {/* --- TITLE --- */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight wrap-break-words leading-tight">
          {title}
        </h1>

        {/* --- AUTHOR FOOTER (Overview only) --- */}
        {isOverview && (
          <div className="flex items-center justify-between py-2 border-t-3 border-double pt-5">
            <Link
              href={`/profile/${post.author.username}`}
              className="flex items-center gap-3 group"
            >
              <Avatar className="h-10 w-10 border-3 border-double rounded-none transition-transform group-hover:scale-105">
                <AvatarImage src={post.author.profileImage ?? undefined} />
                <AvatarFallback className="font-bold bg-muted text-xs">
                  {post.author.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold group-hover:text-primary transition-colors">
                  {post.author.name}
                </p>
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  @{post.author.username}
                </p>
              </div>
            </Link>
          </div>
        )}
      </header>

      {/* --- CONTENT CONTAINER --- */}
      <div
        className={cn(
          "shadow-xl transition-all duration-500 border-3 border-double bg-card",
          "p-6 md:p-10 lg:p-12",
          "min-h-75",
        )}
      >
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {children}
        </div>
      </div>

      {/* --- SEGMENT FOOTER --- */}
      {!isOverview && (
        <div className="flex justify-center w-full bg-card h-12 items-center border-3 border-double shadow-sm">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            End of Segment
          </p>
        </div>
      )}
    </div>
  );
}
