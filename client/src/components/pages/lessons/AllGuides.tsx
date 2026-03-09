//src/components/pages/lessons/AllGuides.tsx
"use client";

import PostFilterPage from "../posts/PostFilterPage";
import { Sprout } from "lucide-react";

export default function AllGuides() {
  return (
    <PostFilterPage
      title="Guides"
      subtitle="A collection of guides, tutorials, and structured lessons."
      icon={Sprout}
      searchPlaceholder="Search guides..."
      category="GUIDE"
    />
  );
}
