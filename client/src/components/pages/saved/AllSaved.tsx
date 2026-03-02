"use client";

import PostFilterPage from "@/components/pages/posts/PostFilterPage";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { Bookmark } from "lucide-react";
import PleaseLogin from "@/components/shared/PleaseLogin";
import AuthRequiredCard from "@/components/shared/AuthRequiredCard";

export default function AllSaved() {
  const currentUser = useAppSelector(selectCurrentUser);

  if (!currentUser) {
    return (
      <AuthRequiredCard
        title="Collection Locked"
        description="Please log in to see your personal collection of saved items."
        actionText="to access your library"
      />
    );
  }
  return (
    <PostFilterPage
      title="Saved Posts"
      subtitle="Your personal collection of saved items for later."
      icon={Bookmark}
      searchPlaceholder="Search your saved posts..."
      savedByUserId={currentUser.id} // <-- PASS THE USER'S ID HERE
    />
  );
}
