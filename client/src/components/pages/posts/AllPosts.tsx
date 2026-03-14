//src/components/pages/posts/AllPosts.tsx
"use client";

import PostFilterPage from "./PostFilterPage";
import { LayoutGrid } from "lucide-react";

export default function AllPosts() {
  return (
    <PostFilterPage
      title="All Posts"
      subtitle="Explore articles, projects, and resources from across the community."
      icon={LayoutGrid}
      searchPlaceholder="Search all posts..."
    />
  );
}
