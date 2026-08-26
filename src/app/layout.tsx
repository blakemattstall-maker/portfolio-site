import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const clash = localFont({
  src: [
    { path: "../../public/fonts/clash-display-600.woff2", weight: "600" },
    { path: "../../public/fonts/clash-display-700.woff2", weight: "700" },
  ],
  variable: "--font-clash",
  display: "swap",
});

const switzer = localFont({
  src: [
    { path: "../../public/fonts/switzer-400.woff2", weight: "400" },
    { path: "../../public/fonts/switzer-500.woff2", weight: "500" },
    { path: "../../public/fonts/switzer-700.woff2", weight: "700" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blake Stall · Marketing & Media",
  description:
    "Marketing student at Illinois State with three years behind the camera. I make things people watch, and study why they work.",
  metadataBase: new URL("https://blakestall.com"),
  openGraph: {
    title: "Blake Stall · Marketing & Media",
    description: "Marketing student and compulsive builder creating videos, brands, and software.",
    url: "https://blakestall.com",
    siteName: "Blake Stall",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Blake Stall portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${clash.variable} ${switzer.variable} ${jbmono.variable} h-full antialiased`}>
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
