"use client";

import PostFilterPage from "../posts/PostFilterPage";
import { Library } from "lucide-react";

export default function AllDiscussions() {
  return (
    <PostFilterPage
      title="Discussions"
      subtitle="A collection of engaging discussions and community insights."
      icon={Library}
      searchPlaceholder="Search discussions..."
      category="DISCUSSION" // This is the only required change for a new page
    />
  );
}
