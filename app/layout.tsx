import type { Metadata } from "next";
import "./globals.css";
import ParallaxWave from "@/components/ParallaxWave";

export const metadata: Metadata = {
  title: "Aidan Automations | AI Automation Consulting",
  description: "Cut manual work. Stay competitive. Grow faster. Free automation audit for small businesses.",
  viewport: "width=device-width, initial-scale=1",
  authors: [{ name: "Aidan Automations" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased font-sans text-primary-dark bg-white">
        <ParallaxWave />
        {children}
      </body>
    </html>
  );
}
