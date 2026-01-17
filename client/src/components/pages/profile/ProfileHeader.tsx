"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  Twitter,
  Github,
  Link as LinkIcon,
  MapPin,
  Calendar,
  Edit3,
  ImageIcon,
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SanitizedUserDto } from "@/lib/features/user/userTypes";

const getInitials = (name: string | null | undefined): string => {
  if (!name) return "?";
  const words = name.split(" ").filter(Boolean);
  return (
    (words[0]?.charAt(0) ?? "") +
    (words.length > 1 ? words[words.length - 1]?.charAt(0) ?? "" : "")
  ).toUpperCase();
};

interface ProfileHeaderProps {
  user: SanitizedUserDto;
  onEdit: () => void;
}

export default function ProfileHeader({ user, onEdit }: ProfileHeaderProps) {
  return (
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
          <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-slate-900 to-black opacity-80 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-white/20" />
          </div>
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
            {/* Link to your separate activity page */}
            <Button
              variant="outline"
              asChild
              className="rounded-full px-6 h-11 font-semibold shadow-sm"
            >
              <Link href="/posts/my">
                <LayoutGrid className="mr-2 h-4 w-4" /> My Posts
              </Link>
            </Button>

            {/* Your existing Edit button */}
            <Button
              onClick={onEdit}
              className="rounded-full px-8 h-11 font-semibold shadow-md"
            >
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
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

          <div className="flex flex-wrap gap-y-3 gap-x-8 text-sm font-semibold text-muted-foreground/80">
            <div className="flex items-center gap-6 pt-1 md:pt-0">
              <span className="text-foreground">
                <b className="text-xl">{user.followersCount ?? 0}</b> Followers
              </span>
              <span className="text-foreground">
                <b className="text-xl">{user.followingCount ?? 0}</b> Following
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

          {/* Social Links */}
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
  );
}
