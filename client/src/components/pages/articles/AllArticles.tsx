//src/components/pages/articles/AllArticles.tsx

"use client";

import PostFilterPage from "../posts/PostFilterPage";
import { Library } from "lucide-react";

export default function AllArticles() {
  return (
    <PostFilterPage
      title="Articles"
      subtitle="A collection of insightful articles and research papers."
      icon={Library}
      searchPlaceholder="Search articles..."
      category="ARTICLE" // This is the only required change for a new page
    />
  );
}
