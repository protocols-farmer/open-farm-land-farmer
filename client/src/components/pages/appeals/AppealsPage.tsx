//src/components/pages/appeals/AppealsPage.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { useLogoutMutation } from "@/lib/features/auth/authApiSlice";
import { useSubmitAppealMutation } from "@/lib/features/appeals/appealApiSlice";
import { submitAppealSchema } from "@/lib/schemas/appeal.schemas";
import {
  Scale,
  Send,
  LogOut,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import toast from "react-hot-toast";

export default function AppealsPage() {
  const currentUser = useAppSelector(selectCurrentUser);
  const router = useRouter();

  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [submitAppeal, { isLoading: isSubmitting }] = useSubmitAppealMutation();

  const [appealText, setAppealText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Security check: Only banned users should see this
  if (currentUser?.status !== "BANNED") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You do not have permission to view this page.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      window.location.href = "/auth/login";
    } catch (error) {
      window.location.href = "/auth/login";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🚜 FRONTEND ZOD SHIELD: Validate before hitting the server
    const validation = submitAppealSchema.safeParse({ reason: appealText });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    try {
      await submitAppeal({ reason: appealText }).unwrap();
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to submit appeal. Please try again.",
      );
    }
  };

  // 🚜 SMART UX: Check the precise state of the appeal
  const isPending =
    isSubmitted || currentUser?.activeSanction?.status === "APPEALED";
  const isRejected = currentUser?.activeSanction?.appealStatus === "REJECTED";

  // 1. SHOW REJECTION SCREEN (If an admin explicitly denied their appeal)
  if (isRejected) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
        <Card className="max-w-md w-full text-center py-6 border-destructive/20 shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-destructive/10 p-4 rounded-full w-fit mb-4">
              <AlertCircle className="h-10 w-10 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold">Appeal Denied</CardTitle>
            <CardDescription className="text-base mt-2">
              Your appeal has been reviewed by our moderation team and was
              <span className="font-semibold text-destructive"> denied</span>.
              The original sanction against your account remains in effect. This
              decision is final.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-6">
            <Button
              variant="outline"
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
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 2. SHOW PENDING SCREEN (If they just submitted it, or log back in while it's waiting)
  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
        <Card className="max-w-md w-full text-center py-6 border-border shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Appeal Under Review
            </CardTitle>
            <CardDescription className="text-base mt-2">
              Your appeal is currently pending review by our moderation team. We
              will evaluate your case and contact you via email at{" "}
              <span className="font-semibold text-foreground">
                {currentUser.email}
              </span>{" "}
              with our final decision.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-6">
            <Button
              variant="outline"
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
          </CardFooter>
        </Card>
      </div>
    );
  }

  // 3. SHOW THE FORM (If they are banned and haven't appealed yet)
  const isOverLimit = appealText.length > 500;
  const isUnderLimit = appealText.trim().length < 10;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/20 p-4 sm:p-6">
      <Card className="max-w-2xl w-full border-border shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="space-y-3 pb-6 border-b border-border/50">
          <div className="flex items-center gap-3 text-destructive">
            <Scale className="h-8 w-8" />
            <CardTitle className="text-3xl font-black">
              Account Appeal Center
            </CardTitle>
          </div>
          <CardDescription className="text-base leading-relaxed">
            We understand that mistakes happen. If you believe your account was
            banned in error, or if you wish to formally apologize and request a
            second chance, please explain your situation below.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="pt-8 space-y-4">
            <div className="bg-muted p-4 rounded-md border border-border">
              <p className="text-sm font-semibold mb-1">Appealing as:</p>
              <p className="text-muted-foreground text-sm font-mono">
                @{currentUser.username} ({currentUser.email})
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="appeal" className="text-sm font-semibold">
                Your Appeal Message
              </label>
              <Textarea
                id="appeal"
                placeholder="Please provide context, any relevant details, and why you believe your access should be restored..."
                className={`min-h-[200px] resize-y ${isOverLimit ? "border-destructive focus-visible:ring-destructive" : ""}`}
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
                disabled={isSubmitting || isLoggingOut}
                required
              />

              {/* 🚜 LIVE CHARACTER COUNTER */}
              <div className="flex justify-between items-center text-xs mt-1">
                <p className="text-muted-foreground">Minimum 10 characters.</p>
                <p
                  className={`font-mono font-medium ${isOverLimit ? "text-destructive" : "text-muted-foreground"}`}
                >
                  {appealText.length} / 500
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-border/50 pt-6 mt-4 bg-muted/10 rounded-b-xl">
            <Button
              type="button"
              variant="ghost"
              onClick={handleLogout}
              disabled={isSubmitting || isLoggingOut}
            >
              {isLoggingOut ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}{" "}
              Cancel & Sign Out
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting || isLoggingOut || isUnderLimit || isOverLimit
              }
              className="font-bold min-w-[140px]"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> Submit Case
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
