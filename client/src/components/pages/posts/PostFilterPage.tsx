//src/components/pages/posts/PostFilterPage.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PostCategory, GetPostsArgs } from "@/lib/features/post/postTypes";
import {
  useGetPostsQuery,
  useGetTagsQuery,
} from "@/lib/features/post/postApiSlice";
import PostCard from "./PostCard";
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
  Calendar,
  Tags,
  ServerCrash,
  Loader2,
  RotateCcw,
  Shovel,
  Pickaxe,
  Wheat,
  Milk,
  Flower2,
  MessageSquare,
  Sprout,
} from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useIntersectionObserver } from "@/lib/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

interface PostFilterPageProps {
  category?: PostCategory;
  authorId?: string;
  likedByUserId?: string;
  savedByUserId?: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  searchPlaceholder: string;
}

const PostCardSkeleton = () => (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-[180px] w-full " />
    <div className="space-y-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  </div>
);

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title-asc", label: "Title (A-Z)" },
  { value: "title-desc", label: "Title (Z-A)" },
];

const allCategories: ("All" | PostCategory)[] = [
  "All",
  "PROJECT",
  "BLOG",
  "RESOURCE",
  "ARTICLE",
  "SHOWCASE",
  "DISCUSSION",
  "GUIDE",
];

const getCategoryIcon = (category: PostCategory | "All") => {
  const iconMap: Partial<Record<PostCategory, React.ElementType>> = {
    PROJECT: Pickaxe,
    BLOG: Shovel,
    RESOURCE: Wheat,
    ARTICLE: Milk,
    SHOWCASE: Flower2,
    DISCUSSION: MessageSquare,
    GUIDE: Sprout,
  };
  return iconMap[category as PostCategory];
};

