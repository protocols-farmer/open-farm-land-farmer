//src/components/layouts/footer/Footer.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useGetLatestVersionQuery } from "@/lib/features/updates/updateApiSlice";
import { FaEnvelope, FaWhatsapp, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ArrowUpRight, Sparkles } from "lucide-react";

const links = {
  explore: [
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blogs" },
    { href: "/resources", label: "Resources" },
    { href: "/articles", label: "Articles" },
    { href: "/guides", label: "Guides" },
    { href: "/showcases", label: "Showcases" },
  ],
  community: [
    { href: "/discussions", label: "Discussions" },
    { href: "/events", label: "Events" },
    { href: "/create", label: "Create Something" },
    { href: "/contacts", label: "Contacts" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/aup", label: "Acceptable Use Policy" },
    { href: "/security", label: "Security" },
  ],
};

const socialLinks = [
  { href: "https://x.com/biooids", icon: FaXTwitter, label: "X" },
  { href: "mailto:intellbiooid@gmail.com", icon: FaEnvelope, label: "Email" },
  { href: "https://wa.me/250790931024", icon: FaWhatsapp, label: "WhatsApp" },
  // { href: "https://github.com/biooids", icon: FaGithub, label: "GitHub" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: versionData } = useGetLatestVersionQuery();
  const rawVersion = versionData?.version || "1.0.0-rc.5";

  const displayVersion = rawVersion.toLowerCase().startsWith("v")
    ? rawVersion
    : `v${rawVersion}`;

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-black tracking-tighter  ">
                Open Farm Land
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                The creative harvest for digital craftsmen. Showcase builds,
                share knowledge, and grow together in an open ecosystem.
              </p>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="p-2  bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <span className="sr-only">{social.label}</span>
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <p className="text-sm font-bold  tracking-widest text-foreground mb-6">
                Explore
              </p>
              <ul className="space-y-3">
                {links.explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary flex items-center group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold  tracking-widest text-foreground mb-6">
                Community
              </p>
              <ul className="space-y-3">
                {links.community.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary flex items-center group"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold  tracking-widest text-foreground mb-6">
                Legal
              </p>
              <ul className="space-y-3">
                {links.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} Open Farm Land.
            </p>
            <div className="h-4 w-px bg-border hidden md:block" />
            <p className="text-xs text-muted-foreground font-medium ">
              Crafted by biooids under open source license, <br /> by creators
              for creators.
            </p>
          </div>

          <Link
            href={versionData?.id ? `/updates/${versionData.id}` : "/updates"}
            className="group flex items-center gap-2 px-3 py-1  bg-muted/50 border border-border/50 hover:border-primary/30 transition-all"
          >
            <span className="text-[10px] font-bold  tracking-tighter text-muted-foreground group-hover:text-primary transition-colors">
              Version {displayVersion}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
