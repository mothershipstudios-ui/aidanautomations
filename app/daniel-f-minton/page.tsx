import type { Metadata } from "next";
import Image from "next/image";
import { FieldBackground } from "@/components/fx/FieldBackground";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { StatusBlip } from "@/components/ui/StatusBlip";

const pageUrl = "https://aidanautomations.com/daniel-f-minton";
const email = "daniel.f.minton@gmail.com";
const linkedIn = "https://www.linkedin.com/in/daniel-f-minton";

export const metadata: Metadata = {
  title: "Daniel F. Minton | Operations and Supply Chain Strategy",
  description:
    "Daniel F. Minton is a Charlotte-based operations and supply chain professional focused on demand planning, process improvement, and practical automation.",
  alternates: {
    canonical: "/daniel-f-minton",
  },
  openGraph: {
    title: "Daniel F. Minton | Operations and Supply Chain Strategy",
    description:
      "Charlotte-based operations, supply chain, process improvement, and automation strategy.",
    url: pageUrl,
    siteName: "Aidan Automations",
    type: "profile",
    images: ["/logo-lockup.png"],
  },
};

const skills = [
  "Operations strategy",
  "Supply chain management",
  "Demand planning",
  "Process improvement",
  "Workflow automation",
  "Business case development",
  "Cross-functional execution",
  "Performance reporting",
];

const proofPoints = [
  {
    label: "Planning discipline",
    text: "Turns forecasting, workflow, and capacity signals into clear operating decisions.",
  },
  {
    label: "Process improvement",
    text: "Finds waste, simplifies handoffs, and builds repeatable systems around real constraints.",
  },
  {
    label: "Automation judgment",
    text: "Applies automation where it improves speed, accuracy, visibility, or control.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel F. Minton",
  alternateName: "Daniel Minton",
  url: pageUrl,
  email,
  jobTitle: "Operations and Supply Chain Professional",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Charlotte",
    addressRegion: "NC",
    addressCountry: "US",
  },
  knowsAbout: skills,
  sameAs: [linkedIn],
};

export default function DanielFMintonPage() {
  return (
    <>
      <FieldBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SmoothScroll>
        <main className="relative z-10 min-h-screen overflow-hidden px-5 py-8 lg:px-8">
          <section className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-[1180px] flex-col justify-between">
            <header className="flex items-center justify-between gap-6 border-b border-line/10 pb-6">
              <a href="/" className="flex items-center gap-3" aria-label="Aidan Automations">
                <Image
                  src="/logo.png"
                  alt=""
                  width={40}
                  height={40}
                  priority
                  className="h-10 w-10 object-contain"
                />
                <span className="hidden font-mono text-xs font-semibold tracking-[0.16em] text-ink sm:inline">
                  AIDAN<span className="text-ink-dim">//</span>AUTOMATIONS
                </span>
              </a>
              <span className="label-mono hidden sm:inline">UNLISTED PROFILE</span>
            </header>

            <div className="grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:py-20">
              <div>
                <StatusBlip tone="live" label="Charlotte, NC" />
                <h1 className="mt-7 max-w-[10ch] font-display text-[clamp(3.25rem,9vw,8.5rem)] font-medium leading-[0.88] text-ink">
                  Daniel F. Minton
                </h1>
                <p className="mt-8 max-w-[58ch] text-lg leading-8 text-ink-muted md:text-xl">
                  Operations and supply chain professional focused on demand planning,
                  process improvement, and practical automation for teams that need
                  clearer decisions and cleaner execution.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`mailto:${email}?subject=Professional%20Inquiry%20-%20Daniel%20F.%20Minton`}
                    className="group relative inline-flex items-center justify-center overflow-hidden border border-cyan/50 bg-cyan/5 px-7 py-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan clip-notch"
                  >
                    <span className="relative z-10">Contact</span>
                    <span className="absolute inset-0 -translate-x-full bg-cyan/15 transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  </a>
                  <a
                    href={linkedIn}
                    className="inline-flex items-center justify-center border border-line/20 px-7 py-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors hover:border-cyan/40 hover:text-cyan clip-notch"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>

              <aside className="relative overflow-hidden border border-line/15 bg-obsidian-900/60 p-6 clip-notch md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(85%_80%_at_100%_0%,#000,transparent_70%)]" />
                <div className="relative">
                  <p className="label-mono">Professional Focus</p>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="border border-line/10 bg-void/35 px-4 py-3 text-sm text-ink-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>

            <section className="grid gap-px overflow-hidden border border-line/15 bg-line/10 md:grid-cols-3">
              {proofPoints.map((item) => (
                <article key={item.label} className="bg-obsidian-950/90 p-6 md:p-8">
                  <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-cyan">
                    {item.label}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-ink-muted">{item.text}</p>
                </article>
              ))}
            </section>

            <footer className="flex flex-col gap-3 border-t border-line/10 py-6 text-sm text-ink-dim sm:flex-row sm:items-center sm:justify-between">
              <span>Daniel F. Minton | Charlotte, North Carolina</span>
              <a href={`mailto:${email}`} className="transition-colors hover:text-cyan">
                {email}
              </a>
            </footer>
          </section>
        </main>
      </SmoothScroll>
    </>
  );
}
