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
  Code,
  Users,
  User,
} from "lucide-react";
import { formatCompactNumber } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import GitHubSkeleton from "./GitHubSkeleton";
import LanguageDistributionBar from "./LanguageDistributionBar";
import { Badge } from "@/components/ui/badge";

interface GitHubRepoCardProps {
  githubLink: string | null;
}

export default function GitHubRepoCard({ githubLink }: GitHubRepoCardProps) {
  const { data, isLoading, isError } = useGetRepoPulseQuery(githubLink || "", {
    skip: !githubLink,
  });

  if (!githubLink) return null;
  if (isLoading) return <GitHubSkeleton />;

  // 1. Handle API Errors or Missing Data
  if (isError || !data) {
    return (
      <Card className="border-destructive/20 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            Repository Data Unreachable
          </CardTitle>
          <CardDescription className="text-xs">
            Please check if the URL is a public GitHub repository.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // 2. TYPE NARROWING: Handle the case where a Profile URL was provided to a Repo Card
  if (data.type === "USER") {
    return (
      <Card className="border-border/60 bg-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4" />
            Profile Link Detected
          </CardTitle>
          <CardDescription className="text-xs">
            This section displays repository-specific pulse data. Showing
            profile overview instead.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full text-xs">
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              View @{data.handle} on GitHub
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // 3. REPO CASE: TypeScript now knows 'data' is strictly GitHubRepoPulseDto
  const stats = [
    { label: "Stars", icon: Star, value: data.stats.stars },
    { label: "Forks", icon: GitFork, value: data.stats.forks },
    { label: "Contributors", icon: Users, value: data.stats.contributors },
  ];

  return (
    <Card className="border-border/60 shadow-sm transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-black uppercase tracking-tighter">
          <Github className="h-6 w-6" /> Repository Pulse
        </CardTitle>
        <CardDescription className="line-clamp-1 text-xs">
          {data.description || "Live insights from the digital soil"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Languages Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Tech DNA
            </p>
            {data.primaryLanguage && (
              <Badge variant="secondary" className="text-[10px] font-bold">
                <Code className="mr-1.5 h-3 w-3" />
                {data.primaryLanguage.name}
              </Badge>
            )}
          </div>
          <LanguageDistributionBar languages={data.languages} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 rounded-xl border bg-muted/30 p-3 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-lg font-black tracking-tighter">
                {formatCompactNumber(stat.value)}
              </p>
              <p className="flex items-center justify-center gap-1 text-[9px] font-bold uppercase text-muted-foreground">
                <stat.icon className="h-2.5 w-2.5" /> {stat.label}
              </p>
            </div>
          ))}
        </div>

        <Button
          asChild
          className="w-full font-bold shadow-lg shadow-primary/20 transition-transform active:scale-[0.98]"
        >
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            Explore Codebase
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
