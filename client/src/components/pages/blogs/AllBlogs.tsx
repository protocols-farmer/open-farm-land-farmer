"use client";

import PostFilterPage from "../posts/PostFilterPage";
import { Library } from "lucide-react";

export default function AllBlogs() {
  return (
    <PostFilterPage
      title="Blogs"
      subtitle="A collection of insightful blogs and articles."
      icon={Library}
      searchPlaceholder="Search blogs..."
      category="BLOG" // This is the only required change for a new page
    />
  );
}
