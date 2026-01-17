"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Plus,
  Home, // Changed from LayoutDashboard to match Sidebar's home
  FileCode2,
  Pen, // Changed from BookOpen to match Sidebar's Blog icon
  Globe, // Changed from Library to match Sidebar's Resources icon
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Updated to match Sidebar routes and icons
const bottomNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FileCode2 },
  { href: "/create", label: "Create", icon: Plus, isCentral: true },
  { href: "/blogs", label: "Blogs", icon: Pen }, // Matches Sidebar /blogs
  { href: "/resources", label: "Resources", icon: Globe }, // Matches Sidebar /resources
];

export default function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 z-50 w-full h-16 border-t bg-background/95 backdrop-blur-lg">
      <div className="grid h-full grid-cols-5">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.isCentral) {
            return (
              <div
                key={item.label}
                className="flex justify-center items-center"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className="relative -top-4 flex h-14 w-14 items-center justify-center rounded-full border bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="sr-only">{item.label}</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="group inline-flex flex-col items-center justify-center"
            >
              <div className="relative flex flex-col items-center">
                <item.icon
                  className={cn(
                    "h-6 w-6 transition-colors group-hover:text-primary",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -bottom-2 h-1 w-1 rounded-full bg-primary" />
                )}
              </div>
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
