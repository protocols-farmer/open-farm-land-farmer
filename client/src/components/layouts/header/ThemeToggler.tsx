//src/components/layouts/header/ThemeToggler.tsx
"use client";

import * as React from "react";
import { Moon, Sun, Loader2, CloudOff } from "lucide-react";
import { useTheme } from "next-themes";
import { useUpdateSettingsMutation } from "@/lib/features/settings/settingsApiSlice";
import { ThemePreference } from "@/lib/features/settings/settingsTypes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

function ThemeToggler() {
  const { setTheme } = useTheme();
  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const handleThemeChange = async (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);

    try {
      const themeValue = newTheme.toUpperCase() as ThemePreference;
      await updateSettings({ theme: themeValue }).unwrap();
    } catch (err: any) {
      const backendMessage = err?.data?.message || "Sync failed.";

      toast.error(`Cloud Sync: ${backendMessage}`, {
        id: "theme-sync-error",
        icon: <CloudOff className="h-4 w-4" />,
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          disabled={isLoading}
          className="relative transition-colors border-input hover:bg-accent"
        >
          {/* Using text-foreground or current-color instead of hardcoded hex codes */}
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px] rounded-md">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
            </span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="font-bold uppercase tracking-tighter"
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className="cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className="cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className="cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggler;
