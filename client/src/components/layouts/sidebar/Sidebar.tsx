//src/components/layouts/sidebar/Sidebar.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Sprout,
  Tractor,
  Wheat,
  Fence,
  Shovel,
  Flower2,
  MessageSquare,
  Book,
  FolderKanban,
  Bookmark,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Rocket,
  User,
  Lock,
  BookAIcon,
  Settings,
  LayoutGrid,
  CloudSun,
  Pickaxe,
  Milk,
  Combine,
  TreePine,
  Sparkles,
  Crown,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Logo from "@/components/shared/Logo";
import { Separator } from "@/components/ui/separator";
import { CornerFlourish } from "@/components/shared/Ornates";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}
interface CollapsibleNavSection {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

const mainNav: NavItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/admin", label: "Admin", icon: Fence },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/about", label: "About", icon: BookAIcon },
];

const contentSection: CollapsibleNavSection = {
  title: "Content",
  icon: TreePine,
  items: [
    { href: "/all", label: "All Posts", icon: LayoutGrid },
    { href: "/projects", label: "Projects", icon: Pickaxe },
    { href: "/guides", label: "Guides", icon: Sprout },
    { href: "/blogs", label: "Blogs", icon: Shovel },
    { href: "/resources", label: "Resources", icon: Wheat },
    { href: "/articles", label: "Articles", icon: Milk },
  ],
};

const communitySection: CollapsibleNavSection = {
  title: "Community",
  icon: Combine,
  items: [
    { href: "/showcases", label: "Showcases", icon: Flower2 },
    { href: "/discussions", label: "Discussions", icon: MessageSquare },
    { href: "/opportunities", label: "Opportunities", icon: Tractor },
    { href: "/updates", label: "Updates", icon: CloudSun },
    { href: "/report-issue ", label: "Report Issue", icon: ShieldAlert },
  ],
};

const workspaceSection: CollapsibleNavSection = {
  title: "Workspace",
  icon: FolderKanban,
  items: [
    { href: "/posts/my", label: "My Posts", icon: Pickaxe },
    { href: "/saved", label: "Saved Posts", icon: Bookmark },
    { href: "/liked", label: "Liked Posts", icon: Heart },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
};

const NavLink = ({
  href,
  label,
  icon: Icon,
  pathname,
  isCollapsed,
}: NavItem & { pathname: string; isCollapsed: boolean }) => {
  const isActive = pathname === href;
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={href}
            className={cn(
              "group/navlink relative flex items-center gap-3  px-3 py-2.5 text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-foreground",
              isCollapsed && "justify-center  w-12 h-12",
              isActive && "bg-accent font-semibold text-foreground",
            )}
          >
            <div
              className={cn(
                "absolute left-0 h-0 w-1 bg-primary transition-all duration-300 -full",
                isActive ? "h-6" : "group-hover/navlink:h-4",
              )}
            />
            <Icon className="h-5 w-5" />
            <span className={cn("truncate", isCollapsed && "hidden")}>
              {label}
            </span>
          </Link>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

const CollapsibleNav = ({
  section,
  pathname,
  isCollapsed,
}: {
  section: CollapsibleNavSection;
  pathname: string;
  isCollapsed: boolean;
}) => {
  if (isCollapsed) {
    return (
      <div className="flex flex-col gap-1">
        {section.items.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    );
  }
  return (
    <Collapsible defaultOpen className="w-full">
      <CollapsibleTrigger
        className={cn(
          "group/trigger flex w-full items-center gap-3  px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        )}
      >
        <section.icon className="h-5 w-5" />
        <span className="truncate">{section.title}</span>
        <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 py-1 pl-4">
        {section.items.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "group sticky top-0 hidden lg:flex flex-col border-r-[3px] border-double border-border/80 bg-background h-screen transition-all duration-300 ease-in-out z-40 overflow-visible",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-none absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 z-50 transition-all active:scale-95",
                "hidden lg:flex items-center justify-center bg-background",

                "border-[3px] border-double border-border/80 hover:border-primary/60 hover:bg-muted shadow-sm overflow-visible",
              )}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <div className="absolute -top-[2px] -left-[2px] w-2 h-2 border-t-[1.5px] border-l-[1.5px] border-primary/60" />
              <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 border-b-[1.5px] border-r-[1.5px] border-primary/60" />

              <div className="absolute inset-1 border border-dashed border-primary/10 pointer-events-none" />

              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-primary/80" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-primary/80" />
              )}
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            className="rounded-none border-2 border-double font-bold text-[10px]  "
          >
            {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex h-16 shrink-0 items-center justify-center border-b px-4">
        <Link href="/">
          <Logo isCollapsed={isCollapsed} />
        </Link>
      </div>

      <div
        className={cn(
          "flex-1 overflow-y-auto py-4 px-3",
          "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]: [&::-webkit-scrollbar-thumb]:bg-transparent",
          "group-hover:[&::-webkit-scrollbar-thumb]:bg-primary/20 hover:[&::-webkit-scrollbar-thumb]:bg-primary/40 transition-colors",
        )}
      >
        <div className="mb-4">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  asChild
                  variant="default"
                  className={cn(
                    "w-full transition-all duration-300 rounded-none border border-primary/20",
                    isCollapsed ? "w-12 h-12  p-0 mx-auto" : "px-4",
                  )}
                >
                  <Link href="/create">
                    <Plus className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                    {!isCollapsed && <span className="font-bold">Create</span>}
                  </Link>
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">Create New Post</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        <nav className="flex flex-col gap-1">
          {mainNav.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          ))}

          <Separator className="my-4 opacity-50" />

          <CollapsibleNav
            section={contentSection}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
          <div className="mt-2" />
          <CollapsibleNav
            section={communitySection}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />

          <Separator className="my-4 opacity-50" />

          <CollapsibleNav
            section={workspaceSection}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t mt-auto shrink-0 overflow-visible">
          <div className="relative border-[3px] border-double border-border/80 bg-muted/40 p-4 text-center overflow-visible">
            <CornerFlourish className="-top-1 -left-1 rotate-0" />
            <CornerFlourish className="-top-1 -right-1 rotate-90" />
            <CornerFlourish className="-bottom-1 -left-1 -rotate-90" />
            <CornerFlourish className="-bottom-1 -right-1 rotate-180" />

            <div className="mb-3 flex justify-center">
              <div className="bg-primary/10 p-2 border border-dashed border-primary/30">
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-sm font-bold text-foreground">
              Feeling generous ?
            </h3>
            <p className="mt-1 text-[11px] leading-tight text-muted-foreground ">
              Your support will help. Little it is we accept it{" "}
            </p>

            <p className="text-xs text-muted-foreground mt-3">
              Button doesn't work yet
            </p>
            <Button
              variant="default"
              className="w-full mt-3 rounded-none"
              onClick={() => {}}
            >
              Donate
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
