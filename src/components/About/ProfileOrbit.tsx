"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { about } from "@/data/about";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Interactive About visual: the profile photo sits inside an animated gradient
 * ring, ringed by the focus-area chips. Hovering a chip reveals its one-liner.
 * If `public/profile.jpg` is missing, a stylized "W" monogram is shown instead
 * (see `site.photo`) — nothing breaks either way.
 */
export function ProfileOrbit() {
  const reduced = usePrefersReducedMotion();
  const [photoError, setPhotoError] = useState(false);
  const [activeChip, setActiveChip] = useState<number | null>(null);

  const focus = about.focus;
  const radius = 42; // percentage of container

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* Decorative rotating rings */}
      <div
        className="absolute inset-[6%] rounded-full border border-dashed border-white/10"
        style={reduced ? undefined : { animation: "spin-slow 60s linear infinite" }}
      />
      <div
        className="absolute inset-[18%] rounded-full border border-white/[0.06]"
        style={reduced ? undefined : { animation: "spin-slow 45s linear infinite reverse" }}
      />
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(124,92,255,0.18),transparent_60%)]" />

      {/* Center photo / monogram */}
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="gradient-ring absolute inset-[27%] overflow-hidden rounded-full bg-base-900 shadow-glow"
      >
        {!photoError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={site.photo}
            alt={`${site.name} — ${site.role}`}
            className="h-full w-full object-cover"
            onError={() => setPhotoError(true)}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-base-800 to-base-950">
            <span className="font-display text-5xl font-bold text-gradient-accent">
              {site.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
          </div>
        )}
      </motion.div>

      {/* Focus chips around the orbit */}
      {focus.map((f, i) => {
        const angle = (i / focus.length) * Math.PI * 2 - Math.PI / 2;
        const left = 50 + radius * Math.cos(angle);
        const top = 50 + radius * Math.sin(angle);
        const isActive = activeChip === i;

        return (
          <motion.div
            key={f.label}
            className="absolute z-10"
            style={{ left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" }}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
          >
            <button
              onMouseEnter={() => setActiveChip(i)}
              onMouseLeave={() => setActiveChip(null)}
              onFocus={() => setActiveChip(i)}
              onBlur={() => setActiveChip(null)}
              className={cn(
                "group relative whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300",
                isActive
                  ? "border-cyan-glow/50 bg-cyan-glow/10 text-ink shadow-glow-cyan"
                  : "glass text-ink-muted hover:text-ink",
              )}
            >
              {f.label}
              {/* Tooltip */}
              <span
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-base-800 px-2.5 py-1 text-[10px] text-ink-muted shadow-lg transition-all duration-200",
                  isActive ? "opacity-100" : "translate-y-1 opacity-0",
                )}
              >
                {f.description}
              </span>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
