"use client";

import PostFilterPage from "@/components/pages/posts/PostFilterPage";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { FolderKanban } from "lucide-react";
import PleaseLogin from "@/components/shared/PleaseLogin";
import AuthRequiredCard from "@/components/shared/AuthRequiredCard";

export default function MyPosts() {
  const currentUser = useAppSelector(selectCurrentUser);

  if (!currentUser) {
    return (
      <AuthRequiredCard
        title="Workbench Locked"
        description="Please log in to see the content you have created."
        actionText="to access your workspace"
      />
    );
  }
  return (
    <PostFilterPage
      title="My Posts"
      subtitle="A collection of all the content you have created."
      icon={FolderKanban}
      searchPlaceholder="Search your posts..."
      authorId={currentUser.id} // <-- PASS THE USER'S ID HERE
    />
  );
}
