"use client";

import React from "react";
import Link from "next/link";
import {
  Pickaxe,
  Shovel,
  Wheat,
  Milk,
  Sprout,
  Flower2,
  MessageSquare,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLatestVersionQuery } from "@/lib/features/updates/updateApiSlice";
import { cn } from "@/lib/utils";
import MilkSVG from "./MilkSVG";
import ArchivePlate from "./ArchivePlate";

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

const heroButtons = [
  { href: "/projects", label: "Projects", icon: Pickaxe },
  { href: "/blogs", label: "Blogs", icon: Shovel },
  { href: "/resources", label: "Resources", icon: Wheat },
  { href: "/articles", label: "Articles", icon: Milk },
  { href: "/guides", label: "Guides", icon: Sprout },
  { href: "/showcases", label: "Showcases", icon: Flower2 },
];

const archiveEntries = [
  {
    href: "/projects",
    label: "Field Projects",
    desc: "Active excavations and engineering feats in progress.",
    guide:
      "Submit detailed schematics, build logs, and raw technical data. Document your failures as clearly as your successes.",
    icon: Pickaxe,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800",
  },
  {
    href: "/blogs",
    label: "Journal Entries",
    desc: "Personal chronicles of growth, thought, and discovery.",
    guide:
      "Post reflective narratives, daily observations, and philosophical inquiries regarding your craft.",
    icon: Shovel,
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800",
  },
];

export default function HomeHero() {
  const { data: versionData } = useGetLatestVersionQuery();
  const rawVersion = versionData?.version || "1.0.0-rc.5";

  const displayVersion = rawVersion.toLowerCase().startsWith("v")
    ? rawVersion
    : `v${rawVersion}`;

  return (
    <section className="relative w-full pt-16 pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5  blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4 relative">
            <MilkSVG />
            <Link
              href={versionData?.id ? `/updates/${versionData.id}` : "/updates"}
              className="inline-flex items-center gap-2.5  border bg-muted/40 px-3 py-1 mb-6 text-xs  transition-all hover:bg-muted/60"
            >
              <span className="text-muted-foreground ">
                Version : {displayVersion}
              </span>
            </Link>

            <h1 className="font-mobalys text-xl md:text-3xl lg:text-5xl xl:text-7xl text-foreground  ">
              Open Farm Land
            </h1>
            <div className="font-mobalys text-xl md:text-3xl lg:text-5xl xl:text-7xl text-foreground flex justify-center items-center w-full gap-4 py-4">
              <span className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]">
                ✧
              </span>
              <div className="h-[1px] md:h-[2px] w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <span className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]">
                ✧
              </span>
            </div>

            <p className=" text-muted-foreground leading-relaxed">
              This is a platform for sharing your ideas, project journey, blogs,
              resources, articles and more, you name it!
            </p>

            <div className="flex flex-col gap-2 p-3 px-4  bg-accent/30 border border-border/50">
              <p className="text-xs text-muted-foreground font-medium ">
                <span className=" text-foreground mr-1">Rule 1:</span>
                We encourage you guys not to use AI. Get your hands dirty use it
                as a tool, but don't rely on it fully.
              </p>
              <p className="text-xs text-muted-foreground font-medium ">
                <span className=" text-foreground mr-1">Rule 2:</span>
                Respect the community and its members. Be kind, constructive,
                and open to feedback. We are here to learn and grow together!
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              size="lg"
              className="h-12 px-8  shadow-md hover:shadow-primary/10 transition-all active:scale-95 rounded-none"
              asChild
            >
              <Link href="/create">
                <Plus className="mr-2 h-5 w-5 stroke-[3]" />
                Create a Project
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 font-semibold hover:bg-accent transition-all active:scale-95 rounded-none"
              asChild
            >
              <Link href="/discussions">
                <MessageSquare className="mr-2 h-5 w-5" />
                Community Feed
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {heroButtons.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col justify-between rounded-none border-[3px] border-double border-border/80 bg-card p-5 transition-all duration-300 hover:bg-accent hover:border-primary/40 hover:-translate-y-1 shadow-sm hover:shadow-md overflow-visible"
            >
              <CornerFlourish className="-top-1 -left-1 rotate-0" />
              <CornerFlourish className="-top-1 -right-1 rotate-90" />
              <CornerFlourish className="-bottom-1 -left-1 -rotate-90" />
              <CornerFlourish className="-bottom-1 -right-1 rotate-180" />

              <div className="flex items-center justify-between">
                <div className="p-2  bg-muted group-hover:bg-primary/10 transition-colors border border-dashed border-primary/20">
                  <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
              </div>
              <div className="mt-5">
                <p className="text-xs  font-bold  opacity-80 group-hover:opacity-100">
                  {label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* --- 🚜 MINIMALISM MANIFESTO SECTION --- */}
        <div className="mt-32 mb-20 max-w-4xl mx-auto px-4 md:px-0">
          <div className="relative group p-10 md:p-16 border-[3px] border-double border-primary/20 bg-card/5 backdrop-blur-sm overflow-visible">
            {/* 🚜 VINTAGE CORNERS (Elegant & Sharp) */}
            <CornerFlourish className="-top-1 -left-1 opacity-30" />
            <CornerFlourish className="-top-1 -right-1 rotate-90 opacity-30" />
            <CornerFlourish className="-bottom-1 -left-1 -rotate-90 opacity-30" />
            <CornerFlourish className="-bottom-1 -right-1 rotate-180 opacity-30" />

            <div className="flex flex-col items-center text-center">
              {/* Title */}
              <h2 className="font-mobalys text-5xl md:text-8xl text-foreground  mb-6">
                Minimalism
              </h2>

              {/* The Signature Divider */}
              <div className="font-mobalys text-xl md:text-3xl lg:text-5xl text-foreground flex justify-center items-center w-full max-w-xs gap-4 py-2 mb-3">
                <span className="text-primary/60 text-xs">✧</span>
                <div className="h-[1px] md:h-[2px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
                <span className="text-primary/60 text-xs">✧</span>
              </div>

              {/* Philosophy Body */}
              <div className="max-w-2xl space-y-6">
                <p className="text-sm md:text-base text-primary/70 italic font-serif">
                  "Perfection is achieved, not when there is nothing more to
                  add, but when there is nothing left to take away."
                </p>
                <span className="text-[10px] font-black  text-muted-foreground/40 mt-2 block">
                  — Antoine de Saint-Exupéry
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-24 space-y-16">
          {archiveEntries.map((item, index) => (
            <ArchivePlate
              key={item.href}
              href={item.href}
              title={item.label}
              description={item.desc}
              guideText={item.guide}
              image={item.image}
              icon={item.icon}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
}
