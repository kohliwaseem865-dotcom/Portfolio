"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * A subtle two-part custom cursor for pointer-fine (desktop) devices: a precise
 * dot plus a trailing ring that enlarges over interactive elements. Never shown
 * on touch devices — those keep the native cursor and this component renders
 * nothing.
 */
export function Cursor() {
  const isPointerFine = useMediaQuery("(pointer: fine)");
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!isPointerFine) return;

    document.body.setAttribute("data-custom-cursor", "true");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, [role="button"], [data-cursor="hover"], input, textarea, select, label',
      );
      setHovering(Boolean(interactive));
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.body.removeAttribute("data-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms" }}
    >
      {/* Trailing ring */}
      <motion.div
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-white/40 mix-blend-difference"
        style={{ x: ringX, y: ringY }}
        animate={{
          scale: down ? 0.7 : hovering ? 1.8 : 1,
          borderColor: hovering ? "rgba(56,230,255,0.9)" : "rgba(255,255,255,0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
      {/* Precise dot */}
      <motion.div
        className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x, y }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
}
