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
  Sprout,
  Pickaxe,
  Shovel,
  Wheat,
  Milk,
  TreePine,
  Combine,
  Flower2,
  Tractor,
  CloudSun,
  MessageSquare,
  Book,
  LayoutGrid,
  Bookmark,
  Heart,
  ChevronDown,
  Plus,
  User,
  Settings,
  Fence,
  Crown, // 🚜 Added
} from "lucide-react";

// 🚜 VINTAGE ADDITION: Ornate Corner Flourish
const CornerFlourish = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={cn(
      "absolute w-6 h-6 pointer-events-none text-primary/40 z-30",
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
  { href: "/profile", label: "Profile", icon: User },
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
  ],
};

const workspaceSection: CollapsibleNavSection = {
  title: "Workspace",
  icon: LayoutGrid,
  items: [
    { href: "/posts/my", label: "My Posts", icon: Pickaxe },
    { href: "/saved", label: "Saved Posts", icon: Bookmark },
    { href: "/liked", label: "Liked Posts", icon: Heart },
    { href: "/settings", label: "Settings", icon: Settings },
  ],
};

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
          "flex items-center gap-4  px-3 py-2.5 text-muted-foreground transition-all hover:text-primary",
          isActive && "bg-muted font-semibold text-primary",
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
    <CollapsibleTrigger className="group flex w-full items-center justify-between  px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
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
          <Button variant="ghost" size="icon" className="rounded-none">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        {/* 🚜 VINTAGE CHANGE: Added border-r-[3px] border-double */}
        <SheetContent
          side="left"
          className="flex flex-col bg-background p-0 border-r-[3px] border-double border-border/80"
        >
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
                <Button
                  asChild
                  variant="default"
                  className="w-full mb-2 rounded-none border border-primary/20"
                >
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

              {/* 🚜 ADDED PRO BANNER (Synced with Sidebar) */}
              <div className="mt-6 px-1">
                <div className="relative border-[3px] border-double border-border/80 bg-muted/40 p-4 text-center overflow-visible">
                  <CornerFlourish className="-top-1 -left-1 rotate-0" />
                  <CornerFlourish className="-top-1 -right-1 rotate-90" />
                  <CornerFlourish className="-bottom-1 -left-1 -rotate-90" />
                  <CornerFlourish className="-bottom-1 -right-1 rotate-180" />

                  <div className="mb-3 flex justify-center">
                    <div className="bg-primary/10 p-2 border border-dashed border-primary/30">
                      <Crown className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">Go Pro</h3>
                  <p className="mt-1 text-[11px] leading-tight text-muted-foreground italic">
                    Coming soon to the farm. Stay tuned!
                  </p>
                </div>
              </div>
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
