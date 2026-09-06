"use client";

import dynamic from "next/dynamic";
import { useDevicePerformance } from "@/hooks/useDevicePerformance";

/** Lightweight CSS-only stand-in shown on low-power devices or while loading. */
function HeroFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative h-[22rem] w-[22rem]">
        <div className="absolute inset-0 animate-spin-slow rounded-full bg-aurora opacity-30 blur-2xl" />
        <div className="absolute inset-8 rounded-full border border-white/10" />
        <div className="absolute inset-16 rounded-full border border-white/10" />
        <div className="absolute inset-24 rounded-full bg-gradient-to-br from-accent/40 to-cyan-glow/30 blur-md" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow shadow-glow-cyan" />
      </div>
    </div>
  );
}

// The heavy Three.js scene only loads on the client, and only when we decide
// the device can handle it — keeping it out of the initial bundle.
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export function HeroCanvas() {
  const { tier, enable3D, particleCount, dprCap } = useDevicePerformance();

  // Still resolving the device profile, or 3D is disabled → show the fallback.
  if (tier === null || !enable3D) return <HeroFallback />;

  return (
    <HeroScene
      particleCount={particleCount}
      dprCap={dprCap}
      lowTier={tier === "low"}
    />
  );
}
