"use client";

import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import {
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// Sidebar-style footer links
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
    { href: "/hall-of-fame", label: "Hall of Fame" },
    { href: "/create", label: "Create Something" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/aup", label: "Acceptable Use Policy" },
    { href: "/security", label: "Security" },
  ],
};

const socialLinks = [
  {
    href: "https://x.com/biooids",
    icon: FaXTwitter,
    label: "X (Twitter)",
  },
  {
    href: "https://github.com/biooids",
    icon: FaGithub,
    label: "GitHub",
  },
  {
    href: "https://www.tiktok.com/@navi_biooid",
    icon: FaTiktok,
    label: "TikTok",
  },
  {
    href: "mailto:intellbiooid@gmail.com",
    icon: FaEnvelope,
    label: "Email",
  },
  {
    href: "https://wa.me/250790931024",
    icon: FaWhatsapp,
    label: "WhatsApp",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background/80 backdrop-blur-lg w-full">
      <div className="mx-auto w-full  px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Logo & tagline */}
          <div>
            <p className="mt-4 max-w-sm text-muted-foreground">
              <strong>Open Farmlands</strong> is your creative hub to showcase
              builds, craft guides, and connect with others. Start creating now.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <p className="font-semibold text-foreground">Explore</p>
              <ul className="mt-4 space-y-2">
                {links.explore.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">Community</p>
              <ul className="mt-4 space-y-2">
                {links.community.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">Legal</p>
              <ul className="mt-4 space-y-2">
                {links.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 border-t pt-6 sm:flex sm:items-center sm:justify-between">
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-primary"
              >
                <span className="sr-only">{social.label}</span>
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground sm:mt-0">
            &copy; {currentYear} Open Farmlands. Crafted by developers, for
            developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
