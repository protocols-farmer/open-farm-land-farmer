//src/components/pages/liked/AllLiked.tsx
"use client";

import PostFilterPage from "@/components/pages/posts/PostFilterPage";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { Heart } from "lucide-react";
import PleaseLogin from "@/components/shared/PleaseLogin";
import AuthRequiredCard from "@/components/shared/AuthRequiredCard";

export default function AllLiked() {
  const currentUser = useAppSelector(selectCurrentUser);

  if (!currentUser) {
    return (
      <AuthRequiredCard
        title="Access Locked"
        description="Please log in to see your liked posts."
      />
    );
  }
  return (
    <PostFilterPage
      title="Liked Posts"
      subtitle="A collection of posts you have liked across the platform."
      icon={Heart}
      searchPlaceholder="Search your liked posts..."
      likedByUserId={currentUser.id}
    />
  );
}
