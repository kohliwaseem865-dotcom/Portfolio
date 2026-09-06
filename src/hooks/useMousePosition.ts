"use client";

import { useEffect, useRef } from "react";

export interface Vec2 {
  x: number;
  y: number;
}

/**
 * Tracks normalized pointer position (-1..1 on each axis) via a ref so
 * consumers (e.g. the 3D scene) can read it every frame without re-rendering.
 * No-ops on touch devices where parallax isn't meaningful.
 */
export function useMousePosition(enabled = true) {
  const pos = useRef<Vec2>({ x: 0, y: 0 });
  const target = useRef<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled]);

  return { pos, target };
}
