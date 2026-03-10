//src/app/auth/forgot-password/page.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForgotPasswordMutation } from "@/lib/features/auth/authApiSlice";
import {
  Loader2,
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Chrome,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [socialError, setSocialError] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setSocialError(false);
    try {
      const response = await forgotPassword(data).unwrap();

      if (response.status === "social_account") {
        setSocialError(true);
      } else {
        setIsSubmitted(true);
      }
    } catch (err: any) {
      if (
        err?.data?.status === "social_account" ||
        err?.data?.message === "SOCIAL_ACCOUNT_DETECTED"
      ) {
        setSocialError(true);
      } else {
        setIsSubmitted(true);
      }
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] p-4">
        <Card className="w-full max-w-md border-border shadow-lg text-center">
          <CardHeader>
            <div className="mx-auto bg-green-500/10 p-3 rounded-full w-fit mb-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Check your inbox</CardTitle>
            <CardDescription>
              If an account exists, we&apos;ve sent a password reset link to
              your email. Links expire in 60 minutes.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link
              href="/auth/login"
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="space-y-1">
          <Link
            href="/auth/login"
            className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors mb-4 w-fit"
          >
            <ArrowLeft className="mr-1 h-3 w-3" /> Back to Login
          </Link>
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {/* 🚜 Social Account Warning Scenario */}
            {socialError && (
              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="h-5 w-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-400">
                    Social Login Detected
                  </p>
                  <p className="text-[11px] text-blue-600/80 leading-relaxed">
                    This account is linked to a social provider. Please use
                    Google or GitHub to log in.
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-11"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-[11px] font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-6 flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full h-11 font-bold"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                "Send Reset Link"
              )}
            </Button>

            {socialError && (
              <Link
                href="/auth/login"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full gap-2",
                )}
              >
                <Chrome className="h-4 w-4" />
                Go to Social Login
              </Link>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
