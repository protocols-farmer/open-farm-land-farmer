//src/components/pages/home/HeroSection.tsx
"use client";

import React, { useState } from "react";
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
  LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetLatestVersionQuery } from "@/lib/features/updates/updateApiSlice";
import { cn } from "@/lib/utils";
import MilkSVG from "./MilkSVG";
import {
  CornerFlourish,
  FlourishOrnate,
  SideFlourish,
} from "@/components/shared/Ornates";

const heroButtons = [
  { href: "/all", label: "All Posts", icon: LayoutGrid },
  { href: "/guides", label: "Guides", icon: Sprout },
  { href: "/projects", label: "Projects", icon: Pickaxe },
  { href: "/blogs", label: "Blogs", icon: Shovel },
  { href: "/resources", label: "Resources", icon: Wheat },
];

export default function HomeHero() {
  const { data: versionData } = useGetLatestVersionQuery();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const rawVersion = versionData?.version || "1.0.0-rc.5";
  const displayVersion = rawVersion.toLowerCase().startsWith("v")
    ? rawVersion
    : `v${rawVersion}`;

  return (
    <section className="relative w-full pt-15 pb-15 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-12 items-stretch ">
        {/* Left Column */}
        <div className="flex flex-col justify-between w-full h-full space-y-4 relative">
          <div>
            {/* <MilkSVG /> */}
            <Link
              href={versionData?.id ? `/updates/${versionData.id}` : "/updates"}
              className="inline-flex items-center gap-2.5 border bg-muted/40 px-3 py-1 mb-6 text-xs transition-all hover:bg-muted/60"
            >
              <span className="text-muted-foreground">
                Version : {displayVersion}
              </span>
            </Link>

            <h1 className="font-mobalys text-xl md:text-3xl lg:text-5xl xl:text-7xl text-foreground">
              Open Farm Land
            </h1>

            <div className="font-mobalys text-xl md:text-3xl lg:text-5xl xl:text-7xl text-foreground flex justify-start items-center w-full gap-4 py-4">
              <span className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]">
                ❁
              </span>
              <div className="h-[1px] md:h-[2px] w-full max-w-[200px] lg:max-w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <span className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary),0.4)]">
                ❁
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              This is a platform for sharing your ideas, project journey, blogs,
              resources, articles and more, you name it!
            </p>
          </div>

          {/* Pushed to the bottom of the left column to align nicely */}
          <div className="relative border-3 border-double flex flex-col gap-2 p-3 px-4 bg-accent/30 mt-8">
            <CornerFlourish className="-top-1 -left-1 rotate-0" />
            <CornerFlourish className="-top-1 -right-1 rotate-90" />
            <CornerFlourish className="-bottom-1 -left-1 -rotate-90" />
            <CornerFlourish className="-bottom-1 -right-1 rotate-180" />

            <p className="text-xs text-muted-foreground font-medium">
              <span className="text-foreground mr-1">Rule 1:</span>
              We encourage you guys not to use AI. Get your hands dirty use it
              as a tool, but don't rely on it fully.
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              <span className="text-foreground mr-1">Rule 2:</span>
              Respect the community and its members. Be kind, constructive, and
              open to feedback. We are here to learn and grow together!
            </p>
            <p className="text-xs text-muted-foreground">
              pss, hey bro, saw a bug or vulnerability? let us know!{" "}
              <Link href="/report-issue" className="text-primary underline">
                Report Issue
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-full h-full gap-6">
          {/* Video Wrapper: flex-1 takes up all available height to match the left column */}
          <div className="relative w-full flex-1 min-h-[250px] lg:min-h-0 bg-muted border-double border-3 ">
            <CornerFlourish className="-top-1 -left-1 rotate-0 z-20" />
            <CornerFlourish className="-top-1 -right-1 rotate-90 z-20" />
            <CornerFlourish className="-bottom-1 -left-1 -rotate-90 z-20" />
            <CornerFlourish className="-bottom-1 -right-1 rotate-180 z-20" />

            <FlourishOrnate className="-top-2 -left-2 -rotate-90 z-20" />
            <FlourishOrnate className="-top-2 -right-2 rotate-0 z-20" />
            <FlourishOrnate className="-bottom-2 -right-2 rotate-90 z-20" />
            <FlourishOrnate className="-bottom-2 -left-2 rotate-180 z-20" />

            <SideFlourish className="-top-2 left-1/2 -translate-x-1/2 bg-card px-2 z-20" />
            <SideFlourish className="-bottom-2 left-1/2 -translate-x-1/2 rotate-180 bg-card px-2 z-20" />
            <SideFlourish className="-left-[14px] top-1/2 -translate-y-1/2 -rotate-90 bg-card px-2 z-20" />
            <SideFlourish className="-right-[14px] top-1/2 -translate-y-1/2 rotate-90 bg-card px-2 z-20" />

            {/* Skeleton Loader */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/80 backdrop-blur-sm animate-pulse">
                <span className="text-xs tracking-widest text-muted-foreground/50 font-mobalys">
                  LOADING...
                </span>
              </div>
            )}

            <video
              autoPlay
              loop
              muted
              playsInline
              // poster="thumbnail.jpg"
              onLoadedData={() => setIsVideoLoaded(true)}
              className={cn(
                "absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ease-in-out z-0",
                isVideoLoaded ? "opacity-100" : "opacity-0",
              )}
            >
              {/* Modern, fast-loading version */}
              <source
                src="https://res.cloudinary.com/dhr9zmb3i/video/upload/v1774973247/real_ghuxlf.webm"
                type="video/webm"
              />
              {/* Universal compatibility fallback */}
              <source
                src="https://res.cloudinary.com/dhr9zmb3i/video/upload/v1774973236/real_utjdp9.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Buttons: mt-auto ensures they stay at the bottom of the column */}
          <div className="flex w-full flex-col gap-3 sm:flex-row mt-auto shrink-0">
            <Button
              size="lg"
              className="h-12 px-8 shadow-md hover:shadow-primary/10 transition-all active:scale-95 rounded-none w-full sm:w-auto"
              asChild
            >
              <Link href="/create">
                <Plus className="mr-2 h-5 w-5 stroke-3" />
                Create a Project
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 font-semibold hover:bg-accent transition-all active:scale-95 rounded-none w-full sm:w-auto"
              asChild
            >
              <Link href="/discussions">
                <MessageSquare className="mr-2 h-5 w-5" />
                Community Feed
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5"> */}
      <div className="mt-12 flex flex-wrap gap-3 *:flex-1 *:basis-[calc(50%-12px)] sm:*:basis-[calc(33%-12px)] md:*:basis-0">
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

            <FlourishOrnate className="-top-2 -left-2 -rotate-90" />
            <FlourishOrnate className="-top-2 -right-2 rotate-0" />
            <FlourishOrnate className="-bottom-2 -right-2 rotate-90" />
            <FlourishOrnate className="-bottom-2 -left-2 rotate-180" />

            <SideFlourish className="-top-2 left-1/2 -translate-x-1/2 bg-card px-2" />
            <SideFlourish className="-bottom-2 left-1/2 -translate-x-1/2 rotate-180 bg-card px-2" />
            <SideFlourish className="-left-[14px] top-1/2 -translate-y-1/2 -rotate-90 bg-card px-2" />
            <SideFlourish className="-right-[14px] top-1/2 -translate-y-1/2 rotate-90 bg-card px-2" />

            <div className="flex items-center justify-between">
              <div className="p-2 bg-muted group-hover:bg-primary/10 transition-colors border border-dashed border-primary/20">
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
            </div>
            <div className="mt-5">
              <p className="text-xs font-bold opacity-80 group-hover:opacity-100">
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-32 mb-20 max-w-4xl mx-auto px-4 md:px-0">
        <div className="relative group p-10 md:p-16 border-[3px] border-double backdrop-blur-sm">
          <CornerFlourish className="-top-1 -left-1 opacity-30" />
          <CornerFlourish className="-top-1 -right-1 rotate-90 opacity-30" />
          <CornerFlourish className="-bottom-1 -left-1 -rotate-90 opacity-30" />
          <CornerFlourish className="-bottom-1 -right-1 rotate-180 opacity-30" />

          <FlourishOrnate className="-top-2 -left-2 -rotate-90" />
          <FlourishOrnate className="-top-2 -right-2 rotate-0" />
          <FlourishOrnate className="-bottom-2 -right-2 rotate-90" />
          <FlourishOrnate className="-bottom-2 -left-2 rotate-180" />

          <SideFlourish className="-top-2 left-1/2 -translate-x-1/2 bg-card px-2" />
          <SideFlourish className="-bottom-2 left-1/2 -translate-x-1/2 rotate-180 bg-card px-2" />
          <SideFlourish className="-left-[14px] top-1/2 -translate-y-1/2 -rotate-90 bg-card px-2" />
          <SideFlourish className="-right-[14px] top-1/2 -translate-y-1/2 rotate-90 bg-card px-2" />

          <div className="flex flex-col items-center text-center">
            <h2 className="font-mobalys text-5xl md:text-8xl text-foreground mb-6">
              Minimalism
            </h2>

            <div className="font-mobalys text-xl md:text-3xl lg:text-5xl text-foreground flex justify-center items-center w-full max-w-xs gap-4 py-2 mb-3">
              <span className="text-primary/60 text-xs">❁</span>
              <div className="h-[1px] md:h-[2px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
              <span className="text-primary/60 text-xs">❁</span>
            </div>

            <div className="max-w-2xl space-y-6">
              <p className="text-sm md:text-base text-primary/70 italic font-serif">
                "Perfection is achieved, not when there is nothing more to add,
                but when there is nothing left to take away."
              </p>
              <span className="text-[10px] font-black text-muted-foreground/40 mt-2 block">
                — Antoine de Saint-Exupéry
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
