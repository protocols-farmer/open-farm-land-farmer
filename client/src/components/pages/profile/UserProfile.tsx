"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import toast from "react-hot-toast";
import {
  Twitter,
  Github,
  Link as LinkIcon,
  MapPin,
  Calendar,
  LayoutGrid,
  Share2,
  Check,
  UserX,
  ArrowLeft,
  Edit3,
  UserPlus,
  UserMinus,
  Loader2,
} from "lucide-react";

// --- RTK Query & State ---
// FIXED: All hooks MUST come from userApiSlice to share the same cache brain
import {
  useGetUserByUsernameQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "@/lib/features/user/userApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";

// --- UI Components ---
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import PostFilterPage from "@/components/pages/posts/PostFilterPage";

// --- INTERNAL HELPERS ---
const getInitials = (name: string | null | undefined): string => {
  if (!name) return "?";
  const words = name.split(" ").filter(Boolean);
  return (
    (words[0]?.charAt(0) ?? "") +
    (words.length > 1 ? words[words.length - 1]?.charAt(0) ?? "" : "")
  ).toUpperCase();
};

/**
 * 1. INTERNAL SKELETON
 */
const UserProfileSkeleton = () => (
  <div className="container mx-auto py-8 space-y-8 max-w-6xl">
    <div className="space-y-6">
      <Skeleton className="h-48 w-full md:h-72 rounded-3xl" />
      <div className="px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end -mt-16 gap-4">
          <Skeleton className="h-32 w-32 md:h-40 md:w-40 rounded-full border-8 border-background" />
          <div className="flex gap-2 pb-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
        </div>
        <div className="mt-8 space-y-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-20 w-full max-w-3xl mt-4" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * 2. INTERNAL NOT FOUND
 */
const UserNotFoundView = ({ username }: { username: string }) => (
  <div className="container mx-auto py-20 flex flex-col items-center text-center">
    <div className="bg-muted p-8 rounded-full mb-6">
      <UserX className="h-12 w-12 text-muted-foreground" />
    </div>
    <h2 className="text-3xl font-bold tracking-tight">Wanderer Not Found</h2>
    <p className="text-muted-foreground mt-2 max-w-md">
      The explorer{" "}
      <span className="text-foreground font-mono">@{username}</span> could not
      be found.
    </p>
    <Button asChild className="mt-8" variant="outline">
      <Link href="/">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Campfire
      </Link>
    </Button>
  </div>
);

/**
 * 3. MAIN USER PROFILE COMPONENT
 */
export default function UserProfile() {
  const params = useParams();
  const username = (params.slug || params.username) as string;
  const currentUser = useAppSelector(selectCurrentUser);
  const [isCopied, setIsCopied] = useState(false);

  // Fetch profile data
  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByUsernameQuery(username, {
    skip: !username,
    refetchOnMountOrArgChange: true,
  });

  // Mutations - isLoading provides that "Honest" loader feel
  const [followUser, { isLoading: isFollowing }] = useFollowUserMutation();
  const [unfollowUser, { isLoading: isUnfollowing }] =
    useUnfollowUserMutation();

  if (isLoading) return <UserProfileSkeleton />;
  if (isError || !user) return <UserNotFoundView username={username} />;

  const isMyProfile = currentUser?.id === user.id;

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/profile/${user.username}`;
    try {
      await navigator.clipboard.writeText(profileUrl);
      setIsCopied(true);
      toast.success("Profile link copied!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleFollowToggle = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to follow users");
      return;
    }

    try {
      if (user.isFollowedByCurrentUser) {
        await unfollowUser(user.id).unwrap();
        toast.success(`Unfollowed ${user.name}`);
      } else {
        await followUser(user.id).unwrap();
        toast.success(`Following ${user.name}`);
      }
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      toast.error(apiError?.data?.message || "Action failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-12">
      <section className="relative">
        {/* Banner */}
        <div className="relative h-48 w-full bg-slate-900 rounded-3xl overflow-hidden md:h-72 shadow-inner">
          {user.bannerImage ? (
            <Image
              src={user.bannerImage}
              alt="Banner"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-80" />
          )}
        </div>

        <div className="px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end -mt-12 md:-mt-20 gap-4">
            <Avatar className="h-32 w-32 md:h-44 md:w-44 border-8 border-background shadow-2xl">
              <AvatarImage
                src={user.profileImage ?? ""}
                className="object-cover"
              />
              <AvatarFallback className="text-4xl bg-primary text-primary-foreground font-bold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex gap-3 pb-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-11 w-11 shadow-sm"
                onClick={handleShare}
              >
                {isCopied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Share2 className="h-5 w-5" />
                )}
              </Button>

              {isMyProfile ? (
                <Button
                  asChild
                  className="rounded-full px-8 h-11 font-semibold shadow-md"
                >
                  <Link href="/profile">
                    <Edit3 className="mr-2 h-4 w-4" /> Edit My Profile
                  </Link>
                </Button>
              ) : (
                <Button
                  onClick={handleFollowToggle}
                  disabled={isFollowing || isUnfollowing}
                  className="rounded-full px-10 h-11 font-semibold shadow-md min-w-[140px]"
                  variant={
                    user.isFollowedByCurrentUser ? "secondary" : "default"
                  }
                >
                  {isFollowing || isUnfollowing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : user.isFollowedByCurrentUser ? (
                    <>
                      <UserMinus className="mr-2 h-4 w-4" /> Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" /> Follow
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-foreground">
                {user.name}
              </h1>
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <span>@{user.username}</span>
                {user.title && (
                  <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {user.title}
                  </span>
                )}
              </div>
            </div>

            {user.bio && (
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                {user.bio}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex flex-wrap gap-y-3 gap-x-8 text-sm font-semibold text-muted-foreground/80">
              <div className="flex items-center gap-6 pt-1 md:pt-0">
                <span className="text-foreground">
                  <b className="text-xl">{user.followersCount ?? 0}</b>{" "}
                  Followers
                </span>
                <span className="text-foreground">
                  <b className="text-xl">{user.followingCount ?? 0}</b>{" "}
                  Following
                </span>
                <span className="text-foreground">
                  <b className="text-xl">{user._count?.posts ?? 0}</b> Posts
                </span>
              </div>
              <div className="flex items-center gap-6">
                {user.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" /> {user.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-primary" /> Joined{" "}
                  {format(new Date(user.joinedAt), "MMMM yyyy")}
                </span>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-2">
              {user.githubUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10"
                  asChild
                >
                  <Link href={user.githubUrl} target="_blank">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {user.twitterUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10"
                  asChild
                >
                  <Link href={user.twitterUrl} target="_blank">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              {user.websiteUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10"
                  asChild
                >
                  <Link href={user.websiteUrl} target="_blank">
                    <LinkIcon className="h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 border-t">
        <PostFilterPage
          title="Activity Log"
          subtitle={`Everything shared by ${user.name}`}
          icon={LayoutGrid}
          authorId={user.id}
          searchPlaceholder={`Search within @${user.username}'s posts...`}
        />
      </section>
    </div>
  );
}
