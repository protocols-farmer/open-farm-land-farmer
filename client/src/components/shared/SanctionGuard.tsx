//src/components/shared/SanctionGuard.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { useLogoutMutation } from "@/lib/features/auth/authApiSlice";
import {
  Ban,
  AlertTriangle,
  ArrowRight,
  LogOut,
  Clock,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SanctionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useAppSelector(selectCurrentUser);
  const pathname = usePathname();

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (
      currentUser?.status === "SUSPENDED" &&
      currentUser.activeSanction?.expiresAt
    ) {
      const calculateTimeLeft = () => {
        const expiry = new Date(
          currentUser.activeSanction!.expiresAt!,
        ).getTime();
        const now = new Date().getTime();
        const difference = expiry - now;

        if (difference <= 0) {
          return "Suspension finished! Please refresh the page to regain access.";
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );

        if (days > 0) return `${days} Days, ${hours} Hours`;
        return `${hours} Hours, ${minutes} Minutes`;
      };

      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
      return () => clearInterval(timer);
    }
  }, [currentUser]);

  if (!currentUser || currentUser.status === "ACTIVE") {
    return <>{children}</>;
  }

  if (currentUser.status === "BANNED" && pathname?.startsWith("/appeals")) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      window.location.href = "/auth/login";
    } catch (error) {
      window.location.href = "/auth/login";
    }
  };

  const reason =
    currentUser.activeSanction?.reason || "Violating community guidelines.";

  if (currentUser.status === "BANNED") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 animate-in fade-in duration-500">
        <div className="mx-auto flex w-full max-w-105 flex-col items-center space-y-8 text-center">
          {/* Banned Icon using Shadcn 'destructive' variables */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-destructive/10 border-8 border-destructive/20">
            <Ban className="h-12 w-12 text-destructive" />
          </div>

          <div className="space-y-3 w-full">
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              Account Banned
            </h1>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed">
              Your account has been permanently restricted from accessing the
              platform due to a severe violation of our community guidelines.
            </p>

            <div className="mt-4 bg-destructive/10 border border-destructive/20 p-4 rounded-lg text-left">
              <p className="text-sm font-bold text-destructive mb-1">
                Reason for Ban:
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                "{reason}"
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 pt-6 border-t border-border/50">
            <Button asChild size="lg" className="w-full font-bold">
              <Link href="/appeals">
                Submit an Appeal <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}{" "}
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser.status === "SUSPENDED") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 animate-in fade-in duration-500">
        <div className="mx-auto flex w-full max-w-105 flex-col items-center space-y-8 text-center">
          {/* Suspended Icon using Shadcn 'secondary' and 'muted' variables to avoid hardcoded oranges */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-secondary border-8 border-secondary/50">
            <AlertTriangle className="h-12 w-12 text-secondary-foreground" />
          </div>

          <div className="space-y-3 w-full">
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              Account Suspended
            </h1>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed">
              Your account is currently serving a temporary suspension for
              violating community guidelines. You will automatically regain
              access once the suspension period expires.
            </p>

            {/* Dynamic Reason Box using semantic borders and backgrounds */}
            <div className="mt-4 bg-muted/30 border border-border p-4 rounded-lg text-left">
              <p className="text-sm font-bold text-foreground mb-1">
                Reason for Suspension:
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{reason}"
              </p>
            </div>

            {/* Live Timer */}
            {timeLeft && (
              <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground font-medium bg-muted/50 py-3 rounded-md border border-border">
                <Clock className="h-5 w-5" />
                <span>
                  Access Restores In:{" "}
                  <span className="text-foreground font-bold">{timeLeft}</span>
                </span>
              </div>
            )}
          </div>

          <div className="flex w-full flex-col gap-3 pt-6 border-t border-border/50">
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}{" "}
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
