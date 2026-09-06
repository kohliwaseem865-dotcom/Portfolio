"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journey } from "@/data/journey";

export function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="04 — Experience"
          title="My journey"
          description="I'm early in the story and moving fast. Here's the path so far — honest milestones, not job titles."
        />

        <div className="relative mt-14 pl-8 sm:pl-10">
          {/* Rail */}
          <div className="absolute left-[9px] top-2 h-full w-px bg-gradient-to-b from-accent via-cyan-glow/40 to-transparent sm:left-[11px]" />

          <ol className="flex flex-col gap-10">
            {journey.map((item, i) => (
              <motion.li
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Dot */}
                <span className="absolute -left-8 top-1.5 flex h-[19px] w-[19px] items-center justify-center rounded-full bg-base-900 ring-1 ring-white/10 sm:-left-10">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-accent to-cyan-glow shadow-glow-cyan" />
                </span>

                <div className="gradient-ring rounded-2xl glass p-5 transition-colors duration-300 hover:bg-white/[0.05] sm:p-6">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-glow">
                    {item.year}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                  {item.tags && item.tags.length > 0 ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-ink-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
