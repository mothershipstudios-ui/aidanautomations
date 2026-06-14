import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Loader } from "@/components/fx/Loader";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { FieldBackground } from "@/components/fx/FieldBackground";
import { Marquee } from "@/components/fx/Marquee";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { SystemsShowcase } from "@/components/site/SystemsShowcase";
import { SystemsBackground } from "@/components/site/SystemsBackground";
import { Method } from "@/components/site/Method";
import { ClosingCTA } from "@/components/site/ClosingCTA";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <FieldBackground />
      <SmoothScroll>
        <Nav />
        <div className="relative z-10">
          <main>
            <Hero />
            <Marquee />
            <SystemsShowcase />
            <SystemsBackground />
            <Method />
            <ClosingCTA />
          </main>
          <SiteFooter />
        </div>
      </SmoothScroll>
    </>
  );
}
