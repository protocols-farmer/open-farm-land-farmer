//src/components/pages/notifications/Notifications.tsx
"use client";

import React from "react";
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
} from "@/lib/features/notifications/notificationsApiSlice";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCheck, BellOff, Loader2 } from "lucide-react";
import NotificationItem from "./NotificationItem";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";

export default function Notifications() {
  const { data, isLoading, isError, refetch } = useGetNotificationsQuery();
  const [markAllAsRead, { isLoading: isMarkingAll }] =
    useMarkAllAsReadMutation();

  const notifications = data?.data || [];

  const handleMarkAll = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success("All notifications caught up!");
    } catch (err) {
      toast.error("Failed to update notifications");
    }
  };

  if (isLoading) return <NotificationsSkeleton />;

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on your guild activity.
          </p>
        </div>
        {notifications.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAll}
            disabled={isMarkingAll || !notifications.some((n) => !n.read)}
          >
            {isMarkingAll ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCheck className="mr-2 h-4 w-4" />
            )}
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card className="p-12 flex flex-col items-center justify-center text-center border-dashed">
          <div className="bg-muted p-4 rounded-full mb-4">
            <BellOff className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">Quiet in the guild...</h3>
          <p className="text-muted-foreground max-w-xs mt-2">
            You don't have any notifications yet. Start exploring and following
            others to see activity!
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Simple Skeleton for Loading state
function NotificationsSkeleton() {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 space-y-4">
      <div className="h-12 w-48 bg-muted animate-pulse rounded-md mb-8" />
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-20 w-full rounded-xl" />
      ))}
    </div>
  );
}
