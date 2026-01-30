"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  FileCode2,
  Pen,
  Globe,
  Newspaper,
  Users,
  MessageSquare,
  Briefcase,
  Book,
  LayoutDashboard,
  FolderKanban,
  Bookmark,
  Heart,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Rocket,
  User,
  Trophy,
  Lock,
  BookAIcon,
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
import { UserAccountNav } from "../header/UserAccountNav";

// --- Navigation Data ---
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
  { href: "/admin", label: "Admin", icon: Lock },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/about", label: "About", icon: BookAIcon },
];

const contentSection: CollapsibleNavSection = {
  title: "Content",
  icon: BookOpen,
  items: [
    { href: "/all", label: "All Posts", icon: FolderKanban },
    { href: "/projects", label: "Projects", icon: FileCode2 },
    { href: "/guides", label: "Guides", icon: BookOpen },
    { href: "/blogs", label: "Blogs", icon: Pen },
    { href: "/resources", label: "Resources", icon: Globe },
    { href: "/articles", label: "Articles", icon: Newspaper },
  ],
};

const communitySection: CollapsibleNavSection = {
  title: "Community",
  icon: Users,
  items: [
    { href: "/showcases", label: "Showcases", icon: Trophy },
    { href: "/discussions", label: "Discussions", icon: MessageSquare },
    { href: "/opportunities", label: "Opportunities", icon: Briefcase },
    { href: "/updates", label: "Updates", icon: Book },
  ],
};

const workspaceSection: CollapsibleNavSection = {
  title: "Workspace",
  icon: FolderKanban,
  items: [
    { href: "/posts/my", label: "My Posts", icon: FileCode2 },
    { href: "/saved", label: "Saved Posts", icon: Bookmark },
    { href: "/liked", label: "Liked Posts", icon: Heart },
  ],
};

// --- Helper Components (Declared outside to prevent re-creation) ---

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
              "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all duration-200 ease-in-out hover:bg-accent hover:text-foreground",
              isCollapsed && "justify-center rounded-full w-12 h-12",
              isActive && "bg-accent font-semibold text-foreground",
            )}
          >
            <div
              className={cn(
                "absolute left-0 h-0 w-1 bg-primary transition-all duration-300 rounded-r-full",
                isActive ? "h-6" : "group-hover:h-4",
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
      <>
        {section.items.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
        ))}
      </>
    );
  }
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger
        className={cn(
          "group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        )}
      >
        <section.icon className="h-5 w-5" />
        <span className="truncate">{section.title}</span>
        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-1 py-1 pl-6">
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
    <div className="sticky top-0">
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r bg-background h-screen overflow-y-auto ",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-center border-b px-4">
          <Link href="/">
            <Logo isCollapsed={isCollapsed} />
          </Link>
        </div>

        <div className="flex-1">
          <div className="p-2">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant="default"
                    className={cn(
                      "w-full",
                      isCollapsed && "w-12 h-12 rounded-full",
                    )}
                  >
                    <Link href="/create">
                      <Plus className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                      <span className={cn(isCollapsed && "hidden")}>
                        Create
                      </span>
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">Create New Post</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
          <Separator className="my-2" />
          <nav className="flex flex-col gap-1 p-2">
            {mainNav.map((item) => (
              <NavLink
                key={item.href}
                {...item}
                pathname={pathname}
                isCollapsed={isCollapsed}
              />
            ))}
            <Separator className="my-2" />
            <CollapsibleNav
              section={contentSection}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <CollapsibleNav
              section={communitySection}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
            <Separator className="my-2" />
            <CollapsibleNav
              section={workspaceSection}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        <div className="mt-auto flex flex-col gap-2 p-2 border-t">
          <div className={cn("p-2", isCollapsed && "hidden")}>
            <div className="rounded-lg border bg-accent/50 p-4 text-center">
              <div className="mb-2 flex justify-center">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Go Pro</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This feature is not available yet but don't worry ain't that
                much lil bro
              </p>
            </div>
          </div>
        </div>
      </aside>

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "absolute top-8 h-10 w-10 rounded-full bg-background hover:bg-muted z-50 transition-all duration-300 ease-in-out",
                isCollapsed ? "left-14" : "left-56",
              )}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
              <span className="sr-only">
                {isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            {isCollapsed ? "Expand" : "Collapse"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
