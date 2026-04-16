//src/components/shared/MaintenanceGuard.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetSystemConfigQuery } from "@/lib/features/admin/adminApiSlice";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { SystemRole } from "@/lib/features/user/userTypes";
import { Settings, Loader2, Shield, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
//clean
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

  const isLoginPage = pathname === "/auth/login";
  const isMaintenanceActive = response?.data?.maintenanceMode === true;
  const isServerDown = isError;

  const shouldShowShield =
    isServerDown || (isMaintenanceActive && !isAdmin && !isLoginPage);

  useEffect(() => {
    if (isError) {
      console.warn("System config unreachable. Shielding app...", error);
    }
  }, [isError, error]);

  const handleReload = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary/40" />
        <p className="mt-4 text-[10px] font-bold text-muted-foreground/40  tracking-widest">
          Waking up system
        </p>
      </div>
    );
  }

  if (shouldShowShield) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 animate-in fade-in duration-500">
        <div className="mx-auto flex w-full max-w-105 flex-col items-center space-y-10 text-center">
          <div className="flex h-20 w-20 items-center justify-center bg-muted border border-border/50">
            <Settings className="h-10 w-10 animate-[spin_10s_linear_infinite] text-foreground/40" />
          </div>

          <div className="space-y-4 w-full">
            <h1 className="text-4xl font-black tracking-tighter">
              {isServerDown ? "Sync Interrupted" : "System Maintenance"}
            </h1>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed">
              {isServerDown
                ? "The platform is currently offline or receiving a critical update. Authentication is temporarily suspended."
                : "The platform is undergoing scheduled maintenance to improve our services."}{" "}
              Please check back shortly or{" "}
              <span
                className="underline underline-offset-4 cursor-pointer hover:text-primary transition-colors font-bold"
                onClick={handleReload}
              >
                reload
              </span>{" "}
              the page.
            </p>

            <div className="border bg-muted/20 p-6 text-sm text-left w-full space-y-3">
              <p className="font-bold text-[10px] text-primary  tracking-wider">
                Current status
              </p>
              <p className="text-muted-foreground leading-relaxed ">
                {isServerDown
                  ? "Waiting for backend synchronization. Handshake failed."
                  : response?.data?.maintenanceMessage ||
                    "Scheduled improvements are in progress."}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 pt-8 border-t border-border/50">
            {isServerDown ? (
              <Button
                onClick={handleReload}
                className="w-full font-bold h-11 rounded-none shadow-lg"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Retry Connection
              </Button>
            ) : (
              <>
                <p className="text-[10px] text-muted-foreground font-bold mb-1  tracking-widest">
                  Restricted Access
                </p>
                <Link href="/auth/login" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full font-bold h-11 border-border/60 rounded-none hover:bg-primary/5"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
