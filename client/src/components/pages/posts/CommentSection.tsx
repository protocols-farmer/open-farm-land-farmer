//src/components/pages/posts/CommentSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Loader2,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";
import {
  useGetCommentsForPostQuery,
  useCreateCommentOnPostMutation,
} from "@/lib/features/comment/commentApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";

const COMMENTS_PER_PAGE = 10;

interface CommentSectionProps {
  postId: string;
  totalComments: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  totalComments,
}) => {
  const currentUser = useAppSelector(selectCurrentUser);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("cpage") || "1", 10);

  const getCommentsParams = {
    postId,
    skip: (page - 1) * COMMENTS_PER_PAGE,
    take: COMMENTS_PER_PAGE,
    sortBy: "createdAt" as const,
    order: "desc" as const,
  };

  const {
    data: commentsResponse,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetCommentsForPostQuery(getCommentsParams, {
    skip: !postId,
  });

  const [createComment, { isLoading: isCreating, error: createError }] =
    useCreateCommentOnPostMutation();

  const handleCreateComment = async (text: string) => {
    await createComment({ postId, text }).unwrap();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        variant="destructive"
        className="rounded-none border-3 border-double"
      >
        <AlertTriangle className="h-5 w-5" />
        <AlertTitle>Error Loading Comments</AlertTitle>
        <AlertDescription>
          {(error as any)?.data?.message || "An unknown error occurred."}
        </AlertDescription>
      </Alert>
    );
  }

  const comments = commentsResponse?.data || [];
  const pagination = commentsResponse?.pagination;

  return (
    <section
      aria-labelledby="comments-heading "
      className="w-full flex flex-col gap-9"
    >
      <div className="bg-card border-3 border-double p-3 ">
        {currentUser ? (
          <CommentForm
            onSubmit={handleCreateComment}
            isLoading={isCreating}
            submitError={(createError as any)?.data?.message}
          />
        ) : (
          <Card className="text-center rounded-none border-3 border-double">
            <CardContent className="p-6 ">
              <p className="text-muted-foreground">
                You are not logged in. Please{" "}
                <Link
                  href="/auth/login"
                  className="text-primary font-medium underline"
                >
                  Log in
                </Link>{" "}
                to post a comment.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className=" space-y-6 relative">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-center text-muted-foreground ">
            Be the first to share your thoughts!
          </p>
        )}
      </div>

      {/*
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-4">
          <Button asChild variant="outline" size="sm" className="rounded-none">
            <Link
              href={`?cpage=${page - 1}`}
              scroll={false}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            >
              Previous
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <Button asChild variant="outline" size="sm" className="rounded-none">
            <Link
              href={`?cpage=${page + 1}`}
              scroll={false}
              className={
                !pagination.hasMore ? "pointer-events-none opacity-50" : ""
              }
            >
              Next
            </Link>
          </Button>
        </div>
      )} */}
    </section>
  );
};

export default CommentSection;
