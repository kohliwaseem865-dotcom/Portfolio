"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  /** For anchors that leave the site. */
  external?: boolean;
  /** Marks the element for the custom-cursor hover state. */
  cursorTarget?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "text-base-950 bg-gradient-to-r from-accent-300 via-accent to-cyan-glow shadow-glow hover:shadow-[0_0_50px_-6px_rgba(56,230,255,0.55)]",
  secondary:
    "text-ink glass hover:border-white/20 hover:bg-white/[0.06]",
  ghost: "text-ink-muted hover:text-ink",
};

/**
 * A premium CTA that gently follows the cursor (magnetic effect) on pointer
 * devices. Disables the magnetism on touch / reduced-motion. Renders as an
 * <a> when `href` is provided, otherwise a <button>.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  ariaLabel,
  external,
  cursorTarget = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const isPointerFine = useMediaQuery("(pointer: fine)");
  const magnetic = isPointerFine && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.3);
    y.set(relY * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-[box-shadow,background,border-color,color] duration-300 will-change-transform",
    variantStyles[variant],
    className,
  );

  const inner = (
    <motion.span
      style={magnetic ? { x: springX, y: springY } : undefined}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const commonProps = {
    className: classes,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    "aria-label": ariaLabel,
    "data-cursor": cursorTarget ? "hover" : undefined,
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...commonProps}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      {...commonProps}
      type="button"
      onClick={onClick}
    >
      {inner}
    </button>
  );
}
