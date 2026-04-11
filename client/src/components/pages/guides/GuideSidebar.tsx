//src/components/pages/guides/GuideSidebar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sprout,
  Plus,
  ChevronDown,
  ArrowLeft,
  FileText,
  PlayCircle,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PostDto } from "@/lib/features/post/postTypes";
import { Button } from "@/components/ui/button";

interface GuideSidebarProps {
  post: PostDto;
  activeStepId: string;
  onStepChange: (id: string) => void;
  isAuthor: boolean;
  onAddStep: () => void;
}

export default function GuideSidebar({
  post,
  activeStepId,
  onStepChange,
  isAuthor,
  onAddStep,
}: GuideSidebarProps) {
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
    if (activeStepId !== stepId) {
      onStepChange(stepId);
      // Wait for the new step's DOM to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-sidebar/40 backdrop-blur-sm w-full group/sidebar">
      {/* 1. HEADER */}
      <div className="p-6 border-b border-double  bg-background/50">
        <div className="space-y-1">
          <p className="text-xs font-bold text-primary">Field Guide</p>
          <h2 className="text-sm font-bold line-clamp-2 text-foreground/90">
            {post.title}
          </h2>
        </div>
      </div>

      {/* 2. CURRICULUM LIST */}
      <div
        className={cn(
          "flex-1 overflow-y-auto py-4 px-3",
          "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-transparent",
          "group-hover/sidebar:[&::-webkit-scrollbar-thumb]:bg-primary/20 hover:[&::-webkit-scrollbar-thumb]:bg-primary/40 transition-colors",
        )}
      >
        <nav className="space-y-6">
          <div className="space-y-2">
            <h3 className="px-3 text-xs font-bold text-muted-foreground/40">
              Introduction
            </h3>
            <button
              onClick={() => onStepChange("overview")}
              className={cn(
                "group/navlink relative w-full flex items-center gap-3 px-3 py-3 text-left transition-all border-3 border-double",
                activeStepId === "overview"
                  ? "bg-primary/10 border-primary/30 text-primary shadow-sm"
                  : "bg-transparent border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
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
                  "h-8 w-8 flex items-center justify-center border-3 border-double transition-colors shrink-0",
                  activeStepId === "overview"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted/50",
                )}
              >
                <Sprout className="h-4 w-4 shrink-0" />
              </div>
              <div className="text-xs font-bold line-clamp-2">
                Guide Overview & Goals
              </div>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-3 px-3">
              <h3 className="text-xs font-bold text-muted-foreground/40">
                Plot Progress
              </h3>
              {isAuthor && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-none border-dashed w-full h-8 flex items-center justify-center gap-2 font-bold text-xs"
                >
                  <Link href={`/guides/${post.id}/steps/create`}>
                    <Plus className="h-3 w-3 shrink-0" />
                    Add Step
                  </Link>
                </Button>
              )}
            </div>

            <div className="space-y-1">
              {post.steps && post.steps.length > 0 ? (
                post.steps.map((step, index) => {
                  const isActive = activeStepId === step.id;
                  const isExpanded = expandedStepIds.includes(step.id);

                  return (
                    <div key={step.id} className="space-y-1">
                      <button
                        onClick={() => toggleStepExpanded(step.id)}
                        className={cn(
                          "group/navlink relative w-full flex items-center gap-3 px-3 py-3 text-left transition-all border-3 border-double",
                          isActive
                            ? "bg-card border-primary/40 text-foreground shadow-md translate-x-1"
                            : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
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
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-muted/30",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="flex-1 min-w-0">
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
                            "h-3 w-3 shrink-0 transition-transform duration-300 text-muted-foreground/40 group-hover/navlink:text-primary",
                            isExpanded && "rotate-180",
                          )}
                        />
                      </button>

                      {isExpanded && (
                        <div className="ml-7 pl-6 border-l-2 border-dashed border-border/40 py-2 space-y-3 animate-in fade-in slide-in-from-top-1 duration-300">
                          {step.sections && step.sections.length > 0 ? (
                            step.sections.map((section: any) => (
                              <button
                                key={section.id}
                                onClick={() =>
                                  handleSectionNavigation(step.id, section.id)
                                }
                                className="flex items-center gap-2 text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer w-full text-left bg-transparent border-none p-0"
                              >
                                {section.videoUrl ? (
                                  <PlayCircle className="h-3 w-3 shrink-0 text-primary" />
                                ) : section.imageUrl ? (
                                  <ImageIcon className="h-3 w-3 shrink-0" />
                                ) : (
                                  <FileText className="h-3 w-3 shrink-0" />
                                )}

                                <span className="text-xs font-semibold truncate">
                                  {section.title || "Untitled Section"}
                                </span>
                              </button>
                            ))
                          ) : (
                            // Fix 1: Professional placeholder for empty steps
                            <p className="text-[10px] font-medium text-muted-foreground/30 italic">
                              No sections added yet
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center border-2 border-dashed border-border/30 mx-3">
                  <Sprout className="h-6 w-6 mx-auto text-muted-foreground/20 mb-2 shrink-0" />
                  <p className="text-xs font-bold text-muted-foreground/40">
                    No steps added yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* 3. FOOTER / PROGRESS */}
      <div className="p-6 border-t border-double border-border/80 bg-background/50 mt-auto">
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-muted-foreground/60">
              Completion
            </span>
            <span className="text-xs font-bold text-primary">
              {post.steps && post.steps.length > 0
                ? Math.round(
                    ((post.steps.findIndex((s) => s.id === activeStepId) + 1) /
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
    </div>
  );
}
