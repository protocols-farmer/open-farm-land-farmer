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

import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { selectIsHydrated } from "@/lib/features/auth/authSlice";
import { cn } from "@/lib/utils";

const CornerFlourish = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={cn(
      "absolute w-4 h-4 pointer-events-none text-primary/40 z-30",
      className,
    )}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M38 2H10C5.58 2 2 5.58 2 10V38" />
    <path d="M30 6H12C8.68 6 6 8.68 6 12V30" />
  </svg>
);

function ThemeToggler() {
  const { setTheme } = useTheme();

  const currentUser = useAppSelector(selectCurrentUser);
  const isHydrated = useAppSelector(selectIsHydrated);

  const [updateSettings, { isLoading }] = useUpdateSettingsMutation();

  const handleThemeChange = async (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);

    if (isHydrated && currentUser) {
      try {
        const themeValue = newTheme as ThemePreference;
        await updateSettings({ theme: themeValue }).unwrap();
      } catch (err: any) {
        if (err?.status !== 401) {
          const backendMessage = err?.data?.message || "Sync failed.";
          toast.error(`Cloud Sync: ${backendMessage}`, {
            id: "theme-sync-error",
            icon: <CloudOff className="h-4 w-4" />,
          });
        }
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          disabled={isLoading}
          className="relative transition-colors border-[3px] border-double border-border/80 rounded-none hover:bg-accent overflow-visible"
        >
          <CornerFlourish className="-top-1 -left-1 rotate-0" />
          <CornerFlourish className="-bottom-1 -right-1 rotate-180" />

          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

          {isLoading && (
            <span className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px] ">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
            </span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="font-bold tracking-tighter rounded-none border-[3px] border-double border-border"
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className="cursor-pointer text-[10px]  "
        >
          Light Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className="cursor-pointer text-[10px]  "
        >
          Dark Mode
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className="cursor-pointer text-[10px]  "
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggler;
