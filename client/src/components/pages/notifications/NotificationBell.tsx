"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useGetUnreadCountQuery } from "@/lib/features/notifications/notificationsApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { cn } from "@/lib/utils";

export default function NotificationBell() {
  const currentUser = useAppSelector(selectCurrentUser);

  // Only poll if the user is actually logged in
  const { data } = useGetUnreadCountQuery(undefined, {
    pollingInterval: 60000, // Check for new alerts every 60 seconds
    skip: !currentUser,
  });

  const unreadCount = data?.data?.unreadCount || 0;

  return (
    <Link
      href="/notifications"
      className="relative flex h-9 w-9 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-muted"
    >
      <Bell className="h-5 w-5 text-foreground" />

      {unreadCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