export default function PostFilterPage({
  category,
  authorId,
  likedByUserId,
  savedByUserId,
  title,
  subtitle,
  icon: DefaultPageIcon,
  searchPlaceholder,
}: PostFilterPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<
    "All" | PostCategory
  >(category || (searchParams.get("category") as PostCategory) || "All");
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(
    () => new Set(searchParams.get("tags")?.split(",").filter(Boolean) || []),
  );
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sort") || "newest",
  );

  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedCategory, selectedTags, sortOrder]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (debouncedSearchTerm) params.set("q", debouncedSearchTerm);
    else params.delete("q");
    if (selectedTags.size > 0)
      params.set("tags", Array.from(selectedTags).join(","));
    else params.delete("tags");
    if (sortOrder !== "newest") params.set("sort", sortOrder);
    else params.delete("sort");
    if (!category && selectedCategory !== "All")
      params.set("category", selectedCategory);
    else if (!category) params.delete("category");

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    debouncedSearchTerm,
    selectedCategory,
    selectedTags,
    sortOrder,
    pathname,
    router,
    category,
  ]);

  const queryParams: GetPostsArgs = {
    authorId,
    likedByUserId,
    savedByUserId,
    category:
      category || (selectedCategory === "All" ? undefined : selectedCategory),
    q: debouncedSearchTerm || undefined,
    tags:
      selectedTags.size > 0 ? Array.from(selectedTags).join(",") : undefined,
    sort: sortOrder as GetPostsArgs["sort"],
    limit: 12,
    page,
  };

  const {
    data: postsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPostsQuery(queryParams);

  const { data: tagsResponse } = useGetTagsQuery({
    context: "POST",
    category: queryParams.category,
    authorId: queryParams.authorId,
    likedByUserId: queryParams.likedByUserId,
    savedByUserId: queryParams.savedByUserId,
  });

  const posts = postsResponse?.data || [];
  const availableTags = tagsResponse?.data.map((t) => t.name) || [];

  const hasMore = postsResponse
    ? postsResponse.pagination.currentPage < postsResponse.pagination.totalPages
    : false;

  const loadMore = () => {
    if (hasMore && !isFetching) {
      setPage((prev) => prev + 1);
    }
  };

  const sentinelRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: hasMore && !isError,
  });

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = new Set(prev);
      if (newTags.has(tag)) newTags.delete(tag);
      else newTags.add(tag);
      return newTags;
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags(new Set());
    setSortOrder("newest");
    if (!category) setSelectedCategory("All");
  };

  const hasActiveFilters =
    searchTerm ||
    selectedTags.size > 0 ||
    sortOrder !== "newest" ||
    (!category && selectedCategory !== "All");

  return (
    <section className="space-y-6">
      <div className="mb-4">
        <h1 className="text-2xl md:text-4xl font-black tracking-tighter text-foreground flex items-center gap-2.5">
          {React.createElement(
            getCategoryIcon(selectedCategory) || DefaultPageIcon,
            { className: "text-primary h-7 w-7 md:h-9 md:w-9" },
          )}
          {title}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1 font-medium">
          {subtitle}
        </p>
      </div>

      <Card className="p-3 md:p-5 bg-background/60 backdrop-blur-md relative border-border/50 shadow-sm ">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-9 h-11 text-sm  border-border/40 bg-background/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 hover:bg-transparent"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-3 w-3 text-muted-foreground/30" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 md:flex gap-2">
              {!category && (
                <Select
                  value={selectedCategory}
                  onValueChange={(val) => setSelectedCategory(val as any)}
                >
                  <SelectTrigger className="h-11 text-xs md:w-[150px]  font-bold bg-background/50 border-border/40">
                    <Tags className="mr-2 h-3.5 w-3.5 text-primary" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="">
                    {allCategories.map((cat) => (
                      <SelectItem
                        key={cat}
                        value={cat}
                        className="text-xs font-medium"
                      >
                        {cat === "All" ? "All categories" : cat.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="h-11 text-xs md:w-[150px]  font-bold bg-background/50 border-border/40">
                  <Calendar className="mr-2 h-3.5 w-3.5 text-primary" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="">
                  {sortOptions.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="text-xs font-medium"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {availableTags.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 sm:items-start pt-4 border-t border-border/40">
              <h3 className="text-[10px] font-black  tracking-[0.2em] text-muted-foreground/40 shrink-0">
                Trending tags
              </h3>

              <div
                className={cn(
                  "overflow-y-auto max-h-[76px] pr-1",
                  "scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 transition-colors",
                )}
                style={{ scrollbarWidth: "thin" }}
              >
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {availableTags.map((tag) => (
                    <Button
                      key={tag}
                      variant={selectedTags.has(tag) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleTagClick(tag)}
                      className="rounded-none h-8 px-4 text-[11px] font-bold transition-all border-border/40 active:scale-95"
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

      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[11px] font-bold  tracking-widest text-muted-foreground/60">
            {isFetching && page === 1
              ? "Syncing results..."
              : `${postsResponse?.pagination.totalItems ?? 0} items found`}
          </p>
          {hasActiveFilters && (
            <Button
              variant="link"
              size="sm"
              onClick={clearFilters}
              className="rounded-none h-auto p-0 text-xs text-primary font-bold decoration-primary/30"
            >
              Reset filters
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : isError && page === 1 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed  bg-muted/20">
            <ServerCrash className="h-10 w-10 text-destructive/30" />
            <h3 className="mt-4 font-black tracking-tighter">
              Connection error
            </h3>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Failed to fetch data from the farm.
            </p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              size="sm"
              className="mt-4 gap-2 rounded-none font-bold text-xs"
            >
              <RotateCcw className="h-3 w-3" /> Retry
            </Button>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* 🚜 INFINITE SCROLL FOOTER */}
            <div
              ref={sentinelRef}
              className="py-10 flex flex-col items-center justify-center min-h-[100px]"
            >
              {isFetching && hasMore && (
                <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
                  <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  <span className="text-[10px] font-black  tracking-widest text-muted-foreground/40">
                    Loading more...
                  </span>
                </div>
              )}
              {isError && page > 1 && (
                <div className="flex flex-col items-center gap-3 animate-in slide-in-from-bottom-2 duration-300">
                  <span className="text-xs font-bold text-destructive/60">
                    Failed to load more posts
                  </span>
                  <Button
                    onClick={() => refetch()}
                    variant="outline"
                    size="sm"
                    className="rounded-none px-6 border-destructive/20 text-destructive/70 hover:bg-destructive/5 font-black text-[10px]  tracking-wider"
                  >
                    <RotateCcw className="mr-2 h-3 w-3" /> Refetch
                  </Button>
                </div>
              )}
              {!hasMore && posts.length > 0 && (
                <div className="flex items-center gap-4 w-full">
                  <div className="h-[1px] flex-1 bg-border/30" />
                  <span className="text-[10px] font-black  tracking-[0.3em] text-muted-foreground/20">
                    End of the line
                  </span>
                  <div className="h-[1px] flex-1 bg-border/30" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed  bg-muted/10">
            <Frown className="h-12 w-12 text-muted-foreground/20" />
            <h3 className="mt-4 text-lg font-black tracking-tighter">
              No results
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              Try adjusting your filters or search terms.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
