"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="05 — Services"
          title="How I can help"
          description="From a first Flutter build to AI features and automation — here's what I can take on, end to end."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="gradient-ring group relative flex flex-col gap-4 overflow-hidden rounded-3xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05]"
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.05] text-accent-300 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/15 group-hover:text-cyan-glow">
                  <Icon size={22} />
                </span>

                <div className="relative">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-ink-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
