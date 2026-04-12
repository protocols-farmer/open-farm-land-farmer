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
import { cn } from "@/lib/utils";

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
        if (difference <= 0) return "Suspension expired. Please refresh.";

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );

        return days > 0 ? `${days}d ${hours}h` : `${hours}h ${minutes}m`;
      };

      setTimeLeft(calculateTimeLeft());
      const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 60000);
      return () => clearInterval(timer);
    }
  }, [currentUser]);

  if (!currentUser || currentUser.status === "ACTIVE") return <>{children}</>;
  if (currentUser.status === "BANNED" && pathname?.startsWith("/appeals"))
    return <>{children}</>;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      window.location.href = "/auth/login";
    } catch {
      window.location.href = "/auth/login";
    }
  };

  const reason =
    currentUser.activeSanction?.reason || "Violating community guidelines.";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 animate-in fade-in duration-500">
      <div className="mx-auto flex w-full max-w-lg flex-col items-center space-y-8 text-center">
        {/* Sharp Icon Container */}
        <div
          className={cn(
            "flex h-20 w-20 items-center justify-center border-4 ring-8 ring-offset-4 ring-offset-background transition-all",
            currentUser.status === "BANNED"
              ? "bg-destructive/10 border-destructive ring-destructive/10"
              : "bg-secondary border-secondary-foreground ring-secondary/20",
          )}
        >
          {currentUser.status === "BANNED" ? (
            <Ban className="h-10 w-10 text-destructive" />
          ) : (
            <AlertTriangle className="h-10 w-10 text-secondary-foreground" />
          )}
        </div>

        <div className="space-y-4 w-full">
          <h1 className="text-4xl font-black   ">
            Account {currentUser.status}
          </h1>
          <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-sm mx-auto">
            Access to the platform has been restricted due to a technical
            violation of our community standards.
          </p>

          {/* Reason Box - Sharp Design */}
          <div className="bg-muted/30 border border-border p-5 text-left rounded-none">
            <p className="text-[10px] font-black text-muted-foreground mb-2">
              Official Reason
            </p>
            <p className="text-sm  border-l-2 border-primary pl-4 py-1 ">
              "{reason}"
            </p>
          </div>

          {currentUser.status === "SUSPENDED" && timeLeft && (
            <div className="flex items-center justify-center gap-2 text-[11px] font-black   bg-secondary/50 py-3 border border-border">
              <Clock className="h-4 w-4" />
              <span>
                Restoration:{" "}
                <span className="text-foreground underline">{timeLeft}</span>
              </span>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col gap-3 pt-6 border-t border-border">
          {currentUser.status === "BANNED" && (
            <Button
              asChild
              size="lg"
              className="w-full rounded-none font-bold "
            >
              <Link href="/appeals">
                OPEN APPEAL CASE <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button
            variant="outline"
            size="lg"
            className="w-full rounded-none font-bold"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            SIGN OUT
          </Button>
        </div>
      </div>
    </div>
  );
}
