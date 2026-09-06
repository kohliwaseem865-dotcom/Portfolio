"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "low" | "high";

export interface DeviceProfile {
  /** Resolved once on the client; `null` until then. */
  tier: PerformanceTier | null;
  /** Whether it's safe to render the full 3D scene. */
  enable3D: boolean;
  /** Suggested particle count for the current device. */
  particleCount: number;
  /** Device pixel ratio cap for the 3D canvas. */
  dprCap: [number, number];
  isMobile: boolean;
  isTouch: boolean;
}

const HIGH: Omit<DeviceProfile, "tier" | "isMobile" | "isTouch"> = {
  enable3D: true,
  particleCount: 1400,
  dprCap: [1, 1.8],
};

const LOW: Omit<DeviceProfile, "tier" | "isMobile" | "isTouch"> = {
  enable3D: true,
  particleCount: 450,
  dprCap: [1, 1.4],
};

/**
 * Heuristic device-performance detection. Errs conservative: coarse pointers,
 * low core counts, small memory or reduced-motion push the device to the "low"
 * tier, which trims particle counts and pixel ratio. Data-saver or very weak
 * devices disable 3D entirely (a static fallback is shown instead).
 */
export function useDevicePerformance(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>({
    tier: null,
    ...LOW,
    isMobile: false,
    isTouch: false,
  });

  useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean; effectiveType?: string };
    };

    const cores = nav.hardwareConcurrency ?? 4;
    const memory = nav.deviceMemory ?? 4;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = nav.connection?.saveData ?? false;
    const slowNet = nav.connection?.effectiveType
      ? ["slow-2g", "2g"].includes(nav.connection.effectiveType)
      : false;

    // Very constrained devices: keep it lightweight, no heavy 3D loop.
    const veryWeak = cores <= 2 || memory <= 2 || saveData || slowNet;

    const lowTier = isMobile || isTouch || cores <= 4 || memory <= 4 || reduceMotion;

    const base = lowTier ? LOW : HIGH;

    setProfile({
      tier: lowTier ? "low" : "high",
      enable3D: !veryWeak && !reduceMotion,
      particleCount: isMobile ? Math.round(base.particleCount * 0.45) : base.particleCount,
      dprCap: base.dprCap,
      isMobile,
      isTouch,
    });
  }, []);

  return profile;
}
