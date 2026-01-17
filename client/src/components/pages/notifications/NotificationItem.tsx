//src/components/pages/notifications/NotificationItem.tsx
"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  useMarkAsReadMutation,
  Notification,
} from "@/lib/features/notifications/notificationsApiSlice";
import { UserPlus, Heart, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const [markAsRead] = useMarkAsReadMutation();

  const handleItemClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  // Helper to render the correct icon/message based on type
  const renderContent = () => {
    switch (notification.type) {
      case "NEW_FOLLOWER":
        return {
          icon: <UserPlus className="h-4 w-4 text-blue-500" />,
          text: "started following you",
          link: `/profile/${notification.sender.username}`,
        };
      // You can add LIKES or COMMENTS here later
      default:
        return { icon: null, text: "sent you a notification", link: "#" };
    }
  };

  const content = renderContent();

  return (
    <Link
      href={content.link}
      onClick={handleItemClick}
      className={cn(
        "flex items-center gap-4 p-4 rounded-xl border transition-all hover:bg-muted/50",
        notification.read
          ? "bg-background opacity-75"
          : "bg-primary/5 border-primary/20 shadow-sm"
      )}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={notification.sender.profileImage || ""} />
          <AvatarFallback>{notification.sender.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border shadow-sm">
          {content.icon}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm leading-none">
          <span className="font-bold text-foreground">
            {notification.sender.name || notification.sender.username}
          </span>{" "}
          <span className="text-muted-foreground">{content.text}</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      {!notification.read && (
        <div className="h-2 w-2 rounded-full bg-primary" />
      )}
    </Link>
  );
}
