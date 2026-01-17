//src/components/pages/projects/ProjectInteractionHub.tsx
"use client";

import { PostDto } from "@/lib/features/post/postTypes";
import ActionButtons from "./ActionButtons";
import PostStatsBar from "./PostStatsBar";

interface ProjectInteractionHubProps {
  post: PostDto;
}

export default function ProjectInteractionHub({
  post,
}: ProjectInteractionHubProps) {
  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      {/* === THIS IS THE FIX === */}
      {/* Only pass the props that PostStatsBar is designed to receive */}
      <PostStatsBar
        viewsCount={post.viewsCount}
        commentsCount={post.commentsCount}
      />

      {/* ActionButtons already receives the full post object with all counts */}
      <ActionButtons post={post} />
    </div>
  );
}
