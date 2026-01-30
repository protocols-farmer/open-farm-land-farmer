"use client";

import React, { useState, useEffect } from "react";
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
  FolderGit2,
  Newspaper,
  BookCopy,
  FileText,
  Presentation,
  MessagesSquare,
  Compass,
} from "lucide-react";
import { useDebounce } from "@/lib/hooks/useDebounce";

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
    <Skeleton className="h-[180px] w-full rounded-xl" />
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
    PROJECT: FolderGit2,
    BLOG: Newspaper,
    RESOURCE: BookCopy,
    ARTICLE: FileText,
    SHOWCASE: Presentation,
    DISCUSSION: MessagesSquare,
    GUIDE: Compass,
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
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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

    router.replace(`${pathname}?${params.toString()}`);
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
    limit: 50,
  };

  const {
    data: postsResponse,
    isLoading,
    isFetching,
    isError,
  } = useGetPostsQuery(queryParams);
  const { data: tagsResponse } = useGetTagsQuery(queryParams);

  const posts = postsResponse?.data || [];
  const availableTags = tagsResponse?.data.map((t) => t.name) || [];

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
        <h1 className="text-2xl md:text-4xl font-extrabold text-foreground flex items-center gap-2.5">
          {React.createElement(
            getCategoryIcon(selectedCategory) || DefaultPageIcon,
            { className: "text-primary h-7 w-7 md:h-9 md:w-9" },
          )}
          {title}
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {subtitle}
        </p>
      </div>

      <Card className="p-3 md:p-5 bg-background/60 backdrop-blur-md relative border-border/50 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-9 h-10 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 md:flex gap-2">
              {!category && (
                <Select
                  value={selectedCategory}
                  onValueChange={(val) => setSelectedCategory(val as any)}
                >
                  <SelectTrigger className="h-10 text-xs md:w-[150px]">
                    <Tags className="mr-2 h-3.5 w-3.5" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="h-10 text-xs md:w-[150px]">
                  <Calendar className="mr-2 h-3.5 w-3.5" />
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* === TAGS SECTION: UI/UX FIX FOR MOBILE === */}
          {availableTags.length > 0 && (
            <div className="flex flex-col gap-2 pt-3 border-t sm:flex-row sm:items-start">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mt-1 shrink-0">
                <Tags className="h-3 w-3" /> Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.has(tag) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagClick(tag)}
                    className="rounded-full h-7 px-3 text-[10px] transition-all hover:bg-accent hover:text-accent-foreground border-border/50"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {isFetching
              ? "Syncing..."
              : `${postsResponse?.pagination.totalItems ?? 0} found`}
          </p>
          {hasActiveFilters && (
            <Button
              variant="link"
              size="sm"
              onClick={clearFilters}
              className="h-auto p-0 text-xs text-primary"
            >
              Reset Filters
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-xl bg-muted/20">
            <ServerCrash className="h-10 w-10 text-destructive/50" />
            <h3 className="mt-4 font-bold">Connection Error</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Failed to fetch data.
            </p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 border-2 border-dashed rounded-2xl bg-muted/10">
            <Frown className="h-12 w-12 text-muted-foreground/40" />
            <h3 className="mt-4 text-lg font-bold">No results</h3>
            <p className="text-sm text-muted-foreground">
              Try removing some filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
