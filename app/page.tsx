import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Loader } from "@/components/fx/Loader";
import { CustomCursor } from "@/components/fx/CustomCursor";
import { FieldBackground } from "@/components/fx/FieldBackground";
import { Nav } from "@/components/site/Nav";
import { Journey } from "@/components/site/Journey";
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
          <Journey />
          <SiteFooter />
        </div>
      </SmoothScroll>
    </>
  );
}
