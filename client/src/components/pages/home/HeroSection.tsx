// src/components/pages/home/HeroSection.tsx
import Link from "next/link";
import {
  FileCode2,
  Pen,
  Globe,
  Newspaper,
  BookOpen,
  Trophy,
  MessageSquare,
  Plus,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const heroButtons = [
  { href: "/projects", label: "Projects", icon: FileCode2 },
  { href: "/blogs", label: "Blogs", icon: Pen },
  { href: "/resources", label: "Resources", icon: Globe },
  { href: "/articles", label: "Articles", icon: Newspaper },
  { href: "/guides", label: "Guides", icon: BookOpen },
  { href: "/showcases", label: "Showcases", icon: Trophy },
];

export default function HomeHero() {
  return (
    <section className="relative w-full  pt-16 pb-8">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md border bg-muted/50 px-2 py-1 text-xs font-medium mb-4">
              <span className="flex h-2 w-2 rounded-full bg-primary" />
              1.0.0-rc.1{" "}
            </div>

            <h1 className="text-4xl font-black uppercase tracking-tighter sm:text-6xl">
              Open Farmlands
            </h1>

            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              This is a platform for sharing your <strong>ideas</strong>,
              <strong> project journey</strong>, <strong>blogs</strong>,
              <strong> resources</strong>, <strong>articles</strong> and more,
              you name it!.
            </p>
            <p className="mt-4 text-muted-foreground text-sm">
              <span className=" font-bold ">#Rule 1 </span>: We encourage you
              guys not to use ai, don't be lazy get your hands dirty you can use
              it but don't rely on it fully.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button size="lg" className="h-12 px-6 font-bold" asChild>
              <Link href="/create">
                <Plus className="mr-2 h-5 w-5" />
                Sow a Project
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-6" asChild>
              <Link href="/discussions">
                <MessageSquare className="mr-2 h-5 w-5" />
                Community Feed
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          {heroButtons.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col justify-between rounded-xl border bg-card p-4 transition-colors hover:bg-accent hover:border-primary/50"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary" />
              </div>
              <div className="mt-4">
                <p className="text-sm font-bold tracking-tight">{label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
