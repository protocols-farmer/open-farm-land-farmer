"use client";

import React from "react";
import { useGetRepoPulseQuery } from "@/lib/features/github/githubApiSlice";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { GitCommit, AlertCircle, History, User } from "lucide-react";
import GitHubSkeleton from "./GitHubSkeleton";

interface GithubActivityCardProps {
  githubLink: string | null;
}

export default function GithubActivityCard({
  githubLink,
}: GithubActivityCardProps) {
  const { data, isLoading, isError } = useGetRepoPulseQuery(githubLink || "", {
    skip: !githubLink,
  });

  if (!githubLink) return null;
  if (isLoading) return <GitHubSkeleton />;

  // 1. Handle Error or Profile Link (Narrowing)
  if (isError || !data || data.type === "USER") {
    return (
      <Card className="border-border/40 bg-muted/10">
        <CardContent className="pt-6 text-center text-xs text-muted-foreground">
          <AlertCircle className="mx-auto h-4 w-4 mb-2 text-muted-foreground/50" />
          {data?.type === "USER"
            ? "Activity feed is only available for repositories."
            : "Activity feed currently unavailable."}
        </CardContent>
      </Card>
    );
  }

  // 2. REPO Logic: TypeScript now knows data is GitHubRepoPulseDto
  const events = data.recentCommits;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-black uppercase tracking-tighter">
          <History className="h-5 w-5 text-primary" />
          Project Activity
        </CardTitle>
        <CardDescription className="text-xs">
          Latest verified commits from the digital soil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {events.length > 0 ? (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border before:via-border before:to-transparent">
            {events.map((commit) => (
              <div
                key={commit.sha}
                className="relative flex items-start gap-4 pl-8 group"
              >
                {/* Timeline Dot */}
                <span className="absolute left-0 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-primary group-hover:scale-110 transition-transform">
                  <GitCommit className="h-2 w-2 text-primary" />
                </span>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold leading-none text-foreground line-clamp-1">
                      {commit.message}
                    </p>
                    <time className="text-[10px] whitespace-nowrap text-muted-foreground font-mono">
                      {formatDistanceToNow(new Date(commit.date), {
                        addSuffix: true,
                      })}
                    </time>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    by{" "}
                    <span className="font-bold text-primary">
                      {commit.author.name}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xs text-muted-foreground py-4 italic">
            No recent activity found in this farmland.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
