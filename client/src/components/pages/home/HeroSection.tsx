//src/components/pages/home/HeroSection.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  Pickaxe, // 🚜 Swapped FileCode2 (Projects)
  Shovel, // 🚜 Swapped Pen (Blogs)
  Wheat, // 🚜 Swapped Globe (Resources)
  Milk, // 🚜 Swapped Newspaper (Articles)
  Sprout, // 🚜 Swapped BookOpen (Guides)
  Flower2, // 🚜 Swapped Trophy (Showcases)
  MessageSquare,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLatestVersionQuery } from "@/lib/features/updates/updateApiSlice";
import { cn } from "@/lib/utils";

const heroButtons = [
  { href: "/projects", label: "Projects", icon: Pickaxe },
  { href: "/blogs", label: "Blogs", icon: Shovel },
  { href: "/resources", label: "Resources", icon: Wheat },
  { href: "/articles", label: "Articles", icon: Milk },
  { href: "/guides", label: "Guides", icon: Sprout },
  { href: "/showcases", label: "Showcases", icon: Flower2 },
];

export default function HomeHero() {
  const { data: versionData } = useGetLatestVersionQuery();
  const rawVersion = versionData?.version || "1.0.0-rc.5";

  const displayVersion = rawVersion.toLowerCase().startsWith("v")
    ? rawVersion
    : `v${rawVersion}`;

  return (
    <section className="relative w-full pt-16 pb-12 overflow-hidden">
      {/* 🚜 Subtle background glow for depth */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            {/* 🚜 Live Version Badge */}
            <Link
              href={versionData?.id ? `/updates/${versionData.id}` : "/updates"}
              className="inline-flex items-center gap-2.5 rounded-full border bg-muted/40 px-3 py-1 text-xs font-bold transition-all hover:bg-muted/60"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-muted-foreground ">
                Version {displayVersion}
              </span>
            </Link>

            <h1 className="text-5xl font-black md:text-6xl lg:text-5xl xl:text-7xl tracking-tighter text-foreground leading-[0.9]">
              {" "}
              Open Farm Land
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed">
              This is a platform for sharing your <strong>ideas</strong>,
              <strong> project journey</strong>, <strong>blogs</strong>,
              <strong> resources</strong>, <strong>articles</strong> and more,
              you name it!
            </p>

            <div className="inline-block p-3 px-4 rounded-xl bg-accent/30 border border-border/50">
              <p className="text-xs text-muted-foreground font-medium italic">
                <span className="font-bold not-italic text-foreground mr-1">
                  #Rule 1:
                </span>
                We encourage you guys not to use AI. Get your hands dirty use it
                as a tool, but don't rely on it fully.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="h-12 px-8 font-bold shadow-md hover:shadow-primary/10 transition-all active:scale-95"
              asChild
            >
              <Link href="/create">
                <Plus className="mr-2 h-5 w-5 stroke-[3]" />
                Sow a Project
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 font-semibold hover:bg-accent transition-all active:scale-95"
              asChild
            >
              <Link href="/discussions">
                <MessageSquare className="mr-2 h-5 w-5" />
                Community Feed
              </Link>
            </Button>
          </div>
        </div>

        {/* 🚜 Improved Grid Interaction */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {heroButtons.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col justify-between rounded-2xl border bg-card p-5 transition-all duration-300 hover:bg-accent hover:border-primary/40 hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
              </div>
              <div className="mt-5">
                <p className="text-sm font-bold tracking-tight uppercase opacity-80 group-hover:opacity-100">
                  {label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
