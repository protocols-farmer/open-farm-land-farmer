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

  // Track actual seconds remaining
  const [timeLeft, setTimeLeft] = useState(0);

  // Initialize from storage on mount
  useEffect(() => {
    if (!user || user.isEmailVerified) return;

    const cooldownKey = `verify_cooldown_${user.id}`;
    const lastSent = localStorage.getItem(cooldownKey);

    if (lastSent) {
      const elapsed = Math.floor((Date.now() - parseInt(lastSent)) / 1000);
      const remaining = COOLDOWN_SECONDS - elapsed;
      if (remaining > 0) setTimeLeft(remaining);
    }
  }, [user]);

  // The Timer Ticker
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // 🚜 Point of No Return: If user is verified, this banner deletes itself.
  if (!user || user.isEmailVerified) return null;

  const handleResend = async () => {
    try {
      await resendVerification().unwrap();
      const now = Date.now();
      localStorage.setItem(`verify_cooldown_${user.id}`, now.toString());
      setTimeLeft(COOLDOWN_SECONDS);
      toast.success("Verification link sent!");
    } catch (err: any) {
      // 🚜 Scenario: Catch specific backend code if user is already verified
      if (err?.data?.message === "ALREADY_VERIFIED") {
        toast.success("You are already verified!");
      } else {
        toast.error(err?.data?.message || "Failed to resend.");
      }
    }
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
              ? `Retry in ${timeLeft}s`
              : "Resend Link"}
        </Button>
      </div>
    </div>
  );
}
