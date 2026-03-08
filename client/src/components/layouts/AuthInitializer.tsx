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
import { Settings } from "lucide-react";
import VerificationBanner from "../pages/auth/VerificationBanner";

/**
 * AuthInitializer
 * Unified with the MaintenanceGuard philosophy.
 * 🚜 Removed "Fail-Open" logic. If the server is down, we wait for the Guard to block.
 * We do NOT clear credentials on network errors anymore.
 */
export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const isHydrated = useAppSelector(selectIsHydrated);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    const token = authStorage.getToken();
    if (token) {
      dispatch(setCredentials({ token }));
    } else {
      dispatch(completeHydration());
    }
  }, [dispatch]);

  const { isLoading } = useGetMeQuery(undefined, {
    skip: !isHydrated || !isAuthenticated,
    refetchOnMountOrArgChange: true,
  });

  // 🚜 SHOW SYSTEM GUARD UI instead of a generic "Synchronizing" spinner
  if (!isHydrated || (isAuthenticated && isLoading)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-full bg-background animate-in fade-in duration-500">
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-center space-y-10 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-muted border border-border/50">
            <Settings className="h-12 w-12 animate-[spin_10s_linear_infinite] text-foreground/40" />
          </div>

          <div className="space-y-4 w-full">
            <h1 className="text-4xl font-black ">Authenticating session</h1>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed">
              The platform is verifying your security credentials with the farm.
              This usually takes a few moments.
            </p>

            <div className="rounded-2xl border bg-muted/20 p-6 text-sm text-left w-full space-y-3">
              <p className="font-bold  text-[10px]  text-primary">
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
