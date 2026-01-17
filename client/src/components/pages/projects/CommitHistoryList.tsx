"use client";

import React from "react";
import { GitHubCommit } from "@/lib/features/github/githubTypes";
import { formatDistanceToNow } from "date-fns";
import { GitCommit } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CommitHistoryList({
  commits,
}: {
  commits: GitHubCommit[];
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Recent Activity
      </h4>
      <div className="space-y-3">
        {commits.map((commit) => (
          <div key={commit.sha} className="flex items-start gap-3">
            <Avatar className="h-6 w-6 border">
              <AvatarImage src={commit.author.avatarUrl} />
              <AvatarFallback>{commit.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm line-clamp-1 text-foreground leading-none mb-1">
                {commit.message}
              </p>
              <p className="text-[10px] text-muted-foreground">
                <span className="font-medium text-primary/80">
                  {commit.author.name}
                </span>
                {" • "}
                {formatDistanceToNow(new Date(commit.date), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <GitCommit className="h-3 w-3 text-muted-foreground shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
