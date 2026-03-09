//src/components/layouts/header/UserAccountNav.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { LogOut, Settings, User, Bookmark, Loader2 } from "lucide-react";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { selectIsHydrated } from "@/lib/features/auth/authSlice"; // Added
import { useLogoutMutation } from "@/lib/features/auth/authApiSlice";
import { clearCredentials } from "@/lib/features/auth/authSlice";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getInitials = (name: string | null | undefined): string => {
  if (!name) return "U";
  const words = name.split(" ").filter(Boolean);
  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
};

export function UserAccountNav() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isHydrated = useAppSelector(selectIsHydrated); // Added
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const pImage = currentUser?.profileImage;
  const uAt = currentUser?.updatedAt;

  const avatarUrl = useMemo(() => {
    if (!pImage || !uAt) return undefined;
    const timestamp = new Date(uAt).getTime();
    return `${pImage}?t=${timestamp}`;
  }, [pImage, uAt]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(clearCredentials());
      window.location.assign("/");
    }
  };

  // --- THE FLICKER GUARD ---
  if (!isHydrated) {
    return <div className="h-9 w-20  bg-muted animate-pulse" />;
  }

  if (!currentUser) {
    return (
      <Button asChild variant="default" size="sm" className="rounded-none">
        <Link href="/auth/login">Log In</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-none relative h-9 w-9  ring-offset-background transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Avatar className="h-9 w-9" key={avatarUrl}>
            <AvatarImage
              src={avatarUrl}
              alt={currentUser.name ?? "User"}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              className={cn(
                "aspect-square h-full w-full transition-opacity duration-300",
                isImageLoading ? "opacity-0" : "opacity-100",
              )}
            />
            <AvatarFallback
              className={cn(
                "font-medium",
                isImageLoading && "animate-pulse bg-muted",
              )}
            >
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold text-foreground truncate">
              {currentUser.name}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentUser.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/profile/${currentUser.username}`}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/saved">
              <Bookmark className="mr-2 h-4 w-4" />
              <span>Saved Items</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild className="cursor-pointer">
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
        >
          {isLoggingOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          <span>{isLoggingOut ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
