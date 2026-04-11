// src/components/pages/profile/FollowListModal.tsx
"use client";

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
  if (!name) return "?";
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
  const { data: followersData, isLoading: isLoadingFollowers } =
    useGetFollowersQuery(userId, { skip: type !== "followers" || !isOpen });

  const { data: followingData, isLoading: isLoadingFollowing } =
    useGetFollowingQuery(userId, { skip: type !== "following" || !isOpen });

  const isLoading =
    type === "followers" ? isLoadingFollowers : isLoadingFollowing;

  const users =
    type === "followers"
      ? followersData?.data?.map((f: any) => f.follower) || []
      : followingData?.data?.map((f: any) => f.following) || [];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-none border-border shadow-xl">
        <DialogHeader>
          <DialogTitle className="capitalize text-xl font-black tracking-tight">
            {type}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[60vh] overflow-y-auto pr-2 -mr-2 space-y-2 mt-4 custom-scrollbar">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <div className="bg-muted p-4 rounded-full mb-4">
                <UserX className="h-8 w-8 opacity-40" />
              </div>
              <p className="font-medium">No {type} found.</p>
              <p className="text-xs opacity-60">
                This guild seems quiet for now.
              </p>
            </div>
          ) : (
            users.map((user) => (
              <Link
                key={user.id}
                href={`/profile/${user.username}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 hover:bg-muted/50 transition-all group border border-transparent hover:border-border"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-11 w-11 border border-border shadow-sm">
                    <AvatarImage
                      src={user.profileImage ?? ""}
                      className="object-cover"
                    />
                    <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-black group-hover:text-primary transition-colors leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-mono">
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
