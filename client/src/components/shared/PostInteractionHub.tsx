//src/components/shared/PostInteractionHub.tsx
"use client";

import { PostDto } from "@/lib/features/post/postTypes";
import ActionButtons from "./ActionButtons";
import PostStatsBar from "./PostStatsBar";
import { CornerFlourish, FlourishOrnate, SideFlourish } from "./Ornates";

interface PostInteractionHubProps {
  post: PostDto;
}

export default function PostInteractionHub({ post }: PostInteractionHubProps) {
  return (
    <div className="flex flex-col  gap-2 border-3 border-double bg-card p-3 relative  h-[100px]">
      <CornerFlourish className="-top-1 -left-1 rotate-0 z-20" />
      <CornerFlourish className="-top-1 -right-1 rotate-90 z-20" />
      <CornerFlourish className="-bottom-1 -left-1 -rotate-90 z-20" />
      <CornerFlourish className="-bottom-1 -right-1 rotate-180 z-20" />

      <FlourishOrnate className="-top-2 -left-2 -rotate-90 z-20" />
      <FlourishOrnate className="-top-2 -right-2 rotate-0 z-20" />
      <FlourishOrnate className="-bottom-2 -right-2 rotate-90 z-20" />
      <FlourishOrnate className="-bottom-2 -left-2 rotate-180 z-20" />

      <SideFlourish className="-top-2 left-1/2 -translate-x-1/2 bg-card px-2 z-20" />
      <SideFlourish className="-bottom-2 left-1/2 -translate-x-1/2 rotate-180 bg-card px-2 z-20" />
      <SideFlourish className="-left-[14px] top-1/2 -translate-y-1/2 -rotate-90 bg-card px-2 z-20" />
      <SideFlourish className="-right-[14px] top-1/2 -translate-y-1/2 rotate-90 bg-card px-2 z-20" />

      <PostStatsBar
        viewsCount={post.viewsCount}
        commentsCount={post.commentsCount}
      />
      <ActionButtons post={post} />
    </div>
  );
}
