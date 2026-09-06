"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Sparkles, MousePointerClick } from "lucide-react";
import { HeroCanvas } from "./HeroCanvas";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const headlineLines = ["Building digital", "experiences with", "code & AI"];

export function Hero() {
  const reduced = usePrefersReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.15 },
    },
  };

  const item: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
    >
      {/* 3D backdrop */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
        {/* Legibility gradient over the scene */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base-950 via-base-950/60 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-base-950 to-transparent" />
      </div>

      <div className="container-px relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Availability badge */}
          <motion.div variants={item} className="mb-7 inline-flex">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-ink-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {site.location}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="font-display text-[11vw] font-semibold uppercase leading-[0.95] tracking-tightest text-ink sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {headlineLines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  variants={item}
                  className={i === headlineLines.length - 1 ? "text-gradient" : "block"}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mt-6 flex items-center gap-2 font-mono text-sm text-transparent sm:text-base"
          >
            <Sparkles size={16} className="text-accent-300" />
            <span className="text-gradient-accent">{site.shortTagline}</span>
          </motion.p>

          {/* Intro */}
          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {site.intro}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton variant="primary" onClick={() => scrollTo("projects")}>
              View My Work
              <ArrowUpRight size={18} />
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => scrollTo("contact")}>
              Let&apos;s Connect
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.button
          onClick={() => scrollTo("about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-faint transition-colors hover:text-ink md:flex"
          aria-label="Scroll to about section"
        >
          <MousePointerClick size={16} />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-ink-faint to-transparent" />
        </motion.button>
      )}
    </section>
  );
}
