"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stats } from "@/components/Stats";
import { ProfileOrbit } from "./ProfileOrbit";
import { about } from "@/data/about";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Text */}
          <div>
            <SectionHeading
              eyebrow="01 — About"
              title={about.heading}
              description={about.lead}
            />

            <div className="mt-8 flex flex-col gap-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-base leading-relaxed text-ink-muted sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Interactive visual */}
          <Reveal direction="none" duration={0.9}>
            <ProfileOrbit />
          </Reveal>
        </div>

        {/* Stats */}
        <div className="mt-20">
          <Stats />
        </div>
      </div>
    </section>
  );
}
