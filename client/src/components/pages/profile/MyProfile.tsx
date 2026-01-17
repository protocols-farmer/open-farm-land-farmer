//src/components/pages/profile/MyProfile.tsx
"use client";

import React, { useState } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import ProfileHeader from "./ProfileHeader";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import DangerZone from "./DangerZone";
import ProfileCompletionBanner from "./ProfileCompletionBanner"; // Our new component
import AuthRequiredCard from "@/components/shared/AuthRequiredCard";

export default function MyProfilePage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);

  if (!currentUser) {
    return (
      <div className="container mx-auto py-20">
        <AuthRequiredCard
          title="Profile Settings"
          description="You need to log in to manage your guild settings."
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {isEditing ? (
        <ProfileForm
          user={currentUser}
          onFinishedEditing={() => setIsEditing(false)}
        />
      ) : (
        <div className="space-y-12 animate-in fade-in duration-700">
          {/* 1. Modular Completion Banner */}
          <ProfileCompletionBanner
            user={currentUser}
            onEdit={() => setIsEditing(true)}
          />

          {/* 2. Hero Identity */}
          <ProfileHeader user={currentUser} onEdit={() => setIsEditing(true)} />

          {/* 3. Account Settings */}
          <div className="space-y-12 pt-12 border-t border-border/50">
            <ChangePasswordForm />
            <DangerZone />
          </div>
        </div>
      )}
    </div>
  );
}
