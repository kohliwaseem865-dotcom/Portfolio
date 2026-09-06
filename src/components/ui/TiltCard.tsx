"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  intensity?: number;
  onClick?: () => void;
}

/**
 * Cursor-reactive 3D tilt with a moving specular highlight. Gracefully becomes
 * a static card on touch devices or when reduced-motion is set.
 */
export function TiltCard({ children, className, intensity = 8, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isPointerFine = useMediaQuery("(pointer: fine)");
  const active = isPointerFine && !reduced;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20,
  });
  const rotY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20,
  });

  const glare = useTransform([mx, my], ([gx, gy]) =>
    `radial-gradient(600px circle at ${(gx as number) * 100}% ${(gy as number) * 100}%, rgba(255,255,255,0.10), transparent 40%)`,
  );

  const handleMove = (e: React.MouseEvent) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={
        active
          ? { rotateX: rotX, rotateY: rotY, transformPerspective: 900 }
          : undefined
      }
      className={cn("preserve-3d relative", className)}
    >
      {children}
      {active ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
      ) : null}
    </motion.div>
  );
}
