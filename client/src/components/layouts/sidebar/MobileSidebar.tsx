"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";
import { UserAccountNav } from "../header/UserAccountNav";

import {
  Menu,
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
  Trophy,
  Plus,
  User,
} from "lucide-react";

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
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/profile", label: "Profile", icon: User },
];

const contentSection: CollapsibleNavSection = {
  title: "Content",
  icon: BookOpen,
  items: [
    { href: "/all", label: "All Posts", icon: FolderKanban },
    { href: "/projects", label: "Projects", icon: FileCode2 },
    { href: "/blogs", label: "Blogs", icon: Pen },
    { href: "/resources", label: "Resources", icon: Globe },
    { href: "/articles", label: "Articles", icon: Newspaper },
    { href: "/guides", label: "Guides", icon: BookOpen },
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

// --- Helper Components (Declared outside of render to prevent state reset) ---

const MobileNavLink = ({
  href,
  label,
  icon: Icon,
  pathname,
}: NavItem & { pathname: string }) => {
  const isActive = pathname === href;
  return (
    <SheetClose asChild>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-4 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-primary",
          isActive && "bg-muted font-semibold text-primary"
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="text-base">{label}</span>
      </Link>
    </SheetClose>
  );
};

const CollapsibleNav = ({
  section,
  pathname,
}: {
  section: CollapsibleNavSection;
  pathname: string;
}) => (
  <Collapsible defaultOpen className="w-full">
    <CollapsibleTrigger className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
      <div className="flex items-center gap-4">
        <section.icon className="h-5 w-5" />
        <span className="text-base">{section.title}</span>
      </div>
      <ChevronDown className="h-5 w-5 transition-transform group-data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
    <CollapsibleContent className="space-y-1 py-1 pl-8">
      {section.items.map((item) => (
        <MobileNavLink key={item.href} {...item} pathname={pathname} />
      ))}
    </CollapsibleContent>
  </Collapsible>
);

export default function MobileSidebar() {
  const pathname = usePathname();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col bg-background p-0">
          <SheetHeader className="h-16 shrink-0 border-b px-4 flex items-center">
            <SheetTitle className="sr-only">Main Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Navigate through the application pages.
            </SheetDescription>
            <SheetClose asChild>
              <Link href="/" className="flex items-center">
                <Logo />
              </Link>
            </SheetClose>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <nav className="flex flex-col gap-1 p-4">
              <SheetClose asChild>
                <Button asChild variant="default" className="w-full mb-2">
                  <Link href="/create">
                    <Plus className="mr-2 h-5 w-5" />
                    Create Post
                  </Link>
                </Button>
              </SheetClose>

              {mainNav.map((item) => (
                <MobileNavLink key={item.href} {...item} pathname={pathname} />
              ))}
              <Separator className="my-2" />
              <CollapsibleNav section={contentSection} pathname={pathname} />
              <CollapsibleNav section={communitySection} pathname={pathname} />
              <Separator className="my-2" />
              <CollapsibleNav section={workspaceSection} pathname={pathname} />
            </nav>
          </div>

          <SheetFooter className="border-t p-4 shrink-0">
            <UserAccountNav />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
