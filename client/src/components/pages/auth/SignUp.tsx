//src/components/pages/auth/SignUp.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useForm, SubmitHandler, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signUpSchema, SignUpFormValues } from "@/lib/schemas/auth.schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

const PasswordStrengthIndicator = ({ score }: { score: number }) => {
  const levels = [
    { color: "bg-muted", width: "w-1/4" },
    { color: "bg-muted", width: "w-1/4" },
    { color: "bg-muted", width: "w-1/4" },
    { color: "bg-muted", width: "w-1/4" },
  ];

  if (score >= 1) levels[0].color = "bg-red-500";
  if (score >= 2) levels[1].color = "bg-orange-500";
  if (score >= 3) levels[2].color = "bg-yellow-500";
  if (score >= 4) levels[3].color = "bg-green-500";

  return (
    <div className="flex h-1.5 w-full rounded-full overflow-hidden mt-2 gap-1">
      {levels.map((level, index) => (
        <div
          key={index}
          className={cn(
            "h-full transition-all duration-300",
            level.width,
            level.color
          )}
        />
      ))}
    </div>
  );
};

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setFocus,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const currentPassword = useWatch({
    control,
    name: "password",
    defaultValue: "",
  });

  const passwordStrength = useMemo(() => {
    if (!currentPassword) {
      return { label: "Required", color: "text-muted-foreground", score: 0 };
    }
    let score = 0;
    if (currentPassword.length >= 8) score++;
    if (/[A-Z]/.test(currentPassword)) score++;
    if (/[0-9]/.test(currentPassword)) score++;
    if (/[^A-Za-z0-9]/.test(currentPassword)) score++;

    const results = [
      { label: "Too Weak", color: "text-red-500", score: 0 },
      { label: "Weak", color: "text-red-500", score: 1 },
      { label: "Fair", color: "text-orange-500", score: 2 },
      { label: "Good", color: "text-yellow-500", score: 3 },
      { label: "Strong", color: "text-green-500", score: 4 },
    ];
    return results[score];
  }, [currentPassword]);

  useFocusOnError(errors, setFocus);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setFormError(null);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        action: "signup",
      });

      if (result?.error) {
        setFormError(getApiErrorMessage(result.error));
      } else if (result?.ok) {
        window.location.assign("/profile");
      }
    } catch (error) {
      setFormError("An unexpected server error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md border-border shadow-lg">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Join the Guild
          </CardTitle>
          <CardDescription>
            Already a member?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Log In
            </Link>
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CardContent className="space-y-4">
            {formError && (
              <Alert
                variant="destructive"
                className="animate-in fade-in slide-in-from-top-1"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
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
                className={cn(errors.email && "border-destructive")}
              />
              {errors.email && (
                <p className="text-destructive text-[11px] font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={cn(
                    "pr-10",
                    errors.password && "border-destructive"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {currentPassword && (
                <div className="pt-1">
                  <PasswordStrengthIndicator score={passwordStrength.score} />
                  <p
                    className={cn(
                      "text-[10px] mt-1 font-semibold uppercase tracking-wider",
                      passwordStrength.color
                    )}
                  >
                    Strength: {passwordStrength.label}
                  </p>
                </div>
              )}
              {errors.password && (
                <p className="text-destructive text-[11px] font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Controller
              name="acceptTerms"
              control={control}
              render={({ field }) => (
                <div className="flex items-start space-x-3 pt-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={cn(
                      "mt-0.5",
                      errors.acceptTerms && "border-destructive"
                    )}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="acceptTerms"
                      className="text-xs font-normal cursor-pointer leading-snug"
                    >
                      I accept the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline font-medium ml-0.5"
                      >
                        Terms and Conditions
                      </Link>
                    </Label>
                    {errors.acceptTerms && (
                      <p className="text-destructive text-[10px] font-medium">
                        {errors.acceptTerms.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Creating
                  Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUpForm;
