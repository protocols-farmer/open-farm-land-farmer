import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layouts/ThemeProvider";
import SessionProviderWrapper from "@/components/layouts/SessionProviderWrapper";
import ReduxProvider from "@/components/layouts/ReduxProvider";
import { NextAuthSync } from "@/components/layouts/NextAuthSync";
import AuthInitializer from "@/components/layouts/AuthInitializer";
import { AuthModal } from "@/components/layouts/AuthModal";
import { Toaster } from "react-hot-toast";
import Background from "@/components/pages/home/Background";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- SEO CONSTANTS ---
const siteConfig = {
  name: "Open Farmlands",
  description:
    "Open farm lands is a platform to share your ideas, project journeys, blogs, and resources. No we don't recommend using AI-generated fluff. We believe in human creativity and documentation.",
  url: "https://open-farm-land-farmer.vercel.app", // Update this when you have a custom domain
  ogImage:
    "https://res.cloudinary.com/djtww0vax/image/upload/v1766912208/open_zrhcas.png", // Ensure you create this file in /public
  author: "Biooids",
};

// --- VIEWPORT CONFIG ---
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Good for accessibility
};

// --- METADATA (SEO JUNK) ---
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`, // Allows sub-pages to be "My Project | Open Farmlands"
  },
  description: siteConfig.description,
  keywords: [
    "Open Farmlands",
    "Project Journey",
    "Developer Blog",
    "Open Source Community",
    "Human-Made Content",
    "Tech Showcases",
    "Programming Guides",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,

  // OpenGraph (Facebook, LinkedIn, Discord)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Open Farmlands - Share your project journeys and ideas with the world.",
      },
    ],
  },

  // Twitter (X)
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@biooids", // Update with your actual X handle
  },

  // Icons (Place these in /public)
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },

  // Robots & Crawlers
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Search Engine Verification
  // verification: {
  //   google: "your-google-verification-code",
  // },
  other: {
    "ai-content": "none", // Custom meta tag to indicate no AI-generated content
    "robots-content": "noarchive", // Prevents Google from showing a "Cached" version (keeps content fresh)
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen font-sans selection:bg-primary/30`}
      >
        <Background />
        <ReduxProvider>
          <SessionProviderWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="top-center" reverseOrder={false} />

              {/* Logic Components */}
              <NextAuthSync />
              <AuthInitializer>
                <main className="relative z-10">{children}</main>
              </AuthInitializer>

              {/* Global UI Components */}
              <AuthModal />
            </ThemeProvider>
          </SessionProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
