//src/components/pages/guides/GuideSectionItem.tsx
"use client";

import React, { useMemo, useState } from "react";
import { GuideSectionDto } from "@/lib/features/guideSection/guideTypes";
import NextImage from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MoreHorizontal,
  Edit,
  Trash,
  PlayCircle,
  Image as ImageIcon,
} from "lucide-react";
import TiptapRenderer from "../posts/TiptapRenderer";
import { cn } from "@/lib/utils";

interface GuideSectionItemProps {
  section: GuideSectionDto;
  index: number;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const getEmbedUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  try {
    const urlObject = new URL(url);
    const id = urlObject.searchParams.get("v") || urlObject.pathname.slice(1);
    return `https://www.youtube.com/embed/${id}`;
  } catch {
    return null;
  }
};

export function GuideSectionItem({
  section,
  index,
  isAuthor,
  onEdit,
  onDelete,
}: GuideSectionItemProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const embedUrl = useMemo(
    () => getEmbedUrl(section.videoUrl),
    [section.videoUrl],
  );

  return (
    <div
      id={section.id}
      className="group relative border-3 border-double bg-card p-6 md:p-8 space-y-6 scroll-mt-28 transition-colors hover:border-primary/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold text-muted-foreground">
            Section {String(index + 1).padStart(2, "0")}
          </div>
          {section.title && (
            <h3 className="text-xl font-bold text-foreground">
              {section.title}
            </h3>
          )}
        </div>

        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-none border-2 border-double opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-none border-3 border-double"
            >
              <DropdownMenuItem
                onClick={onEdit}
                className="font-bold text-xs cursor-pointer"
              >
                <Edit className="mr-2 h-3.5 w-3.5" /> Edit section
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onDelete}
                className="font-bold text-xs text-destructive cursor-pointer"
              >
                <Trash className="mr-2 h-3.5 w-3.5" /> Delete section
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <TiptapRenderer content={section.content} />
      </div>

      {/* --- MEDIA: IMAGE --- */}
      {section.imageUrl && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <ImageIcon className="h-4 w-4" /> Technical illustration
          </div>
          <div className="relative aspect-video w-full border-3 border-double bg-muted overflow-hidden">
            {imageLoading && (
              <Skeleton className="absolute inset-0 z-10 rounded-none" />
            )}
            {!imageError ? (
              <NextImage
                src={section.imageUrl}
                alt={section.title || "Section illustration"}
                fill
                className={cn(
                  "object-cover transition-opacity duration-500",
                  imageLoading ? "opacity-0" : "opacity-100",
                )}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                Illustration unavailable
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- MEDIA: VIDEO --- */}
      {embedUrl && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
            <PlayCircle className="h-4 w-4" /> Video demonstration
          </div>
          <div className="relative aspect-video w-full border-3 border-double bg-muted shadow-inner">
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              title="Video content"
            />
          </div>
        </div>
      )}
    </div>
  );
}
