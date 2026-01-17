// src/components/layouts/AuthInitializer.tsx
"use client";

import { useSession } from "next-auth/react";
import { useGetMeQuery } from "@/lib/features/user/userApiSlice";
import { Loader2 } from "lucide-react";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  // We fetch the fresh DB profile.
  // userSlice.extraReducers will catch this and update Redux automatically.
  const { isLoading } = useGetMeQuery(undefined, {
    skip: status !== "authenticated",
    refetchOnMountOrArgChange: 60,
  });

  /**
   * IMPORTANT: We only show the loader during the INITIAL boot.
   * If status is 'authenticated' but RTK Query is fetching the profile for the first time,
   * we show the spinner to prevent the user from seeing "null" bio/images.
   */
  if (status === "loading" || (status === "authenticated" && isLoading)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Synchronizing profile...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
