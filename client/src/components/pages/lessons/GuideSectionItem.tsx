//src/components/pages/lessons/GuideSectionItem.tsx
"use client";

import React, { useMemo } from "react";
import { GuideSectionDto } from "@/lib/features/guideSection/guideTypes";
import DOMPurify from "dompurify";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash } from "lucide-react";

interface GuideSectionItemProps {
  section: GuideSectionDto;
  isAuthor: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

/**
 * Robust helper function to create a valid embed URL for iframes.
 */
const getEmbedUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;

  try {
    const urlObject = new URL(url);
    let videoId: string | null = null;

    if (urlObject.hostname.includes("youtube.com")) {
      videoId = urlObject.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    } else if (urlObject.hostname.includes("youtu.be")) {
      videoId = urlObject.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    } else if (urlObject.hostname.includes("vimeo.com")) {
      videoId = urlObject.pathname.split("/").pop() ?? null;
      if (videoId) return `https://player.vimeo.com/video/${videoId}`;
    }

    return null;
  } catch (error) {
    console.error("Invalid URL provided for embedding:", error);
    return null;
  }
};

/**
 * Reusable Actions Component for consistency
 */
function SectionActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEdit}>
          <Edit className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash className="mr-2 h-4 w-4" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function GuideSectionItem({
  section,
  isAuthor,
  onEdit,
  onDelete,
}: GuideSectionItemProps) {
  const embedUrl = useMemo(
    () => getEmbedUrl(section.videoUrl),
    [section.videoUrl],
  );

  return (
    <div className="pl-6 border-l-2 border-dashed ml-6">
      <Card
        key={section.id}
        id={`section-${section.id}`}
        className="scroll-mt-24 mb-4 relative overflow-hidden"
      >
        {/* FIX: Remove the "Gap". 
          We only render CardHeader if there is an actual title.
        */}
        {section.title && (
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start gap-4">
              <CardTitle className="text-xl">{section.title}</CardTitle>
              {isAuthor && (
                <SectionActions onEdit={onEdit} onDelete={onDelete} />
              )}
            </div>
          </CardHeader>
        )}

        <CardContent
          className={`prose dark:prose-invert max-w-none space-y-4 ${!section.title ? "pt-6" : ""}`}
        >
          {/* FIX: If no title exists, we place the author menu absolutely 
            so it doesn't create a large empty header block.
          */}
          {!section.title && isAuthor && (
            <div className="absolute top-2 right-2 z-10">
              <SectionActions onEdit={onEdit} onDelete={onDelete} />
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(section.content),
            }}
          />

          {section.imageUrl && (
            <div className="relative aspect-video w-full rounded-lg border overflow-hidden not-prose">
              <Image
                src={section.imageUrl}
                alt={section.title || "Guide Section Image"}
                fill
                className="object-contain"
              />
            </div>
          )}

          {embedUrl && (
            <div className="relative aspect-video w-full not-prose">
              <iframe
                src={embedUrl}
                className="absolute top-0 left-0 w-full h-full rounded-lg border"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={section.title || "Embedded Video"}
              ></iframe>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
