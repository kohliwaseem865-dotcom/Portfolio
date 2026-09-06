"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Respects the OS-level "reduce motion" setting. When true, components should
 * disable non-essential animation (parallax, auto-playing 3D, big reveals).
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
