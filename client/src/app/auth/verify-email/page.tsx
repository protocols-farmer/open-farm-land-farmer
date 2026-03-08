"use client";

import React, { useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyEmailQuery } from "@/lib/features/auth/authApiSlice";
import { Loader2, CheckCircle2, XCircle, Mail, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const hasAttempted = useRef(false);

  const { data, isLoading, isError, error } = useVerifyEmailQuery(
    token as string,
    {
      skip: !token || hasAttempted.current,
    },
  );

  useEffect(() => {
    if (token) hasAttempted.current = true;
  }, [token]);

  // 1. Missing Token Scenario
  if (!token) {
    return (
      <Card className="w-full max-w-md mx-auto text-center border-border shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-2">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle>Missing Token</CardTitle>
          <CardDescription>
            This verification link is incomplete. Please check the link in your
            email and try again.
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-6">
          <Button
            onClick={() => router.push("/auth/signup")}
            className="w-full h-11 font-bold"
          >
            Go to Sign Up
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Determine specific error context
  const errorMessage = (error as any)?.data?.message || "";
  const isExpired = errorMessage.toLowerCase().includes("expired");

  return (
    <Card className="w-full max-w-md mx-auto text-center border-border shadow-lg">
      <CardHeader>
        {isLoading ? (
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-2">
            <Loader2 className="h-6 w-6 text-primary animate-spin" />
          </div>
        ) : isError ? (
          <div className="mx-auto bg-destructive/10 p-3 rounded-full w-fit mb-2">
            <XCircle className="h-6 w-6 text-destructive" />
          </div>
        ) : (
          <div className="mx-auto bg-green-500/10 p-3 rounded-full w-fit mb-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
        )}

        <CardTitle className="text-2xl font-bold">
          {isLoading
            ? "Verifying Account"
            : isError
              ? "Verification Failed"
              : "Email Verified"}
        </CardTitle>

        <CardDescription className="px-2">
          {isLoading
            ? "We are confirming your credentials with the guild. This won't take long."
            : isError
              ? errorMessage ||
                "This link is invalid, has expired, or was already used."
              : "Your account is now fully active. You can now access all features of Open Farm Land."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* 🚜 Additional Context for Errors */}
        {isError && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border text-[11px] text-muted-foreground leading-relaxed mt-2 text-left">
            {isExpired ? (
              <p>
                Verification links are only valid for a limited time. If you
                didn&apos;t click the link within 24 hours, you will need a new
                one.
              </p>
            ) : (
              <p>
                This can happen if the link was already clicked or if the token
                was copied incorrectly from your email.
              </p>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="mt-6 flex flex-col gap-3">
        {!isLoading && (
          <>
            <Button
              onClick={() =>
                router.push(isError ? "/auth/login" : "/auth/login")
              }
              className="w-full h-11 font-bold"
            >
              {isError ? "Back to Login" : "Proceed to Login"}
            </Button>

            {isError && (
              <Button
                variant="outline"
                onClick={() => router.push("/auth/login?resend=true")}
                className="w-full h-11 gap-2 text-xs font-bold uppercase tracking-widest"
              >
                <RefreshCcw className="h-3 w-3" />
                Request New Link
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Suspense
        fallback={
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary/30" />
            <p className="text-sm text-muted-foreground animate-pulse font-medium">
              Loading Guild Handshake...
            </p>
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
