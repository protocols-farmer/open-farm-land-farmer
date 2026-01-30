//src/components/pages/projects/GitHubPulseCard.tsx
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
import {
  Github,
  Star,
  GitFork,
  AlertCircle,
  Users,
  BookOpen,
  User,
} from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";
import GitHubSkeleton from "./GitHubSkeleton";
import LanguageDistributionBar from "./LanguageDistributionBar";
import PulseStatusBadge from "./PulseStatusBadge";
import CommitHistoryList from "./CommitHistoryList";
import ContributorStats from "./ContributorStats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function GitHubPulseCard({ githubUrl }: { githubUrl: string }) {
  const { data, isLoading, isError } = useGetRepoPulseQuery(githubUrl);

  if (isLoading) return <GitHubSkeleton />;

  if (isError || !data) {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardContent className="pt-6 flex flex-col items-center text-center space-y-2">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-destructive">
              Unable to load GitHub insights
            </p>
            <p className="text-[11px] text-muted-foreground">
              Ensure the URL is a public repository <br />
              (e.g.,{" "}
              <code className="text-foreground">github.com/user/repo</code>)
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  /**
   * REPO VIEW: Displayed when a repository URL is provided
   */
  if (data.type === "REPO") {
    return (
      <Card className="overflow-hidden border-border/50 shadow-sm transition-shadow hover:shadow-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              <CardTitle className="text-base truncate">{data.name}</CardTitle>
            </div>
            <PulseStatusBadge commits={data.recentCommits} />
          </div>
          {data.description && (
            <CardDescription className="line-clamp-1 text-xs">
              {data.description}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 border-y py-3 bg-muted/30">
            <div className="text-center">
              <p className="text-lg font-bold">
                {formatCompactNumber(data.stats.stars)}
              </p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground uppercase font-semibold">
                <Star className="h-3 w-3" /> Stars
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">
                {formatCompactNumber(data.stats.forks)}
              </p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground uppercase font-semibold">
                <GitFork className="h-3 w-3" /> Forks
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">
                {formatCompactNumber(data.stats.contributors)}
              </p>
              <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground uppercase font-semibold">
                <ContributorStats count={data.stats.contributors} />
              </div>
            </div>
          </div>

          <LanguageDistributionBar languages={data.languages} />
          <CommitHistoryList commits={data.recentCommits} />
        </CardContent>
      </Card>
    );
  }

  /**
   * USER VIEW: Displayed when only a profile URL is provided
   */
  return (
    <Card className="overflow-hidden border-border/50 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
            <AvatarImage src={data.avatar} alt={data.handle} />
            <AvatarFallback>
              {data.handle.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg truncate">{data.name}</CardTitle>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                Profile
              </Badge>
            </div>
            <CardDescription className="text-xs font-mono">
              @{data.handle}
            </CardDescription>
          </div>
          <Github className="h-5 w-5 text-muted-foreground/50" />
        </div>
        {data.bio && (
          <p className="text-xs text-muted-foreground mt-2 italic">
            "{data.bio}"
          </p>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-secondary/30 p-2 text-center">
            <p className="text-sm font-bold">
              {formatCompactNumber(data.stats.followers)}
            </p>
            <p className="text-[9px] text-muted-foreground uppercase">
              Followers
            </p>
          </div>
          <div className="rounded-lg bg-secondary/30 p-2 text-center">
            <p className="text-sm font-bold">
              {formatCompactNumber(data.stats.following)}
            </p>
            <p className="text-[9px] text-muted-foreground uppercase">
              Following
            </p>
          </div>
          <div className="rounded-lg bg-secondary/30 p-2 text-center">
            <p className="text-sm font-bold">
              {formatCompactNumber(data.stats.publicRepos)}
            </p>
            <p className="text-[9px] text-muted-foreground uppercase">Repos</p>
          </div>
          <div className="rounded-lg bg-secondary/30 p-2 text-center">
            <p className="text-sm font-bold">
              {formatCompactNumber(data.stats.totalStars)}
            </p>
            <p className="text-[9px] text-muted-foreground uppercase">
              Stars Given
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
          <User className="h-3 w-3" />
          <span>Profile active on GitHub</span>
        </div>
      </CardContent>
    </Card>
  );
}
