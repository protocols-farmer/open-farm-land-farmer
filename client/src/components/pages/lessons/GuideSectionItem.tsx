// FILE: src/components/pages/guides/GuideSectionItem.tsx

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
 * --- FIX: A robust helper function to create a valid embed URL ---
 * This function takes a standard video URL and converts it into the
 * correct format needed for embedding in an iframe.
 * @param url The original video URL from YouTube, etc.
 * @returns A valid embed URL or null if the URL is not recognized.
 */
const getEmbedUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;

  try {
    const urlObject = new URL(url);
    let videoId: string | null = null;

    // Handle standard YouTube URLs (e.g., youtube.com/watch?v=...)
    if (urlObject.hostname.includes("youtube.com")) {
      videoId = urlObject.searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    // Handle short YouTube URLs (e.g., youtu.be/...)
    else if (urlObject.hostname.includes("youtu.be")) {
      videoId = urlObject.pathname.slice(1);
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    }
    // --- IMPROVEMENT: Added support for Vimeo ---
    else if (urlObject.hostname.includes("vimeo.com")) {
      // --- FIX: Handle the case where .pop() might return undefined ---
      videoId = urlObject.pathname.split("/").pop() ?? null;
      if (videoId) return `https://player.vimeo.com/video/${videoId}`;
    }

    // For platforms like Facebook, Instagram, and X, a simple URL transformation
    // is not possible. They require their own SDKs or specific embed widgets.
    // You would need to build separate components to handle those.

    return null; // Return null if the platform is not supported
  } catch (error) {
    // This will catch invalid URLs that can't be parsed
    console.error("Invalid URL provided for embedding:", error);
    return null;
  }
};

export function GuideSectionItem({
  section,
  isAuthor,
  onEdit,
  onDelete,
}: GuideSectionItemProps) {
  // Use the new helper function to get a safe, embeddable URL
  const embedUrl = useMemo(
    () => getEmbedUrl(section.videoUrl),
    [section.videoUrl]
  );

  return (
    <div className="pl-6 border-l-2 border-dashed ml-6">
      <Card
        key={section.id}
        id={`section-${section.id}`}
        className="scroll-mt-24 mb-4"
      >
        {(section.title || isAuthor) && (
          <CardHeader>
            <div className="flex justify-between items-start gap-4">
              {section.title && (
                <CardTitle className="text-xl">{section.title}</CardTitle>
              )}
              {isAuthor && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0 ml-auto"
                    >
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
              )}
            </div>
          </CardHeader>
        )}
        <CardContent className="prose dark:prose-invert max-w-none space-y-4">
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
          {/* --- FIX: Use the sanitized embedUrl and add allow attributes --- */}
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
