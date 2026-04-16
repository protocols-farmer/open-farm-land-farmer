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

  const { isLoading, isSuccess, isError } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        dispatch(setCredentials());
      }

      dispatch(completeHydration());
    }
  }, [isLoading, isSuccess, dispatch]);

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
