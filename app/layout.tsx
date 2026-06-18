import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});
const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aidanautomations.com"),
  title: "Aidan Automations | Project Mycelium",
  description:
    "Project Mycelium audits AI cost, workflow waste, and automation risk, then designs governed operating systems for modern teams.",
  authors: [{ name: "Aidan Automations" }],
  openGraph: {
    title: "Aidan Automations | Project Mycelium",
    description:
      "AI cost intelligence and governed automation for teams building serious AI workflows.",
    url: "https://aidanautomations.com",
    siteName: "Aidan Automations",
    type: "website",
    images: ["/logo-lockup.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020914",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}<Analytics /></body>
    </html>
  );
}
