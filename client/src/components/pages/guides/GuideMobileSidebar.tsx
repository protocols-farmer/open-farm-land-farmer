"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Sprout,
  ChevronDown,
  ArrowLeft,
  FileText,
  PlayCircle,
  Image as ImageIcon,
} from "lucide-react";
import { PostDto } from "@/lib/features/post/postTypes";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface GuideMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostDto;
  activeStepId: string;
  onStepChange: (id: string) => void;
}

export default function GuideMobileSidebar({
  isOpen,
  onClose,
  post,
  activeStepId,
  onStepChange,
}: GuideMobileSidebarProps) {
  const [expandedStepIds, setExpandedStepIds] = useState<string[]>([
    activeStepId,
  ]);

  const toggleStepExpanded = (stepId: string) => {
    setExpandedStepIds((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId],
    );
    onStepChange(stepId);
  };

  // Fixed: Navigate to step first if it's not active, then scroll
  const handleSectionNavigation = (stepId: string, sectionId: string) => {
    onClose(); // Close mobile menu first for better UX

    if (activeStepId !== stepId) {
      onStepChange(stepId);
      // Wait for Sheet to close and the new step's DOM to render
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 350);
    } else {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="p-0 w-[85%] max-w-sm bg-card border-r-3 border-double border-border flex flex-col focus:ring-0"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>{post.title} Navigation</SheetTitle>
          <SheetDescription>
            Mobile curriculum navigator for {post.title}
          </SheetDescription>
        </SheetHeader>

        {/* 1. HEADER */}
        <div className="p-6 border-b-3 border-double border-border bg-muted/20">
          <Link
            href="/guides"
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 shrink-0 transition-transform group-hover:-translate-x-1" />
            Back to guides
          </Link>

          <div className="space-y-1">
            <p className="text-xs font-bold text-primary">Field Guide</p>
            <h2 className="text-sm font-bold line-clamp-2 text-foreground pr-6">
              {post.title}
            </h2>
          </div>
        </div>

        {/* 2. CURRICULUM LIST */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-8">
            {/* INTRODUCTION */}
            <div className="space-y-3">
              <h3 className="px-3 text-xs font-bold text-muted-foreground/50">
                Introduction
              </h3>

              <button
                onClick={() => {
                  onStepChange("overview");
                  onClose();
                }}
                className={cn(
                  "group/navlink relative w-full flex items-center gap-3 px-3 py-3 text-left transition-all border-3 border-double",
                  activeStepId === "overview"
                    ? "bg-primary/5 border-primary/40 text-primary shadow-sm"
                    : "bg-transparent border-transparent text-muted-foreground hover:bg-muted",
                )}
              >
                <div
                  className={cn(
                    "absolute left-[-3px] h-0 w-1 bg-primary transition-all duration-300 rounded-full",
                    activeStepId === "overview"
                      ? "h-6"
                      : "group-hover/navlink:h-4",
                  )}
                />
                <div
                  className={cn(
                    "h-8 w-8 flex items-center justify-center border-3 border-double shrink-0",
                    activeStepId === "overview"
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-muted/50",
                  )}
                >
                  <Sprout className="h-4 w-4" />
                </div>
                <div className="text-xs font-bold">Guide Overview</div>
              </button>
            </div>

            {/* PLOT PROGRESS */}
            <div className="space-y-4">
              <h3 className="px-3 text-xs font-bold text-muted-foreground/50">
                Curriculum Steps
              </h3>
              <div className="space-y-2">
                {post.steps?.map((step, index) => {
                  const isActive = activeStepId === step.id;
                  const isExpanded = expandedStepIds.includes(step.id);

                  return (
                    <div key={step.id} className="space-y-1">
                      <button
                        onClick={() => toggleStepExpanded(step.id)}
                        className={cn(
                          "group/navlink relative w-full flex items-center gap-3 px-3 py-3 text-left transition-all border-3 border-double",
                          isActive
                            ? "bg-card border-primary/40 text-foreground shadow-md"
                            : "bg-transparent border-transparent text-muted-foreground hover:bg-muted",
                        )}
                      >
                        <div
                          className={cn(
                            "absolute left-[-3px] h-0 w-1 bg-primary transition-all duration-300 rounded-full",
                            isActive ? "h-6" : "group-hover/navlink:h-4",
                          )}
                        />
                        <div
                          className={cn(
                            "h-8 w-8 flex-shrink-0 flex items-center justify-center border-3 border-double font-bold text-xs",
                            isActive
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-muted/30",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                          <span
                            className={cn(
                              "block text-xs transition-all line-clamp-2",
                              isActive ? "font-bold" : "font-semibold",
                            )}
                          >
                            {step.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-300 text-muted-foreground/40",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>

                      {/* Dropdown Sections */}
                      {isExpanded && (
                        <div className="ml-7 pl-6 border-l-2 border-dashed border-border py-3 space-y-4 animate-in fade-in slide-in-from-top-1 pr-2">
                          {step.sections && step.sections.length > 0 ? (
                            step.sections.map((section: any) => (
                              <button
                                key={section.id}
                                onClick={() =>
                                  handleSectionNavigation(step.id, section.id)
                                }
                                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors w-full text-left bg-transparent border-none p-0"
                              >
                                {section.videoUrl ? (
                                  <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                                ) : section.imageUrl ? (
                                  <ImageIcon className="h-4 w-4 shrink-0" />
                                ) : (
                                  <FileText className="h-4 w-4 shrink-0" />
                                )}
                                <span className="text-xs font-semibold truncate">
                                  {section.title || "Untitled Section"}
                                </span>
                              </button>
                            ))
                          ) : (
                            <p className="text-[10px] font-medium text-muted-foreground/30 italic">
                              No sections added yet
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>

        {/* 3. FOOTER */}
        <div className="p-6 border-t-3 border-double border-border bg-muted/20 mt-auto">
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-xs font-bold text-muted-foreground/60">
                Completion
              </span>
              <span className="text-xs font-bold text-primary">
                {post.steps && post.steps.length > 0
                  ? Math.round(
                      ((post.steps.findIndex((s) => s.id === activeStepId) +
                        1) /
                        post.steps.length) *
                        100,
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="h-2 w-full bg-muted border border-border/40 overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-1000 ease-in-out"
                style={{
                  width: `${
                    post.steps && post.steps.length > 0
                      ? ((post.steps.findIndex((s) => s.id === activeStepId) +
                          1) /
                          post.steps.length) *
                        100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
