//src/components/pages/admin/posts/PostsManagement.tsx
"use client";

import React, { useState } from "react";
import {
  useGetAdminPostsQuery,
  useDeletePostMutation,
} from "@/lib/features/admin/adminApiSlice";
import { AdminPostRow, PostCategory } from "@/lib/features/admin/adminTypes";
import { useDebounce } from "@/lib/hooks/useDebounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Trash2,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import Image from "next/image";
import ManagementPageLayout from "../layouts/ManagementPageLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaginationControls from "@/components/shared/PaginationControls";

const getPostAction = (post: AdminPostRow) => {
  const category = post.category as PostCategory;
  const categoryToPathMap: Partial<Record<PostCategory, string>> = {
    PROJECT: "projects",
    SHOWCASE: "showcases",
    BLOG: "blogs",
    ARTICLE: "articles",
    RESOURCE: "resources",
    DISCUSSION: "discussions",
    GUIDE: "guides",
  };
  const path = categoryToPathMap[category] || "posts";
  return { href: `/${path}/${post.id}` };
};

function PostActions({ post }: { post: AdminPostRow }) {
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { href } = getPostAction(post);

  const handleDelete = async () => {
    try {
      await deletePost(post.id).unwrap();
      toast.success("Post successfully purged.");
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-none">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={href}>
              <Eye className="mr-2 h-4 w-4" />
              View Post
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            onClick={() => setIsAlertOpen(true)}
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Post
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this post and all associated
              comments/stats.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-none">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-none"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Yes, delete post"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function PostManagement() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<PostCategory | "ALL">("ALL");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useGetAdminPostsQuery({
    page,
    q: debouncedSearchTerm,
    filterByCategory: category === "ALL" ? undefined : category,
  });

  const posts = data?.data.posts ?? [];
  const pagination = data?.data.pagination;

  const controls = (
    <>
      <Input
        placeholder="Search posts or authors..."
        className="w-64 rounded-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select
        value={category}
        onValueChange={(value) => setCategory(value as PostCategory | "ALL")}
      >
        <SelectTrigger className="w-45 rounded-none">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent className="rounded-none">
          <SelectItem value="ALL">All Categories</SelectItem>
          {Object.values(PostCategory).map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );

  return (
    <ManagementPageLayout
      title="Post Management"
      description="Monitor and moderate content published across the community."
      itemCount={pagination?.totalItems ?? 0}
      controls={controls}
    >
      <div className="rounded-none border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-20">Image</TableHead>
              <TableHead className="w-[25%]">Title</TableHead>
              <TableHead className="w-[35%]">Description</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 italic">
                  <Loader2 className="animate-spin h-5 w-5 mx-auto mb-2" />
                  Retrieving content...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-destructive font-bold"
                >
                  Failed to load post stream.
                </TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-muted-foreground"
                >
                  No posts found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow
                  key={post.id}
                  className="group transition-colors hover:bg-muted/30"
                >
                  <TableCell>
                    <div className="relative h-12 w-12 rounded-none overflow-hidden bg-muted shrink-0 border">
                      {post.images?.[0]?.url ? (
                        <Image
                          src={post.images[0].url}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-secondary"></div>
                      )}
                    </div>
                  </TableCell>

                  {/* 🚜 Fixed: Added max-w and line-clamp for Title */}
                  <TableCell className="align-top font-bold max-w-55">
                    <p className="line-clamp-2" title={post.title}>
                      {post.title}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-1 text-[10px] rounded-none px-1 py-0 h-4 font-mono"
                    >
                      {post.category}
                    </Badge>
                  </TableCell>

                  {/* 🚜 Fixed: Added max-w and line-clamp for Description */}
                  <TableCell className="text-sm text-muted-foreground align-top max-w-[320px]">
                    <p
                      className="line-clamp-2 leading-relaxed"
                      title={post.description}
                    >
                      {post.description}
                    </p>
                  </TableCell>

                  <TableCell className="align-top">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 rounded-none border">
                        <AvatarImage
                          src={post.author.profileImage ?? undefined}
                        />
                        <AvatarFallback className="rounded-none text-xs">
                          {post.author.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-semibold">
                        @{post.author.username}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="align-top">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] text-muted-foreground font-mono">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.viewsCount}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {post.likesCount}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {post.commentsCount}
                      </span>
                      <span className="flex items-center">
                        <Bookmark className="h-3 w-3 mr-1" />
                        {post.savedCount}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right align-top">
                    <PostActions post={post} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="mt-6">
          <PaginationControls pagination={pagination} onPageChange={setPage} />
        </div>
      )}
    </ManagementPageLayout>
  );
}
