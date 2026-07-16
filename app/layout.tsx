import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { BackToTop } from "@/components/ui/BackToTop";
import { Header } from "@/components/ui/Header";
import { SITE_URL } from "@/content/site";
import "./globals.css";

const anton = localFont({
  src: "./fonts/anton-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const grotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/space-grotesk-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/space-grotesk-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrains = localFont({
  src: "./fonts/jetbrains-mono-latin-400-normal.woff2",
  weight: "400",
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Joshua Wayman A. Arabejo — Aspiring Full-Stack Dev & UI UX Designer",
  description:
    "Aspiring Full-Stack Dev & UI UX Designer crafting modern, scalable, and user-focused digital experiences. BSIT student passionate about web applications, UI/UX, and clean architecture.",
  keywords: [
    "Joshua Wayman A. Arabejo",
    "Aspiring Full-Stack Dev & UI UX Designer",
    "Web Developer",
    "Laravel",
    "React",
    "Next.js",
    "Portfolio",
  ],
  openGraph: {
    title: "Joshua Wayman A. Arabejo — Aspiring Full-Stack Dev & UI UX Designer",
    description:
      "Aspiring Full-Stack Dev & UI UX Designer crafting modern, scalable, and user-focused digital experiences.",
    url: SITE_URL,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${grotesk.variable} ${jetbrains.variable}`}>
      <body className="grain bg-ink text-cream">
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
