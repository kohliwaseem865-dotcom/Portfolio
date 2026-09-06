"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Seconds. */
  duration?: number;
  direction?: Direction;
  /** Distance in px for the entrance offset. */
  distance?: number;
  once?: boolean;
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Reveals children when scrolled into view. Fully collapses to a plain fade
 * (or no motion) when the user prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 28,
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion();

  const variants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, ...offset(direction, distance) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduced ? 0.01 : duration,
        delay: reduced ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </motion.div>
  );
}
