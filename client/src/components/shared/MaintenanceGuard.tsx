"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetSystemConfigQuery } from "@/lib/features/admin/adminApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import { Settings, ServerCrash, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * MaintenanceGuard
 * Handles system maintenance and server crash states with a clean, professional UI.
 */
export default function MaintenanceGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetSystemConfigQuery();
  const currentUser = useAppSelector(selectCurrentUser);

  const isUnauthorized = isError && (error as any)?.status === 401;

  // Default to maintenance if explicitly set, or if the server locks out guests (401)
  const isMaintenance = response?.data?.maintenanceMode || isUnauthorized;
  const isAdmin = currentUser?.systemRole === SystemRole.SUPER_ADMIN;
  const isAuthPage = pathname?.startsWith("/auth") || pathname === "/login";

  useEffect(() => {
    if (isError && !isUnauthorized) {
      console.error("System Config Fetch Error:", error);
    }
  }, [isError, error, isUnauthorized]);

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // 2. Server Crash / Unreachable State
  if (isError && !isUnauthorized && !isAdmin && !isAuthPage) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-center space-y-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <ServerCrash className="h-10 w-10 text-destructive" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Service Unavailable
            </h1>
            <p className="text-muted-foreground">
              We are currently unable to connect to our servers. Please try
              again in a few minutes.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4 border-t pt-8 text-sm">
            <p className="text-muted-foreground">System Administrator?</p>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Planned Maintenance State
  if (isMaintenance && !isAdmin && !isAuthPage) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-center space-y-6 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Settings className="h-10 w-10 animate-[spin_4s_linear_infinite] text-primary" />
          </div>

          <div className="space-y-4 w-full">
            <h1 className="text-3xl font-semibold tracking-tight">
              System Maintenance
            </h1>

            <div className="rounded-lg border bg-muted/50 p-4 text-sm text-left w-full space-y-1">
              <p className="font-semibold text-foreground">Reason:</p>
              <p className="text-muted-foreground leading-relaxed">
                {response?.data?.maintenanceMessage ||
                  "We are currently performing scheduled maintenance to improve our services. Please check back shortly."}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 border-t pt-8 text-sm">
            <p className="text-muted-foreground">System Administrator?</p>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Admin Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Normal Render
  return <>{children}</>;
}
