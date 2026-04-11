//src/components/pages/profile/ChangePasswordForm.tsx
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useChangePasswordMutation,
  useLogoutMutation,
} from "@/lib/features/auth/authApiSlice";
import {
  changePasswordSchema,
  ChangePasswordFormValues,
} from "@/lib/schemas/auth.schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Eye,
  EyeOff,
  Loader2,
  Save,
  CheckCircle,
  Info,
  LogOut,
} from "lucide-react";
import { cn, getApiErrorMessage } from "@/lib/utils";
export default function ChangePasswordForm() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [logout] = useLogoutMutation();

  const [uiMessage, setUiMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    setUiMessage(null);
    try {
      await changePassword(data).unwrap();
      setUiMessage({
        type: "success",
        text: "Security credentials updated. Initiating secure logout...",
      });
      reset();
      setTimeout(async () => {
        await logout().unwrap();
      }, 2500);
    } catch (err: any) {
      setUiMessage({
        type: "error",
        text: getApiErrorMessage(
          err,
          "Verification of current password failed.",
        ),
      });
    }
  };

  return (
    <Card className="border-border shadow-sm rounded-none">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Security Update</CardTitle>
        <CardDescription>
          Changing your password will invalidate all current active sessions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uiMessage && (
          <Alert
            variant={uiMessage.type === "error" ? "destructive" : "default"}
            className={cn(
              "mb-6 animate-in fade-in slide-in-from-left-2",
              uiMessage.type === "success" &&
                "bg-primary/5 border-primary/20 text-primary",
            )}
          >
            {uiMessage.type === "success" ? (
              <LogOut className="h-4 w-4" />
            ) : (
              <Info className="h-4 w-4" />
            )}
            <AlertDescription className="text-xs font-semibold tracking-tight italic">
              {uiMessage.text}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showCurrent ? "text" : "password"}
                className="pr-10 h-10"
                {...register("currentPassword")}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute  right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-destructive text-[11px] font-medium">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? "text" : "password"}
                  className="pr-10 h-10"
                  {...register("newPassword")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-destructive text-[11px] font-medium">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                className="h-10"
                {...register("confirmNewPassword")}
                disabled={isLoading}
              />
              {errors.confirmNewPassword && (
                <p className="text-destructive text-[11px] font-medium">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2 rounded-none font-bold px-6"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Update Credentials
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
