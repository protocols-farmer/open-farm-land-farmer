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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, AlertCircle, Users, Star, BookOpen } from "lucide-react";
import GitHubSkeleton from "./GitHubSkeleton";
import { formatCompactNumber } from "@/lib/utils";

interface AuthorProfileCardProps {
  githubLink: string | null;
}

const getOwnerFromUrl = (url: string): string => {
  try {
    const path = new URL(url).pathname;
    return path.split("/").filter(Boolean)[0] || "Author";
  } catch {
    return "Author";
  }
};

export default function AuthorProfileCard({
  githubLink,
}: AuthorProfileCardProps) {
  const { data, isLoading, isError } = useGetRepoPulseQuery(githubLink || "", {
    skip: !githubLink,
  });

  if (!githubLink) return null;
  if (isLoading) return <GitHubSkeleton />;

  if (isError || !data) {
    return (
      <Card className="border-amber-500/50 bg-amber-50/50 dark:bg-amber-950/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            GitHub Insight Unavailable
          </CardTitle>
          <CardDescription className="text-xs">
            Could not verify activity for this link.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const ownerName = getOwnerFromUrl(githubLink);

  /**
   * CASE 1: REPOSITORY VIEW
   * TypeScript now knows 'data' is GitHubRepoPulseDto
   */
  if (data.type === "REPO") {
    const latestAuthor = data.recentCommits[0]?.author;

    return (
      <Card className="overflow-hidden border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Project Maintainer</CardTitle>
          <CardDescription className="text-xs">
            Verified activity for this repository.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
              <AvatarImage src={latestAuthor?.avatarUrl} alt={ownerName} />
              <AvatarFallback>
                {ownerName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{latestAuthor?.name || ownerName}</h3>
              <p className="text-xs text-muted-foreground">
                @{ownerName.toLowerCase()}
              </p>
            </div>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Actively maintaining{" "}
            <span className="font-semibold text-foreground">{data.name}</span>{" "}
            with{" "}
            <span className="font-semibold text-foreground">
              {data.stats.contributors}
            </span>{" "}
            contributors.
          </p>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full text-xs"
          >
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-3.5 w-3.5" /> View Repository
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  /**
   * CASE 2: USER PROFILE VIEW
   * TypeScript now knows 'data' is GitHubProfileDto
   */
  return (
    <Card className="overflow-hidden border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Developer Profile</CardTitle>
        <CardDescription className="text-xs">
          Global GitHub presence.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
            <AvatarImage src={data.avatar} alt={data.handle} />
            <AvatarFallback>
              {data.handle.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold">{data.name}</h3>
            <p className="text-xs text-muted-foreground">@{data.handle}</p>
          </div>
        </div>

        {data.bio && (
          <p className="text-xs text-muted-foreground italic line-clamp-2">
            "{data.bio}"
          </p>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-md border bg-muted/30 p-2">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] font-bold">
              {formatCompactNumber(data.stats.followers)}{" "}
              <span className="font-normal text-muted-foreground">
                Followers
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-md border bg-muted/30 p-2">
            <BookOpen className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] font-bold">
              {data.stats.publicRepos}{" "}
              <span className="font-normal text-muted-foreground">Repos</span>
            </span>
          </div>
        </div>

        <Button asChild variant="default" size="sm" className="w-full text-xs">
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            <Github className="mr-2 h-3.5 w-3.5" /> Follow on GitHub
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
