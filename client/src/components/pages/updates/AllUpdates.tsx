//src/components/pages/updates/AllUpdates.tsx
"use client";

import React from "react";
import { useGetUpdatesQuery } from "@/lib/features/updates/updateApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import UpdateCard from "./UpdateCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Megaphone,
  AlertTriangle,
  PlusCircle,
  MailWarning,
  Sparkles,
  CloudSun,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function AllUpdatesPage() {
  const { data: updatesResponse, isLoading, isError } = useGetUpdatesQuery();
  const currentUser = useAppSelector(selectCurrentUser);

  const updates = updatesResponse?.data || [];
  const isVerified = currentUser?.isEmailVerified;

  const canCreate =
    currentUser?.systemRole === SystemRole.DEVELOPER ||
    currentUser?.systemRole === SystemRole.SUPER_ADMIN ||
    currentUser?.systemRole === SystemRole.SYSTEM_CONTENT_CREATOR;

  const handleCreateClick = (e: React.MouseEvent) => {
    if (!isVerified) {
      e.preventDefault();
      toast.error("Verify your email to publish system updates.", {
        icon: <MailWarning className="h-4 w-4 text-destructive" />,
        id: "update-verify-gate",
      });
    }
  };

  return (
    <div className="container mx-auto py-12 md:py-20 animate-in fade-in duration-500">
      <div className="mb-16  space-y-4">
        <div className="flex items-center gap-3">
          <CloudSun className="h-8 w-8 text-primary" />

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground">
            Latest updates
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Stay updated with the latest news, features, and structural logs
          harvested from the ecosystem.
        </p>

        {canCreate && (
          <Button
            asChild
            className={cn(
              "rounded-none font-bold ",
              !isVerified && "opacity-50 grayscale cursor-not-allowed",
            )}
          >
            <Link href="/updates/create" onClick={handleCreateClick}>
              <PlusCircle className="mr-2 h-5 w-5" />
              {isVerified ? "Create new update" : "Verify email to post"}
            </Link>
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-8 border  space-y-6 bg-card/50">
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-20 " />
                <Skeleton className="h-6 w-12 " />
              </div>
              <Skeleton className="h-8 w-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-20 bg-destructive/5 border border-destructive/10 ">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive opacity-50" />
          <h2 className="text-xl font-bold mt-4 text-foreground">
            Failed to load system logs
          </h2>
          <p className="text-muted-foreground mt-2">
            We couldn't reach the database. Try refreshing the farm.
          </p>
        </div>
      )}

      {!isLoading && !isError && updates.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updates.map((update) => (
            <UpdateCard key={update.id} update={update} />
          ))}
        </div>
      )}

      {!isLoading && !isError && updates.length === 0 && (
        <div className="text-center py-24 border-2 border-dashed border-border  bg-muted/5">
          <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground font-medium">
            No updates have been harvested yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
