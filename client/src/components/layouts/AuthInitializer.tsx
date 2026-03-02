//src/components/layouts/AuthInitializer.tsx

"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import {
  selectIsAuthenticated,
  selectIsHydrated,
  setCredentials,
  completeHydration,
} from "@/lib/features/auth/authSlice";
import { useGetMeQuery } from "@/lib/features/user/userApiSlice";
import { authStorage } from "@/lib/auth/authStorage";
import { Loader2 } from "lucide-react";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  // 1. Get status directly from Redux
  const isHydrated = useAppSelector(selectIsHydrated);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // 2. Run the hydration check on mount
  useEffect(() => {
    const token = authStorage.getToken();
    if (token) {
      dispatch(setCredentials({ token }));
    } else {
      // This is what was missing! It tells the UI "I'm done checking, show the buttons"
      dispatch(completeHydration());
    }
  }, [dispatch]);

  // 3. Fetch profile only if we have a token
  const { isLoading } = useGetMeQuery(undefined, {
    skip: !isHydrated || !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  /**
   * SHOW SPINNER ONLY IF:
   * - We are still reading from storage (!isHydrated)
   * - OR we have a token but are waiting for the initial DB profile fetch (isLoading)
   */
  if (!isHydrated || (isAuthenticated && isLoading)) {
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
