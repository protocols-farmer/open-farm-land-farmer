//src/components/pages/auth/VerificationBanner.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { useResendVerificationMutation } from "@/lib/features/auth/authApiSlice";
import { MailWarning, Loader2, Send, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

const COOLDOWN_SECONDS = 60;

export default function VerificationBanner() {
  const user = useAppSelector(selectCurrentUser);
  const [resendVerification, { isLoading }] = useResendVerificationMutation();

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!user || user.isEmailVerified) return;

    const cooldownKey = `verify_cooldown_unlock_${user.id}`;
    const unlockTime = localStorage.getItem(cooldownKey);

    if (unlockTime) {
      const remaining = Math.floor(
        (parseInt(unlockTime, 10) - Date.now()) / 1000,
      );
      if (remaining > 0) {
        setTimeLeft(remaining);
      } else {
        localStorage.removeItem(cooldownKey);
      }
    }
  }, [user]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  if (!user || user.isEmailVerified) return null;

  const handleResend = async () => {
    try {
      await resendVerification().unwrap();
      const unlockTime = Date.now() + COOLDOWN_SECONDS * 1000;
      localStorage.setItem(
        `verify_cooldown_unlock_${user.id}`,
        unlockTime.toString(),
      );
      setTimeLeft(COOLDOWN_SECONDS);
      toast.success("Verification link sent!");
    } catch (err: any) {
      if (err?.status === 429) {
        const errorMessage = err?.data?.message || "";
        const match = errorMessage.match(/in (\d+) minutes/);

        const minutesToWait = match ? parseInt(match[1], 10) : 15;
        const secondsToWait = minutesToWait * 60;

        const unlockTime = Date.now() + secondsToWait * 1000;
        localStorage.setItem(
          `verify_cooldown_unlock_${user.id}`,
          unlockTime.toString(),
        );
        setTimeLeft(secondsToWait);

        toast.error(`Rate limited. Please wait ${minutesToWait} minutes.`);
      } else if (err?.data?.message === "ALREADY_VERIFIED") {
        toast.success("You are already verified!");
      } else {
        toast.error(err?.data?.message || "Failed to resend.");
      }
    }
  };

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds < 60) return `${totalSeconds}s`;
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="bg-warning/10 border-b border-warning/20 py-2.5 px-4 animate-in slide-in-from-top duration-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
        <div className="flex items-center gap-2 text-warning-foreground">
          <MailWarning className="h-4 w-4 shrink-0 text-warning" />
          <p className="text-xs font-semibold tracking-tight">
            Your email is not verified. Some features like posting are
            restricted.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleResend}
          disabled={isLoading || timeLeft > 0}
          className={cn(
            "h-7 px-3 text-[10px] font-bold uppercase tracking-widest transition-all min-w-[140px]",
            timeLeft > 0
              ? "text-muted-foreground bg-muted/20 cursor-not-allowed"
              : "text-warning-foreground hover:bg-warning/20",
          )}
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin mr-1.5" />
          ) : timeLeft > 0 ? (
            <Timer className="h-3 w-3 mr-1.5 animate-pulse" />
          ) : (
            <Send className="h-3 w-3 mr-1.5" />
          )}

          {isLoading
            ? "Sending..."
            : timeLeft > 0
              ? `Retry in ${formatTime(timeLeft)}`
              : "Resend Link"}
        </Button>
      </div>
    </div>
  );
}
