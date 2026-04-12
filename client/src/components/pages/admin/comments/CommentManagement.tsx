//src/components/pages/admin/comments/CommentManagement.tsx
"use client";

import React, { useState } from "react";
import {
  useGetAdminCommentsQuery,
  useDeleteCommentMutation,
} from "@/lib/features/admin/adminApiSlice";
import { AdminCommentRow } from "@/lib/features/admin/adminTypes";
import { PostCategory } from "@/lib/features/post/postTypes";
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
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Trash2,
  Eye,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import toast from "react-hot-toast";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import ManagementPageLayout from "../layouts/ManagementPageLayout";
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
import PaginationControls from "@/components/shared/PaginationControls";
import { useGetPostByIdQuery } from "@/lib/features/post/postApiSlice";

const getPostPath = (category: PostCategory, postId: string) => {
  const categoryToPathMap: Partial<Record<PostCategory, string>> = {
    PROJECT: "projects",
    SHOWCASE: "showcases",
    BLOG: "blogs",
    ARTICLE: "articles",
    RESOURCE: "resources",
    DISCUSSION: "discussions",
    GUIDE: "guides",
  };
  return `/${categoryToPathMap[category] || "posts"}/${postId}`;
};

function CommentActions({ comment }: { comment: AdminCommentRow }) {
  const [deleteComment, { isLoading }] = useDeleteCommentMutation();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { data: post } = useGetPostByIdQuery(comment.post.id, {
    skip: !comment.post.id,
  });

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id).unwrap();
      toast.success("Comment purged from record.");
    } catch {
      toast.error("Failed to delete comment.");
    }
  };

  const viewLink = post
    ? `${getPostPath(post.category, post.id)}#comment-${comment.id}`
    : "#";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 rounded-none">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-none">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild disabled={!post} className="cursor-pointer">
            <Link href={viewLink}>
              <Eye className="mr-2 h-4 w-4" />
              View on Post
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
            onClick={() => setIsAlertOpen(true)}
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Comment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-none">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This comment will be permanently removed. This action is
              irreversible.
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
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Delete Comment"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default function CommentManagement() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading, isError } = useGetAdminCommentsQuery({
    page,
    q: debouncedSearchTerm,
  });

  const comments = data?.data.comments ?? [];
  const pagination = data?.data.pagination;

  return (
    <ManagementPageLayout
      title="Comment Management"
      description="Monitor and moderate community discussions."
      itemCount={pagination?.totalItems ?? 0}
      controls={
        <Input
          placeholder="Search comments or users..."
          className="w-64 rounded-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
    >
      <div className="rounded-none border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-75">Comment Content</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="w-75">Context (Post Title)</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 italic">
                  <Loader2 className="animate-spin h-5 w-5 mx-auto mb-2" />
                  Fetching discussion logs...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-destructive font-bold"
                >
                  Error loading comment stream.
                </TableCell>
              </TableRow>
            ) : comments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-muted-foreground"
                >
                  No comments match your current filter.
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => (
                <TableRow key={comment.id} className="group hover:bg-muted/30">
                  {/* 🚜 Fixed: Added max-w-[300px] and truncate to prevent expansion */}
                  <TableCell className="max-w-75 align-top">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm truncate" title={comment.text}>
                        {comment.text}
                      </p>
                      <span className="text-[10px] font-mono text-muted-foreground flex items-center">
                        <MessageSquare className="mr-1 h-3 w-3" /> ID:{" "}
                        {comment.id.slice(-8)}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="align-top">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-7 w-7 rounded-none border">
                        <AvatarImage
                          src={comment.author.profileImage ?? undefined}
                        />
                        <AvatarFallback className="rounded-none text-[10px]">
                          {comment.author.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs font-bold">
                        @{comment.author.username}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-75 align-top">
                    <p
                      className="text-xs truncate font-medium text-muted-foreground italic"
                      title={comment.post.title}
                    >
                      {comment.post.title}
                    </p>
                  </TableCell>

                  <TableCell className="align-top whitespace-nowrap text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>

                  <TableCell className="text-right align-top">
                    <CommentActions comment={comment} />
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
