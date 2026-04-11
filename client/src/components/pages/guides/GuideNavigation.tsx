//src/components/pages/guides/GuideNavigation.tsx
"use client";

import React, { useMemo } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Home,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GuideStepDto } from "@/lib/features/guideSection/guideTypes";

interface GuideNavigationProps {
  steps: GuideStepDto[];
  activeStepId: string;
  onNavigate: (id: string) => void;
}

export default function GuideNavigation({
  steps,
  activeStepId,
  onNavigate,
}: GuideNavigationProps) {
  const currentIndex = useMemo(
    () => steps.findIndex((s) => s.id === activeStepId),
    [steps, activeStepId],
  );

  const hasSteps = steps.length > 0;
  const nextStep = steps[currentIndex + 1];
  const prevStep = steps[currentIndex - 1];

  const isOverview = activeStepId === "overview";
  const isLastStep = currentIndex === steps.length - 1;

  // Primary action: Advance or Return
  const handlePrimaryAction = () => {
    if (isOverview) {
      if (hasSteps) onNavigate(steps[0].id);
    } else if (nextStep) {
      onNavigate(nextStep.id);
    } else {
      onNavigate("overview");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
      <div className="border-3 border-double bg-card p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Status Info */}
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 border-3 border-double flex items-center justify-center shrink-0 bg-primary/5">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-foreground">
              {isOverview
                ? "Introduction complete"
                : isLastStep
                  ? "Final step reached"
                  : `Step ${currentIndex + 1} finalized`}
            </h3>
            <p className="text-xs text-muted-foreground font-medium leading-tight">
              {isOverview
                ? hasSteps
                  ? "Ready to begin the first segment."
                  : "No additional steps available."
                : isLastStep
                  ? "You have reached the end of this guide."
                  : "Proceed to the next technical segment."}
            </p>
          </div>
        </div>

        {/* Unified Action Group */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
          {/* Secondary: Previous Step */}
          {!isOverview && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate(prevStep?.id || "overview")}
              className="rounded-none font-bold text-xs border-3 border-double h-10 px-5"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Previous
            </Button>
          )}

          {/* Secondary: Jump to Discussions (Only on last step) */}
          {isLastStep && !isOverview && (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                document
                  .getElementById("discussions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-none font-bold text-xs border-3 border-double h-10 px-5"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Join Discussion
            </Button>
          )}

          {/* Primary Action: Start / Next / Home */}
          {(hasSteps || !isOverview) && (
            <Button
              size="sm"
              onClick={handlePrimaryAction}
              className="rounded-none font-bold text-xs border-3 border-double h-10 px-6"
            >
              {isOverview ? (
                "Begin First Step"
              ) : isLastStep ? (
                <>
                  <Home className="mr-2 h-4 w-4" />
                  Back to Overview
                </>
              ) : (
                "Next Step"
              )}
              {!isLastStep && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
