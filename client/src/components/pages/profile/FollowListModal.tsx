// src/components/pages/profile/FollowListModal.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Loader2, UserX } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
} from "@/lib/features/user/userApiSlice";

const getInitials = (name: string) => {
  const words = name.split(" ").filter(Boolean);
  return (
    (words[0]?.charAt(0) ?? "") +
    (words.length > 1 ? (words[words.length - 1]?.charAt(0) ?? "") : "")
  ).toUpperCase();
};

interface FollowListModalProps {
  userId: string;
  type: "followers" | "following" | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FollowListModal({
  userId,
  type,
  isOpen,
  onClose,
}: FollowListModalProps) {
  // We unconditionally call both, but use 'skip' to only run the one we need
  const { data: followersData, isLoading: isLoadingFollowers } =
    useGetFollowersQuery(userId, { skip: type !== "followers" || !isOpen });

  const { data: followingData, isLoading: isLoadingFollowing } =
    useGetFollowingQuery(userId, { skip: type !== "following" || !isOpen });

  const isLoading =
    type === "followers" ? isLoadingFollowers : isLoadingFollowing;

  // Map the nested Prisma relation data to a flat array of users
  const users =
    type === "followers"
      ? followersData?.data?.map((f) => f.follower) || []
      : followingData?.data?.map((f) => f.following) || [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="capitalize text-xl font-bold">
            {type}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto pr-2 -mr-2 space-y-4 mt-2 custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <UserX className="h-10 w-10 mb-3 opacity-20" />
              <p>No {type} found.</p>
            </div>
          ) : (
            users.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                onClick={onClose}
                className="flex items-center justify-between p-2 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={user.profileImage ?? ""} />
                    <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold group-hover:underline">
                      {user.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      @{user.username}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
