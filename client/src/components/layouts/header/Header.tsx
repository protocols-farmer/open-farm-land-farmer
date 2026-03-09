//src/components/layouts/header/Header.tsx

"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import MobileSidebar from "@/components/layouts/sidebar/MobileSidebar";
import ThemeToggler from "./ThemeToggler";
import { UserNav } from "./UserNav";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { selectIsHydrated } from "@/lib/features/auth/authSlice"; // Added
import NotificationBell from "@/components/pages/notifications/NotificationBell";

export default function Header() {
  const currentUser = useAppSelector(selectCurrentUser);
  const isHydrated = useAppSelector(selectIsHydrated); // Added

  return (
    <header className="w-full  border bg-background/60 shadow-sm backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between px-4">
        {/* === Left Side === */}
        <div className="flex items-center gap-4">
          <MobileSidebar />

          <div className="hidden sm:block">
            {/* Logic check: Only show user name if hydrated AND user exists */}
            {isHydrated && currentUser ? (
              <h1 className="text-lg font-semibold text-foreground">
                Welcome back,{" "}
                <span className="text-primary">{currentUser.name}</span>
              </h1>
            ) : (
              <h1 className="text-lg font-semibold text-foreground">
                Welcome to Open Farm Land
              </h1>
            )}
          </div>
        </div>

        {/* === Right Side === */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggler />
          {/* Only show these if hydrated and user is logged in */}
          {isHydrated && currentUser && <NotificationBell />}
          {isHydrated ? (
            <UserNav />
          ) : (
            <div className="h-9 w-9  bg-muted animate-pulse" />
          )}
        </div>
      </div>
    </header>
  );
}
