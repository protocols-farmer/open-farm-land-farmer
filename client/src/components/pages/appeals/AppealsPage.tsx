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
  const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [submitAppeal, { isLoading: isSubmitting }] = useSubmitAppealMutation();
  const [appealText, setAppealText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (currentUser?.status !== "BANNED") {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <Alert variant="destructive" className="max-w-md rounded-none border-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-bold">
            ACCESS DENIED: APPEAL PERMISSIONS NOT FOUND.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      window.location.href = "/auth/login";
    } catch {
      window.location.href = "/auth/login";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = submitAppealSchema.safeParse({ reason: appealText });
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    try {
      await submitAppeal({ reason: appealText }).unwrap();
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(error?.data?.message || "Transmission failure. Retry.");
    }
  };

  const isPending =
    isSubmitted || currentUser?.activeSanction?.status === "APPEALED";
  const isRejected = currentUser?.activeSanction?.appealStatus === "REJECTED";

  // Rejection/Pending UI Shared Layout
  if (isRejected || isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
        <Card className="max-w-md w-full text-center py-8 rounded-none border-2 shadow-2xl">
          <CardHeader className="space-y-4">
            <div
              className={`mx-auto p-4 border-2 w-fit ${isRejected ? "bg-destructive/10 border-destructive" : "bg-primary/10 border-primary"}`}
            >
              {isRejected ? (
                <AlertCircle className="h-10 w-10 text-destructive" />
              ) : (
                <CheckCircle className="h-10 w-10 text-primary" />
              )}
            </div>
            <CardTitle className="text-3xl font-black   ">
              {isRejected ? "Appeal Denied" : "Under Review"}
            </CardTitle>
            <CardDescription className="text-sm font-medium leading-relaxed">
              {isRejected
                ? "Your appeal was denied by moderation staff. This decision is final and absolute."
                : `Your case has been logged. We will contact you at ${currentUser.email} with the verdict.`}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pt-6">
            <Button
              variant="outline"
              className="rounded-none font-bold"
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
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/20 p-4 sm:p-6">
      <Card className="max-w-2xl w-full rounded-none border-2 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader className="space-y-4 pb-8 border-b-2">
          <div className="flex items-center gap-4 text-destructive">
            <div className="p-2 border-2 border-destructive bg-destructive/10">
              <Scale className="h-8 w-8" />
            </div>
            <CardTitle className="text-4xl font-black   ">
              Case Submission
            </CardTitle>
          </div>
          <CardDescription className="text-sm font-medium  border-l-4 border-primary pl-4 py-1">
            If you believe this ban was issued in technical error, provide your
            defense below.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="pt-8 space-y-6">
            <div className="bg-muted p-4 border  text-[10px]   text-muted-foreground">
              LOGGED AS:{" "}
              <span className="text-foreground font-black">
                @{currentUser.username}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black  ">
                  Defense Statement
                </label>
                <span
                  className={`text-[10px]  font-bold ${appealText.length > 500 ? "text-destructive" : "text-muted-foreground"}`}
                >
                  {appealText.length}/500
                </span>
              </div>
              <Textarea
                placeholder="Detail the context of the incident..."
                className="min-h-55 rounded-none resize-none  text-sm border-2 focus-visible:ring-primary"
                value={appealText}
                onChange={(e) => setAppealText(e.target.value)}
                disabled={isSubmitting || isLoggingOut}
              />
              <p className="text-[10px]  text-muted-foreground">
                Minimal 10 characters required for validation.
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t-2 pt-6 mt-4 bg-muted/20">
            <Button
              type="button"
              variant="ghost"
              className="rounded-none font-bold"
              onClick={handleLogout}
              disabled={isSubmitting || isLoggingOut}
            >
              CANCEL & EXIT
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                isLoggingOut ||
                appealText.trim().length < 10 ||
                appealText.length > 500
              }
              className="rounded-none font-black px-8"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> TRANSMIT APPEAL
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
