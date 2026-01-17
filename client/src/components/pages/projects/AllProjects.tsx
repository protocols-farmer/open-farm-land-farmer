//src/components/pages/projects/AllProjects.tsx
"use client";

import PostFilterPage from "../posts/PostFilterPage";
import { Library } from "lucide-react";

export default function AllProjects() {
  return (
    <PostFilterPage
      title=" Projects"
      subtitle=" A collection of innovative projects and collaborations."
      icon={Library}
      searchPlaceholder="Search showcases..."
      category="PROJECT" // This is the only required change for a new page
    />
  );
}
