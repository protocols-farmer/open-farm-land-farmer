"use client";

import MobileSidebar from "@/components/layouts/sidebar/MobileSidebar";
import ThemeToggler from "./ThemeToggler";
import { UserNav } from "./UserNav";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUser } from "@/lib/features/user/userSlice";
import { selectIsHydrated } from "@/lib/features/auth/authSlice";
import NotificationBell from "@/components/pages/notifications/NotificationBell";
import { cn } from "@/lib/utils";

// 🚜 VINTAGE ADDITION: Ornate Corner Flourish
const CornerFlourish = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={cn(
      "absolute w-8 h-8 pointer-events-none text-primary/40 z-30",
      className,
    )}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M38 2H10C5.58 2 2 5.58 2 10V38" />
    <path d="M30 6H12C8.68 6 6 8.68 6 12V30" />
  </svg>
);

// 🚜 VINTAGE ADDITION: Technical Ruler (Fixed with CSS Gradient to prevent overflow)
const MeasurementRuler = () => (
  <div
    className="absolute top-0 left-0 w-full h-2 opacity-20 pointer-events-none"
    style={{
      backgroundImage: `
        repeating-linear-gradient(90deg, var(--primary) 0, var(--primary) 1px, transparent 1px, transparent 40px),
        repeating-linear-gradient(90deg, var(--primary) 0, var(--primary) 1px, transparent 1px, transparent 10px)
      `,
      backgroundSize: "100% 100%, 100% 60%",
      backgroundRepeat: "repeat-x",
    }}
  />
);

export default function Header() {
  const currentUser = useAppSelector(selectCurrentUser);
  const isHydrated = useAppSelector(selectIsHydrated);

  return (
    <header className="relative w-full border-b-[3px] border-double border-border/80 bg-background/60 shadow-sm backdrop-blur-lg z-50 overflow-visible">
      {/* 🚜 Archival Ruler Overlay */}
      <MeasurementRuler />

      {/* 🚜 Bottom Corner Flourishes (Adjusted to right-0 to fix horizontal scroll) */}
      <CornerFlourish className="-bottom-1.5 left-0 -rotate-90" />
      <CornerFlourish className="-bottom-1.5 right-0 rotate-180" />

      <div className="flex h-16 items-center justify-between px-4 relative">
        <div className="flex items-center gap-4">
          <MobileSidebar />

          <div className="hidden sm:block">
            {isHydrated && currentUser ? (
              <h1 className="text-lg font-semibold text-foreground">
                Welcome back,{" "}
                <span className="text-primary font-bold">
                  {currentUser.name}
                </span>
              </h1>
            ) : (
              <h1 className="text-lg font-semibold text-foreground italic">
                Open Farm Land Archive
              </h1>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center border-x border-dashed border-primary/20 px-2 h-10">
            <ThemeToggler />
          </div>

          {isHydrated && currentUser && <NotificationBell />}

          <div className="relative p-1 border border-dashed border-primary/30 ml-2">
            {isHydrated ? (
              <UserNav />
            ) : (
              <div className="h-9 w-9 bg-muted animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
