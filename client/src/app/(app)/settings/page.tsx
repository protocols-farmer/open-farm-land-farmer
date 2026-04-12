//src/app/(app)/settings/page.tsx
import React from "react";
import EmailSettingsForm from "@/components/pages/settings/EmailSettingsForm";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Settings | Open Farm Land",
  description: "Manage your account preferences and notification settings.",
};

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <SettingsIcon className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-black  ">Account Settings</h1>
          </div>
          <p className="text-muted-foreground text-lg font-medium">
            Fine-tune your experience within Open Farm Land.
          </p>
        </div>

        <Separator className="bg-primary/10" />

        <div className="grid gap-10">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <h2 className="text-sm font-black  ">Privacy & Communication</h2>
            </div>
            <EmailSettingsForm />
          </section>
        </div>

        <p className="text-xs text-center text-muted-foreground pt-10">
          All changes are saved automatically to your Open Farm Land profile.
        </p>
      </div>
    </div>
  );
}
