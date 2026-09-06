"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small label above the title, e.g. "01 — About". */
  eyebrow?: string;
  title: string;
  /** Supporting sentence under the title. */
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const reduced = usePrefersReducedMotion();
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-muted"
        >
          <span className="h-px w-6 bg-gradient-to-r from-accent to-cyan-glow" />
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.h2
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>

      {description ? (
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
