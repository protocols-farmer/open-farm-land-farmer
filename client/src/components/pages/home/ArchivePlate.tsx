"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArchivePlateProps {
  href: string;
  title: string;
  description: string;
  /** Text explaining what to post, acts as the archival notes/instructions */
  guideText?: string;
  image: string;
  icon: React.ElementType;
  isReversed?: boolean;
}

export default function ArchivePlate({
  href,
  title,
  description,
  guideText,
  image,
  icon: Icon,
  isReversed = false,
}: ArchivePlateProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full my-12 transition-all duration-700"
    >
      {/* 📜 VINTAGE FRAME BACKGROUND & BORDERS */}
      <div className="absolute inset-0 bg-card/30 transition-colors duration-500 group-hover:bg-primary/[0.04]" />

      {/* Outer Thick Double Border */}
      <div className="absolute inset-0 border-[6px] border-double border-primary/30 transition-colors duration-500 group-hover:border-primary/50 pointer-events-none" />

      {/* Inner Thin Border */}
      <div className="absolute inset-3 border border-primary/20 pointer-events-none" />

      {/* Top Center Ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-primary/60 group-hover:text-primary transition-colors duration-500 z-10">
        <span className="text-2xl font-serif">⚜</span>
      </div>

      {/* Bottom Center Ornament */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background px-4 text-primary/60 group-hover:text-primary transition-colors duration-500 z-10">
        <span className="text-2xl font-serif">⚜</span>
      </div>

      {/* Ornate Corner Brackets */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-[3px] border-l-[3px] border-primary/50 pointer-events-none" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-[3px] border-r-[3px] border-primary/50 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-[3px] border-l-[3px] border-primary/50 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-[3px] border-r-[3px] border-primary/50 pointer-events-none" />

      {/* 📜 CONTENT LAYOUT */}
      <div
        className={cn(
          "relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 md:gap-16",
          isReversed && "md:flex-row-reverse",
        )}
      >
        {/* SIDE A: Title & Description */}
        <div
          className={cn(
            "w-full md:w-1/2 flex flex-col justify-center space-y-6",
            isReversed ? "md:text-right" : "text-left",
          )}
        >
          {/* Header */}
          <div
            className={cn(
              "flex items-center gap-4 border-b border-primary/20 pb-4",
              isReversed && "flex-row-reverse",
            )}
          >
            <div className="p-3 bg-primary/10 border border-primary/30 shadow-sm rounded-sm">
              <Icon className="h-7 w-7 text-primary drop-shadow-sm" />
            </div>
            <h2 className="font-mobalys text-4xl md:text-5xl text-foreground tracking-tight group-hover:text-primary transition-colors">
              {title}
            </h2>
          </div>

          {/* Short Text */}
          <div className="relative">
            <p
              className={cn(
                "text-muted-foreground leading-relaxed italic text-lg font-medium py-2",
                isReversed
                  ? "pr-4 border-r-2 border-primary/30"
                  : "pl-4 border-l-2 border-primary/30",
              )}
            >
              {description}
            </p>
          </div>

          {/* Call to action */}
          <div
            className={cn(
              "flex items-center gap-3 pt-4 opacity-70 group-hover:opacity-100 transition-opacity",
              isReversed && "justify-end",
            )}
          >
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Access Entry
            </span>
            <ArrowUpRight className="h-5 w-5 text-primary" />
          </div>
        </div>

        {/* SIDE B: Specimen Image & Guide Text */}
        <div className="w-full md:w-1/2 space-y-6 relative">
          {/* The Photograph */}
          <div className="relative aspect-[4/3] w-full overflow-hidden border-[4px] border-background shadow-2xl ring-1 ring-primary/20">
            {/* Vintage Photo Filter Overlay */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none" />

            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 filter sepia-[0.3] contrast-[1.15] brightness-[0.9]"
            />

            {/* Archival Stamp */}
            <div
              className={cn(
                "absolute top-4 bg-background/90 backdrop-blur-sm border border-primary/30 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-primary shadow-sm z-20",
                isReversed ? "right-4" : "left-4",
              )}
            >
              FIG. {title.substring(0, 2).toUpperCase()} // VOL. I
            </div>
          </div>

          {/* The Explanatory Text ("What to post") */}
          {guideText && (
            <div className="relative bg-primary/5 border border-primary/20 p-5 shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="h-4 w-4 text-primary/70" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-primary/70">
                  Curator's Notes
                </h3>
              </div>
              <p className="text-sm text-foreground/80 font-mono leading-relaxed">
                {guideText}
              </p>
              {/* Decorative pin holes */}
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-background border border-primary/40 shadow-inner" />
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-background border border-primary/40 shadow-inner" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
