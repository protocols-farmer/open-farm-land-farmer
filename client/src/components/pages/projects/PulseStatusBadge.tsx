// src/components/pages/projects/PulseStatusBadge.tsx
"use client";

import React from "react";
import { GitHubCommit } from "@/lib/features/github/githubTypes";
import { getProjectPulseStatus } from "@/lib/features/github/githubUtils";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function PulseStatusBadge({
  commits,
}: {
  commits: GitHubCommit[];
}) {
  const status = getProjectPulseStatus(commits);

  return (
    <Badge
      variant="outline"
      className="flex w-fit items-center gap-1.5 border-none px-0"
      style={{ color: status.color }}
    >
      <Activity className={cn("h-4 w-4", status.animate && "animate-pulse")} />
      <span className="font-bold uppercase tracking-wider text-[10px]">
        {status.label}
      </span>
    </Badge>
  );
}
