"use client";

import React, { useState, useEffect } from "react";
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
  Plus,
  Image as ImageIcon,
} from "lucide-react";
import { PostDto } from "@/lib/features/post/postTypes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface GuideMobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostDto;
  activeStepId: string;
  onStepChange: (id: string) => void;
  isAuthor: boolean;
}

export default function GuideMobileSidebar({
  isOpen,
  onClose,
  post,
  activeStepId,
  onStepChange,
  isAuthor,
}: GuideMobileSidebarProps) {
  const [expandedStepIds, setExpandedStepIds] = useState<string[]>([
    activeStepId,
  ]);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  // 1. Sync: Keep active step expanded
  useEffect(() => {
    if (activeStepId !== "overview") {
      setExpandedStepIds((prev) =>
        prev.includes(activeStepId) ? prev : [...prev, activeStepId],
      );
    }
  }, [activeStepId]);

  // 2. Track: Highlight sections while scrolling
  useEffect(() => {
    if (activeStepId === "overview" || !isOpen) {
      setActiveSectionId(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    const currentStep = post.steps?.find((s) => s.id === activeStepId);
    currentStep?.sections?.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeStepId, post.steps, isOpen]);

  const toggleStepExpanded = (stepId: string) => {
    setExpandedStepIds((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId],
    );
    onStepChange(stepId);
  };

  const handleSectionNavigation = (stepId: string, sectionId: string) => {
    onClose();

    if (activeStepId !== stepId) {
      onStepChange(stepId);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setActiveSectionId(sectionId);
        }
      }, 350);
    } else {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          setActiveSectionId(sectionId);
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
        <div className="p-6 border-b border-double bg-background/50">
          <Link
            href="/guides"
            onClick={onClose}
            className="group flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-primary transition-colors mb-6 w-fit"
          >
            <ArrowLeft className="h-3 w-3 shrink-0 transition-transform group-hover:-translate-x-1" />
            Return to Guides
          </Link>

          <div className="space-y-1">
            <p className="text-xs font-bold text-primary">Field Guide</p>
            <h2 className="text-sm font-bold line-clamp-2 text-foreground/90">
              {post.title}
            </h2>
          </div>
        </div>

        {/* 2. CURRICULUM LIST */}
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-6">
            {/* INTRODUCTION */}
            <div className="space-y-2">
              <h3 className="px-3 text-xs font-bold text-muted-foreground/40">
                Introduction
              </h3>

              <Link
                href={`/guides/${post.id}`}
                onClick={() => {
                  onStepChange("overview");
                  onClose();
                }}
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
                <div className="text-xs font-bold">Guide Overview & Goals</div>
              </Link>
            </div>

            {/* PLOT PROGRESS */}
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
                    onClick={onClose}
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
                        <Link
                          href={`/guides/${post.id}`}
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
                              "h-3 w-3 shrink-0 transition-transform duration-300 text-muted-foreground/40",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </Link>

                        {isExpanded && (
                          <div className="ml-7 pl-6 border-l-2 border-dashed border-border/40 py-2 space-y-3 animate-in fade-in slide-in-from-top-1 duration-300">
                            {step.sections && step.sections.length > 0 ? (
                              step.sections.map((section: any) => {
                                const isSectionActive =
                                  activeSectionId === section.id;
                                return (
                                  <button
                                    key={section.id}
                                    onClick={() =>
                                      handleSectionNavigation(
                                        step.id,
                                        section.id,
                                      )
                                    }
                                    className={cn(
                                      "flex items-center gap-2 transition-all cursor-pointer w-full text-left bg-transparent border-none p-1 rounded-sm",
                                      isSectionActive
                                        ? "text-primary font-bold bg-primary/5"
                                        : "text-muted-foreground/60 hover:text-primary",
                                    )}
                                  >
                                    {section.videoUrl ? (
                                      <PlayCircle
                                        className={cn(
                                          "h-3 w-3 shrink-0",
                                          isSectionActive && "fill-primary/10",
                                        )}
                                      />
                                    ) : section.imageUrl ? (
                                      <ImageIcon className="h-3 w-3 shrink-0" />
                                    ) : (
                                      <FileText className="h-3 w-3 shrink-0" />
                                    )}
                                    <span className="text-xs truncate">
                                      {section.title || "Untitled Section"}
                                    </span>
                                  </button>
                                );
                              })
                            ) : (
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

        {/* 3. FOOTER */}
        <div className="p-6 border-t border-double border-border/80 bg-background/50 mt-auto">
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
