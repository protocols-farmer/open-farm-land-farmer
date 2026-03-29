//src/components/pages/auth/Login.tsx
"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle,
  Info,
  Ban, // 🚜 ADDED: Ban icon for the suspension message
} from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/lib/features/auth/authApiSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { loginSchema, LoginFormValues } from "@/lib/schemas/auth.schemas";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn, getApiErrorMessage } from "@/lib/utils";
import { useFocusOnError } from "@/lib/hooks/useFocusOnError";
import SocialLogin from "./SocialLogin";

const LoginFormContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [showPassword, setShowPassword] = useState(false);

  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  useFocusOnError(errors, setFocus);

  const urlMessage = useMemo(() => {
    const error = searchParams.get("error");
    const status = searchParams.get("status");

    // 🚜 ADDED: Check for the "banned" status flag from the interceptor
    if (status === "banned") {
      return {
        type: "error" as const,
        text: "Your account has been suspended or banned due to a violation of our terms. Please contact support.",
        icon: Ban,
      };
    }

    if (status === "verification_sent") {
      return {
        type: "info" as const,
        text: "Verification link sent! Please check your email to verify your account.",
        icon: Info,
      };
    }

    if (status === "password_changed") {
      return {
        type: "success" as const,
        text: "Password updated successfully! Please log in.",
        icon: CheckCircle,
      };
    }

    if (error) {
      switch (error) {
        case "CredentialsSignin":
          return {
            type: "error" as const,
            text: "Invalid email or password.",
            icon: AlertCircle,
          };
        case "SessionExpired":
          return {
            type: "info" as const,
            text: "Session expired. Please log in again.",
            icon: Info,
          };
        default:
          return {
            type: "error" as const,
            text: "An authentication error occurred.",
            icon: AlertCircle,
          };
      }
    }
    return null;
  }, [searchParams]);

  const [login, { isLoading }] = useLoginMutation();

  const activeMessage = submissionError
    ? { type: "error" as const, text: submissionError, icon: AlertCircle }
    : urlMessage;

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setSubmissionError(null);
    try {
      await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      window.location.assign("/");
    } catch (error: any) {
      setSubmissionError(getApiErrorMessage(error));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome Back
          </CardTitle>
          <CardDescription>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign Up
            </Link>
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-4">
            {activeMessage && (
              <Alert
                variant={
                  activeMessage.type === "error" ? "destructive" : "default"
                }
                className={cn(
                  "animate-in fade-in slide-in-from-top-1",
                  activeMessage.type === "info" &&
                    "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300",
                  activeMessage.type === "success" &&
                    "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300",
                )}
              >
                <activeMessage.icon className="h-4 w-4" />
                <AlertDescription>{activeMessage.text}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-destructive text-[11px] font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className={cn(
                    buttonVariants({ variant: "link", size: "sm" }),
                    "h-auto p-0 text-xs",
                  )}
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-destructive text-[11px] font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* social login */}
            {/* <div>
              <SocialLogin />
            </div> */}
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Logging
                  In...
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

const LoginForm = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    }
  >
    <LoginFormContent />
  </Suspense>
);

export default LoginForm;
