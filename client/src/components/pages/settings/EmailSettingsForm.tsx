//src/components/pages/settings/EmailSettingsForm.tsx
"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateSettingsFormSchema,
  UpdateSettingsFormValues,
} from "@/lib/schemas/settings.schemas";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "@/lib/features/settings/settingsApiSlice";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Mail, Megaphone, BellRing, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function EmailSettingsForm() {
  const { data: settings, isLoading: isFetching } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  const form = useForm<UpdateSettingsFormValues>({
    resolver: zodResolver(updateSettingsFormSchema),
    defaultValues: {
      emailMarketing: settings?.emailMarketing ?? true,
      emailUpdates: settings?.emailUpdates ?? true,
      emailSocial: settings?.emailSocial ?? true,
      notificationsEnabled: settings?.notificationsEnabled ?? true,
      theme: settings?.theme ?? "SYSTEM",
    },
  });

  // Sync form with fetched data
  useEffect(() => {
    if (settings) {
      form.reset({
        emailMarketing: settings.emailMarketing,
        emailUpdates: settings.emailUpdates,
        emailSocial: settings.emailSocial,
        notificationsEnabled: settings.notificationsEnabled,
        theme: settings.theme,
      });
    }
  }, [settings, form]);

  const onToggle = async (
    field: keyof UpdateSettingsFormValues,
    value: boolean,
  ) => {
    try {
      await updateSettings({ [field]: value }).unwrap();
      toast.success("Preferences updated.");
    } catch (error) {
      toast.error("Failed to save preference.");
      // Revert form state on failure
      form.setValue(field, !value);
    }
  };

  if (isFetching) {
    return (
      <Card className="border-3 rounded-none boarder-double shadow-none bg-transparent">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full " />
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <Card className="border-3 border-double  bg-card rounded-none">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-black  ">
                Email Notifications
              </CardTitle>
            </div>
            <CardDescription>
              Manage how Open Farm Land contacts you regarding platform
              activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 rounded-none border-3 border-double p-3">
            {/* Opportunity Alerts */}
            <FormField
              control={form.control}
              name="emailMarketing"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between  border-3 border-double p-4 shadow-sm bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-bold flex items-center gap-2">
                      <Megaphone className="h-4 w-4 text-orange-500" />
                      Opportunity Alerts
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new job openings and contracts.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(val) => {
                        field.onChange(val);
                        onToggle("emailMarketing", val);
                      }}
                      disabled={isUpdating}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* System Updates */}
            <FormField
              control={form.control}
              name="emailUpdates"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between  border-3 border-double p-4 shadow-sm bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-bold flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      Platform Updates
                    </FormLabel>
                    <FormDescription>
                      Stay informed about new features and technical logs.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(val) => {
                        field.onChange(val);
                        onToggle("emailUpdates", val);
                      }}
                      disabled={isUpdating}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Social Notifications */}
            <FormField
              control={form.control}
              name="emailSocial"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between  border-3 border-double p-4 shadow-sm bg-background/50">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-bold flex items-center gap-2">
                      <BellRing className="h-4 w-4 text-purple-500" />
                      Community Interaction
                    </FormLabel>
                    <FormDescription>
                      Emails for new followers, likes, and comments on your
                      posts.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={(val) => {
                        field.onChange(val);
                        onToggle("emailSocial", val);
                      }}
                      disabled={isUpdating}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </Form>
  );
}
