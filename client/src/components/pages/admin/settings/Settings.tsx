//src/components/pages/admin/settings/Settings.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  useGetSystemConfigQuery,
  useUpdateSystemConfigMutation,
} from "@/lib/features/admin/adminApiSlice";
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

export default function AdminSettingsPage() {
  const { data: response, isLoading } = useGetSystemConfigQuery();
  const [updateConfig, { isLoading: isUpdating }] =
    useUpdateSystemConfigMutation();

  const [mode, setMode] = useState(false);
  const [message, setMessage] = useState("");

  // Sync local state when data loads
  useEffect(() => {
    if (response?.data) {
      setMode(response.data.maintenanceMode);
      setMessage(response.data.maintenanceMessage || "");
    }
  }, [response]);

  const handleSave = async () => {
    try {
      await updateConfig({
        maintenanceMode: mode,
        maintenanceMessage: message,
      }).unwrap();
      toast.success("System configuration updated!");
    } catch (err) {
      toast.error("Failed to update settings.");
    }
  };

  if (isLoading) return <Loader2 className="animate-spin m-10" />;

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="text-3xl font-bold">System Settings</h1>

      <Card className={mode ? "border-destructive/50 bg-destructive/5" : ""}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert
                  className={mode ? "text-destructive" : "text-primary"}
                />
                Maintenance Mode
              </CardTitle>
              <CardDescription>
                When active, only administrators can access the platform.
              </CardDescription>
            </div>
            <Switch
              checked={mode}
              onCheckedChange={setMode}
              className="data-[state=checked]:bg-destructive"
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Maintenance Message (Reason)</Label>
            <Input
              id="reason"
              placeholder="e.g. Tilling the soil for a major update..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!mode}
            />
            <p className="text-xs text-muted-foreground">
              This message will be shown to all non-admin users.
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={isUpdating}
            variant={mode ? "destructive" : "default"}
          >
            {isUpdating ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
