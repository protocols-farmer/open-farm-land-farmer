//src/components/pages/about/About.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, MessageSquare, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function About() {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <main className="max-w-4xl mx-auto py-24 px-8 flex flex-col gap-10">
      <section className=" text-center flex flex-col gap-4">
        <div className="flex justify-center h-20 relative">
          <Image
            src="https://res.cloudinary.com/dhr9zmb3i/image/upload/v1772941596/open-farm-land_kfo5ui.png"
            alt="Open Farmland Logo"
            width={200}
            height={200}
            className="object-contain dark:invert-0 invert"
            priority
          />
        </div>
        <h1 className="text-6xl font-black   ">Open Farm Land</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          This is a platform for sharing your ideas, project journey, blogs,
          resources, articles and more,stuff!
        </p>
      </section>

      <section className="bg-card border  p-5 md:p-7 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative shrink-0 w-40 h-40">
            <div className="absolute inset-0 bg-primary/20 blur-2xl " />

            {imageLoading && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted ">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            )}

            {imageError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted  border-2 border-dashed">
                <AlertCircle className="h-6 w-6 text-destructive mb-2" />
                <span className="text-[10px]  font-bold text-muted-foreground">
                  Error
                </span>
              </div>
            ) : (
              <Image
                src="https://res.cloudinary.com/dhr9zmb3i/image/upload/v1772941590/cat_kw8xmu.jpg"
                alt="Protocols Farmer"
                fill
                sizes="160px"
                className={cn(
                  "relative object-cover  border-2 border-primary transition-all duration-500",
                  imageLoading ? "opacity-0" : "opacity-100",
                )}
                onLoadingComplete={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
              />
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-sm font-bold   text-muted-foreground mb-1">
              Created By
            </h3>
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-black  mb-4">Protocols Farmer</h2>
              <h3 className=" text-xs">
                Real names : Hwapyong Maniragaba edouard
              </h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                I am a software developer and I love farming. I built this
                platform for people to share their work openly with the world
                and grow together as a community.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {/* <Button variant="outline" size="sm" asChild>
                <Link
                  href="https://github.com/protocols-farmer"
                  target="_blank"
                >
                  <Github className="mr-2 h-4 w-4" />
                  Github
                </Link>
              </Button> */}

              <div className="inline-flex items-center text-xs font-mono text-primary/60 px-4 py-2 border border-primary/20  bg-primary/5">
                <MessageSquare className="mr-2 h-3 w-3 animate-pulse" />
                Chat functionality coming soon
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
