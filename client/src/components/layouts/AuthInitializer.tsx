//src/components/layouts/AuthInitializer.tsx
"use client";

import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/hooks";
import {
  selectIsHydrated,
  completeHydration,
  setCredentials,
} from "@/lib/features/auth/authSlice";
import { useGetMeQuery } from "@/lib/features/user/userApiSlice";
import { Settings } from "lucide-react";
import VerificationBanner from "../pages/auth/VerificationBanner";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const isHydrated = useAppSelector(selectIsHydrated);

  /**
   * 🛡️ INITIAL SESSION CHECK
   * We trigger getMe immediately.
   * 1. If the browser has valid cookies, this succeeds.
   * 2. If no cookies exist, this returns a 401.
   * * Note: We don't 'skip' anymore because we need to check the cookie status.
   */
  const { isLoading, isSuccess, isError } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    // Once the API call finishes (success or error)
    if (!isLoading) {
      if (isSuccess) {
        // We found a valid session cookie
        dispatch(setCredentials());
      }
      // Signal that the app has finished its initial security check
      dispatch(completeHydration());
    }
  }, [isLoading, isSuccess, dispatch]);

  /**
   * SHOW LOADING SCREEN:
   * We show this until the initial getMe call is finished.
   * This prevents the "Layout Flicker" where guests see logged-in UI elements.
   */
  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background animate-in fade-in duration-500">
        <div className="mx-auto flex w-full max-w-105 flex-col items-center space-y-10 text-center">
          <div className="flex h-24 w-24 items-center justify-center bg-muted border border-border/50">
            <Settings className="h-12 w-12 animate-[spin_10s_linear_infinite] text-foreground/40" />
          </div>

          <div className="space-y-4 w-full">
            <h1 className="text-4xl font-black">Authenticating session</h1>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed">
              The platform is verifying your security credentials and syncing
              your profile data. This usually takes a few moments.
            </p>

            <div className="border bg-muted/20 p-6 text-sm text-left w-full space-y-3">
              <p className="font-bold text-[10px] text-primary uppercase tracking-widest">
                Current status
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Handshaking with system resources and synchronizing profile
                data...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <VerificationBanner />
      {children}
    </>
  );
}
