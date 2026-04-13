//src/components/layouts/sidebar/MobileBottomBar.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Plus, Home, LayoutGrid, Pickaxe, Sprout } from "lucide-react";

const bottomNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/all", label: "All Posts", icon: LayoutGrid },
  { href: "/create", label: "Create", icon: Plus, isCentral: true },
  { href: "/guides", label: "Guides", icon: Sprout },
  { href: "/projects", label: "Projects", icon: Pickaxe },
];

export default function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "lg:hidden fixed bottom-0 left-0 z-50 w-full border-t bg-background/95 backdrop-blur-lg shadow-[0_-4px_24px_rgba(0,0,0,0.05)]",
        "pb-[env(safe-area-inset-bottom)]",
      )}
    >
      <div className="grid h-16 grid-cols-5">
        {bottomNavItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          if (item.isCentral) {
            return (
              <div
                key={item.label}
                className="flex justify-center items-center"
              >
                <Link
                  href={item.href}
                  className="relative -top-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/20 bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform active:scale-90"
                >
                  <item.icon className="h-6 w-6" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className="group inline-flex flex-col items-center justify-center relative active:scale-95 transition-transform"
            >
              <div className="relative flex flex-col items-center">
                <item.icon
                  className={cn(
                    "h-[22px] w-[22px] transition-colors duration-200",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                />
                <span
                  className={cn(
                    "absolute -bottom-3 h-1 w-1 rounded-full bg-primary transition-all duration-300",
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-0",
                  )}
                />
              </div>
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
