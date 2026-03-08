//src/components/layouts/AuthInitializer.tsx
"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import {
  selectIsAuthenticated,
  selectIsHydrated,
  setCredentials,
  completeHydration,
  clearCredentials,
} from "@/lib/features/auth/authSlice";
import { useGetMeQuery } from "@/lib/features/user/userApiSlice";
import { authStorage } from "@/lib/auth/authStorage";
import { Loader2, RefreshCw } from "lucide-react";
import VerificationBanner from "../pages/auth/VerificationBanner";

/**
 * AuthInitializer
 * Manages the "Hydration" of the auth state and ensures the profile is synced.
 * Uses a "Fail-Open" strategy to ensure the app remains accessible even if sync fails.
 */
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
      // Signals to the UI that storage check is finished
      dispatch(completeHydration());
    }
  }, [dispatch]);

  // 3. Fetch profile only if we have a token
  const { isLoading, isError, error } = useGetMeQuery(undefined, {
    skip: !isHydrated || !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  /**
   * 🚜 RECOVERY EFFECT
   * If the profile sync fails (e.g., 404 User Not Found or 500 Server Error),
   * we clear credentials to revert to guest mode. This prevents the loading screen
   * from holding the entire app hostage.
   */
  useEffect(() => {
    if (isError) {
      const status = (error as any)?.status;
      // 401 errors are handled by baseQueryWithReauth.
      // We handle other errors (500, 503, 404) here to "unblock" the UI.
      if (status !== 401) {
        console.warn("Auth sync failed. Reverting to guest mode.");
        dispatch(clearCredentials());
      }
    }
  }, [isError, error, dispatch]);

  /**
   * SHOW SPINNER ONLY IF:
   * - Still reading from storage (!isHydrated)
   * - Waiting for DB profile fetch (isAuthenticated && isLoading)
   * NOTE: If an error occurs, the effect above clears 'isAuthenticated',
   * which automatically resolves this loading state on the next render.
   */
  if (!isHydrated || (isAuthenticated && isLoading)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background animate-in fade-in duration-500">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-6" />

        <div className="text-center space-y-2">
          <p className="text-sm font-black tracking-tighter uppercase italic">
            Synchronizing profile
          </p>
          <p className="text-[11px] text-muted-foreground animate-pulse font-medium uppercase tracking-widest">
            Handshaking with the farm...
          </p>
        </div>

        {/* 🚜 Fail-Safe: Manual escape for users on extremely slow networks */}
        <button
          onClick={() => dispatch(clearCredentials())}
          className="mt-12 group flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 hover:text-primary transition-all active:scale-95"
        >
          <RefreshCw className="h-3 w-3 transition-transform group-hover:rotate-180 duration-500" />
          Continue as guest
        </button>
      </div>
    );
  }

  return (
    <>
      {/* VerificationBanner stays at the top level for global visibility */}
      <VerificationBanner />
      {children}
    </>
  );
}
