"use client";

import React, { useMemo } from "react";
import { GitHubLanguage } from "@/lib/features/github/githubTypes";
import { calculateLanguagePercentages } from "@/lib/features/github/githubUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LanguageDistributionBarProps {
  languages: GitHubLanguage[];
}

export default function LanguageDistributionBar({
  languages,
}: LanguageDistributionBarProps) {
  const percentages = useMemo(
    () => calculateLanguagePercentages(languages),
    [languages]
  );

  if (percentages.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-secondary">
        {percentages.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.percentage}%`,
              backgroundColor: lang.color || "#ccc",
            }}
            className="h-full transition-all duration-500 hover:brightness-110"
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {percentages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: lang.color || "#ccc" }}
            />
            <span className="text-xs font-medium">{lang.name}</span>
            <span className="text-xs text-muted-foreground">
              {lang.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
