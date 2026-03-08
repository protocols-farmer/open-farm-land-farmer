"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetSystemConfigQuery } from "@/lib/features/admin/adminApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import { Settings, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * MaintenanceGuard
 * UI/UX: Original gear spinner with an inline reloader span.
 * Logic: Fail-Open strategy (only blocks if maintenanceMode is explicitly true).
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

  const isAdmin = currentUser?.systemRole === SystemRole.SUPER_ADMIN;
  const isAuthPage = pathname?.startsWith("/auth") || pathname === "/login";

  // Fail-Open Logic: Only block if maintenance is explicitly active.
  const isMaintenanceActive = response?.data?.maintenanceMode === true;

  useEffect(() => {
    if (isError) {
      console.warn("System config check skipped (Fail-Open):", error);
    }
  }, [isError, error]);

  // Function to refresh the page manually
  const handleReload = () => {
    window.location.reload();
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // 2. Planned Maintenance State
  if (isMaintenanceActive && !isAdmin && !isAuthPage) {
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
            <p className="text-muted-foreground leading-relaxed">
              We are currently performing scheduled maintenance. Please check
              back shortly or{" "}
              <span
                className="underline underline-offset-4 cursor-pointer hover:text-primary transition-colors font-medium"
                onClick={handleReload}
              >
                reload
              </span>{" "}
              the page.
            </p>

            <div className="rounded-lg border bg-muted/50 p-4 text-sm text-left w-full space-y-1">
              <p className="font-semibold text-foreground">Reason:</p>
              <p className="text-muted-foreground leading-relaxed">
                {response?.data?.maintenanceMessage ||
                  "Scheduled structural improvements are in progress. Check back shortly."}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col items-center gap-4 border-t pt-8 text-sm">
            <p className="text-muted-foreground">
              Are you a system administrator?
            </p>
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full">
                <Shield className="mr-2 h-4 w-4" />
                Admin login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Normal Render
  return <>{children}</>;
}
