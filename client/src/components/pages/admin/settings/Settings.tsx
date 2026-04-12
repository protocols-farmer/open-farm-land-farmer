//src/components/pages/admin/settings/Settings.tsx
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetSystemConfigQuery,
  useUpdateSystemConfigMutation,
} from "@/lib/features/admin/adminApiSlice";
import {
  updateSystemConfigSchema,
  UpdateSystemConfigValues,
} from "@/lib/schemas/admin.schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader2, Save, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const { data: response, isLoading } = useGetSystemConfigQuery();
  const [updateConfig, { isLoading: isUpdating }] =
    useUpdateSystemConfigMutation();

  // 🚜 Initialize Form with Zod Resolver
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateSystemConfigValues>({
    resolver: zodResolver(updateSystemConfigSchema),
    defaultValues: {
      maintenanceMode: false,
      maintenanceMessage: "",
    },
  });

  // Watch values for UI logic and counter
  const mode = watch("maintenanceMode");
  const messageValue = watch("maintenanceMessage") || "";

  // 🚜 Sync form state when backend data arrives
  useEffect(() => {
    if (response?.data) {
      reset({
        maintenanceMode: response.data.maintenanceMode,
        maintenanceMessage: response.data.maintenanceMessage || "",
      });
    }
  }, [response, reset]);

  const onSave = async (values: UpdateSystemConfigValues) => {
    try {
      await updateConfig(values).unwrap();
      toast.success("System configuration updated!");
    } catch (err) {
      toast.error("Failed to update settings.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>

      <Card
        className={cn(
          "rounded-none transition-colors duration-300",
          mode ? "border-destructive/50 bg-destructive/5" : "bg-card",
        )}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert
                  className={cn(
                    "h-5 w-5",
                    mode ? "text-destructive" : "text-primary",
                  )}
                />
                Maintenance Mode
              </CardTitle>
              <CardDescription>
                When active, the platform becomes read-only for non-admin users.
              </CardDescription>
            </div>
            {/* 🚜 Manual Switch Integration with useForm */}
            <Switch
              checked={mode}
              onCheckedChange={(val) => setValue("maintenanceMode", val)}
              className="data-[state=checked]:bg-destructive"
            />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSave)} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="maintenanceMessage"
                  className={cn(!mode && "opacity-50")}
                >
                  Maintenance Message (Reason)
                </Label>

                {/* 🚜 LIVE CHARACTER COUNTER: xyz/200 */}
                <span
                  className={cn(
                    "text-[10px] font-mono font-bold transition-colors",
                    messageValue.length > 200
                      ? "text-destructive"
                      : "text-muted-foreground",
                    !mode && "opacity-50",
                  )}
                >
                  {messageValue.length}/200
                </span>
              </div>

              <Input
                id="maintenanceMessage"
                placeholder="e.g. Preparing the ground for new features..."
                {...register("maintenanceMessage")}
                disabled={!mode}
                className={cn(
                  "rounded-none",
                  errors.maintenanceMessage &&
                    "border-destructive focus-visible:ring-destructive",
                )}
              />

              {errors.maintenanceMessage ? (
                <p className="text-xs text-destructive font-medium">
                  {errors.maintenanceMessage.message}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  This technical briefing will be displayed in the site-wide
                  banner.
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isUpdating}
              variant={mode ? "destructive" : "default"}
              className="min-w-35 rounded-none font-bold"
            >
              {isUpdating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
