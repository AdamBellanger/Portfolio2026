import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SiteNav } from "@/components/layout/SiteNav";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";
import { CursorFollower } from "@/components/ui/CursorFollower";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const clashDisplay = localFont({
  src: [
    { path: "../public/fonts/clash-display/ClashDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/clash-display/ClashDisplay-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/clash-display/ClashDisplay-Semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/clash-display/ClashDisplay-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-clash-display",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Adam Bellanger — Systèmes, réseaux & développement",
  description: site.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: "Adam Bellanger — Systèmes, réseaux & développement",
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${clashDisplay.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <SmoothScroll />
        <CursorFollower />
        <SiteNav />
        <PageTransition>
          {children}
          <Footer />
        </PageTransition>
      </body>
    </html>
  );
}
