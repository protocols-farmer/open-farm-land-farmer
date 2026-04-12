//src/components/pages/opportunities/OpportunityFilterPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetOpportunitiesQuery } from "@/lib/features/opportunities/opportunityApiSlice";
import { useGetTagsQuery } from "@/lib/features/post/postApiSlice";
import {
  OpportunityTypeEnum,
  GetOpportunitiesParams,
} from "@/lib/features/opportunities/opportunityTypes";
import OpportunityCard from "./OpportunityCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  X,
  Frown,
  Tags,
  ServerCrash,
  Briefcase,
  Globe,
  FilterX,
  Loader2,
  RotateCcw,
  Tractor,
} from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

const OpportunitySkeleton = () => (
  <div className="p-8 border  space-y-6 bg-card/50">
    <div className="flex items-center gap-4">
      <Skeleton className="h-14 w-14 " />
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
    <Skeleton className="h-8 w-full" />
    <div className="flex gap-2">
      <Skeleton className="h-6 w-16 " />
      <Skeleton className="h-6 w-16 " />
    </div>
  </div>
);

const typeOptions: ("All" | OpportunityTypeEnum)[] = [
  "All",
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
];

export default function OpportunityFilterPage({
  title,
  subtitle,
  searchPlaceholder,
}: {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedType, setSelectedType] = useState<"All" | OpportunityTypeEnum>(
    (searchParams.get("type") as OpportunityTypeEnum) || "All",
  );
  const [isRemoteOnly, setIsRemoteOnly] = useState(
    searchParams.get("isRemote") === "true",
  );
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    () => new Set(searchParams.get("tags")?.split(",").filter(Boolean) || []),
  );

  const [skip, setSkip] = useState(0);
  const BATCH_SIZE = 12;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSkip(0);
  }, [debouncedSearchTerm, selectedType, isRemoteOnly, selectedTags]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    else params.delete("q");
    if (selectedType !== "All") params.set("type", selectedType);
    else params.delete("type");
    if (isRemoteOnly) params.set("isRemote", "true");
    else params.delete("isRemote");
    if (selectedTags.size > 0)
      params.set("tags", Array.from(selectedTags).join(","));
    else params.delete("tags");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    debouncedSearchTerm,
    selectedType,
    isRemoteOnly,
    selectedTags,
    pathname,
    router,
  ]);

  const queryParams: GetOpportunitiesParams = {
    q: debouncedSearchTerm || undefined,
    type: selectedType === "All" ? undefined : selectedType,
    isRemote: isRemoteOnly || undefined,
    tags:
      selectedTags.size > 0 ? Array.from(selectedTags).join(",") : undefined,
    take: BATCH_SIZE,
    skip: skip,
  };

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetOpportunitiesQuery(queryParams);

  /**
   * 🚜 CONTEXT-AWARE TAGS
   */
  const { data: tagsResponse } = useGetTagsQuery({ context: "OPPORTUNITY" });

  const opportunities = response?.data || [];
  const availableTags = tagsResponse?.data.map((t) => t.name) || [];

  const hasMore = response
    ? skip + BATCH_SIZE < response.pagination.totalItems
    : false;
  const loadMore = () => {
    if (hasMore && !isFetching) {
      setSkip((prev) => prev + BATCH_SIZE);
    }
  };

  const sentinelRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore && !isError,
  });

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tag)) newSet.delete(tag);
      else newSet.add(tag);
      return newSet;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("All");
    setIsRemoteOnly(false);
    setSelectedTags(new Set());
  };

  const hasActiveFilters =
    searchTerm ||
    selectedType !== "All" ||
    isRemoteOnly ||
    selectedTags.size > 0;

  return (
    <div className="container mx-auto py-12 md:py-20 animate-in fade-in duration-500">
      <div className="mb-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black  text-foreground flex items-center gap-4">
          <Tractor className="h-10 w-10 text-primary" />
          {title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
          {subtitle}
        </p>
      </div>

      <Card className="p-4 md:p-6 bg-background/60 backdrop-blur-md border-border/50 shadow-sm  mb-8 rounded-none">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-11 h-12 text-sm  border-border/40 bg-background/50 rounded-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute rounded-none  right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4 text-muted-foreground/30" />
                </Button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={selectedType}
                onValueChange={(val) => setSelectedType(val as any)}
              >
                <SelectTrigger className="h-12 w-full md:w-45  font-bold bg-background/50 border-border/40 px-5">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent className="">
                  {typeOptions.map((t) => (
                    <SelectItem
                      key={t}
                      value={t}
                      className="text-xs font-bold  "
                    >
                      {t.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={isRemoteOnly ? "default" : "outline"}
                onClick={() => setIsRemoteOnly(!isRemoteOnly)}
                className={cn(
                  "h-12 px-6 rounded-none  font-bold gap-2 border-border/40 transition-all",
                  isRemoteOnly && "shadow-lg shadow-primary/20",
                )}
              >
                <Globe
                  className={cn(
                    "h-4 w-4",
                    isRemoteOnly ? "animate-pulse" : "text-muted-foreground",
                  )}
                />
                Remote only
              </Button>
            </div>
          </div>

          {/* 🚜 REFACTORED TAG SECTION: Fixed Height with Vertical Scroll */}
          {availableTags.length > 0 && (
            <div className="flex flex-col gap-3 pt-5 border-t border-border/40 sm:flex-row sm:items-start">
              <h3 className="text-[10px] font-black  0.2em] text-muted-foreground/40 mt-2.5 shrink-0">
                Skills needed
              </h3>
              <div
                className={cn(
                  "overflow-y-auto max-h-19 pr-1 flex-1",
                  "scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 transition-colors",
                )}
                style={{ scrollbarWidth: "thin" }}
              >
                <div className="flex flex-wrap gap-2 pb-1">
                  {availableTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTags.has(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTagClick(tag)}
                      className="rounded-none h-8 px-4 text-[11px] font-bold border-border/40 active:scale-95 transition-all"
                    >
                      #{tag}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-[11px] font-black  0.2em] text-muted-foreground/60">
          {isFetching && skip === 0
            ? "Scanning ecosystem..."
            : `${response?.pagination.totalItems ?? 0} opportunities found`}
        </p>
        {hasActiveFilters && (
          <Button
            variant="link"
            size="sm"
            onClick={clearFilters}
            className="h-auto rounded-none p-0 text-xs text-primary font-bold"
          >
            <FilterX className="mr-2 h-3.5 w-3.5" /> Reset filters
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <OpportunitySkeleton key={i} />
          ))}
        </div>
      ) : isError && skip === 0 ? (
        <div className="text-center py-20 bg-destructive/5 border border-destructive/10 ">
          <ServerCrash className="mx-auto h-12 w-12 text-destructive/30" />
          <h2 className="text-xl font-black  mt-4">Failed to fetch data</h2>
          <p className="text-muted-foreground mt-2 font-medium">
            Check your connection to the farm.
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            className="mt-6 gap-2 rounded-none font-black text-xs"
          >
            <RotateCcw className="h-3 w-3" /> Retry Connection
          </Button>
        </div>
      ) : opportunities.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>

          {/* 🚜 INFINITE SCROLL FOOTER */}
          <div
            ref={sentinelRef}
            className="py-16 flex flex-col items-center justify-center min-h-30"
          >
            {isFetching && hasMore && (
              <div className="flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
                <Loader2 className="h-7 w-7 text-primary animate-spin" />
                <span className="text-[10px] font-black text-muted-foreground/40">
                  Acquiring next batch...
                </span>
              </div>
            )}

            {isError && skip > 0 && (
              <div className="flex flex-col items-center gap-4 animate-in slide-in-from-bottom-2 duration-300">
                <span className="text-xs font-bold text-destructive/60 italic">
                  Signal lost while scrolling
                </span>
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  size="sm"
                  className=" rounded-none px-8 border-destructive/20 text-destructive/70 hover:bg-destructive/5 font-black text-[10px]   shadow-sm"
                >
                  <RotateCcw className="mr-2 h-3.5 w-3.5" /> Refetch
                </Button>
              </div>
            )}

            {!hasMore && opportunities.length > 0 && (
              <div className="flex items-center gap-6 w-full opacity-40">
                <div className="h-px flex-1 from-transparent via-border to-transparent" />
                <span className="text-[10px] font-black  0.5em] text-muted-foreground/30">
                  All clear
                </span>
                <div className="h-px flex-1  from-transparent via-border to-transparent" />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-24 border-2 border-dashed ] bg-muted/5">
          <Frown className="h-16 w-16 text-muted-foreground/20" />
          <h3 className="mt-6 text-2xl font-black ">No positions found</h3>
          <p className="text-muted-foreground font-medium">
            Try broadening your search or skill selection.
          </p>
        </div>
      )}
    </div>
  );
}
