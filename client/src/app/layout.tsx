//src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layouts/ThemeProvider";
import ReduxProvider from "@/components/layouts/ReduxProvider";
import AuthInitializer from "@/components/layouts/AuthInitializer";
import { AuthModal } from "@/components/layouts/AuthModal";
import { Toaster } from "react-hot-toast";
import Background from "@/components/pages/home/Background";
import MaintenanceGuard from "@/components/shared/MaintenanceGuard";
import localFont from "next/font/local";
import { SvgSpriteDefs } from "@/components/shared/Ornates";
import SanctionGuard from "@/components/shared/SanctionGuard";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mobalys = localFont({
  src: "./fonts/Mobalys-Regular.ttf",
  variable: "--font-mobalys",
  display: "swap",
});

const siteConfig = {
  name: "Open Farm Land",
  description:
    "Open Farm Land is a platform to share your ideas, project journeys, blogs, and resources. No we don't recommend using AI-generated fluff. We believe in human creativity and documentation.",
  url: "https://open-farm-land-farmer.vercel.app",
  ogImage:
    "https://res.cloudinary.com/dhr9zmb3i/image/upload/v1772941596/open-farm-land_kfo5ui.png",
  author: "Biooids",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Open Farm Land",
    "Project Journey",
    "Developer Blog",
    "Open Source Community",
    "Human-Made Content",
    "Tech Showcases",
    "Programming Guides",
  ],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,

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
        alt: "Open Farm Land - Share your project journeys and ideas with the world.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@biooids",
  },

  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },

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
    "ai-content": "none",
    "robots-content": "noarchive",
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
        className={`${geistSans.variable} ${geistMono.variable} ${mobalys.variable} antialiased min-h-screen font-sans selection:bg-primary/30`}
      >
        <Background />
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" reverseOrder={false} />

            <AuthInitializer>
              <MaintenanceGuard>
                <SanctionGuard>
                  <SvgSpriteDefs />

                  <main className="relative     mx-auto">{children}</main>
                </SanctionGuard>
              </MaintenanceGuard>
            </AuthInitializer>
            <AuthModal />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
