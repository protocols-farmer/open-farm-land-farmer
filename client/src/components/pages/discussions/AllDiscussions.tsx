//src/components/pages/discussions/AllDiscussions.tsx
"use client";

import PostFilterPage from "../posts/PostFilterPage";
import { MessageSquare } from "lucide-react";

export default function AllDiscussions() {
  return (
    <PostFilterPage
      title="Discussions"
      subtitle="A collection of engaging discussions and community insights."
      icon={MessageSquare}
      searchPlaceholder="Search discussions..."
      category="DISCUSSION"
    />
  );
}
