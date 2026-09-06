"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { site } from "@/data/site";

/**
 * A short, elegant intro overlay shown on first load. Simulates a brief
 * pre-loader (count to 100), locks scroll while active, then wipes away.
 * Collapses to a near-instant fade under reduced-motion.
 */
export function LoadingScreen() {
  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setProgress(100);
      const t = setTimeout(() => setDone(true), 150);
      return () => clearTimeout(t);
    }

    let raf = 0;
    let settle = 0;
    const start = performance.now();
    const duration = 1500;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        settle = window.setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);

    // Safety net: rAF pauses in background tabs and can be throttled. This
    // guarantees the loader always resolves (and never leaves the page
    // scroll-locked), even if the animation frame loop stalls.
    const fallback = window.setTimeout(() => {
      setProgress(100);
      setDone(true);
    }, duration + 1500);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
      clearTimeout(fallback);
    };
  }, [reduced]);

  // Lock scroll while the loader is on screen.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-base-950"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            clipPath: reduced ? undefined : "inset(0 0 100% 0)",
          }}
          transition={{ duration: reduced ? 0.2 : 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Monogram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-ring flex h-20 w-20 items-center justify-center rounded-2xl bg-base-900"
            >
              <span className="font-display text-3xl font-bold text-gradient-accent">
                W
              </span>
            </motion.div>

            <div className="flex flex-col items-center gap-3">
              <span className="font-display text-sm uppercase tracking-[0.4em] text-ink-muted">
                {site.name}
              </span>

              {/* Progress bar */}
              <div className="h-px w-56 overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent to-cyan-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="font-mono text-xs text-ink-faint">
                {String(progress).padStart(3, "0")}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
