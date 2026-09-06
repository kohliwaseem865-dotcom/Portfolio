"use client";

/**
 * Fixed ambient backdrop for the whole page: a faint dot-grid, two slow aurora
 * blobs and a film-grain overlay. Purely decorative and pointer-transparent.
 * CSS-only animation, so it costs almost nothing and auto-stills under
 * reduced-motion (handled globally in globals.css).
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash */}
      <div className="absolute inset-0 bg-base-950" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.28] mask-fade-b"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Aurora blobs */}
      <div className="absolute -left-40 -top-40 h-[42rem] w-[42rem] animate-drift rounded-full bg-accent/20 blur-[120px]" />
      <div
        className="absolute -right-40 top-1/3 h-[38rem] w-[38rem] animate-drift rounded-full bg-cyan-glow/10 blur-[130px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[30rem] w-[30rem] animate-drift rounded-full bg-accent-600/15 blur-[120px]"
        style={{ animationDelay: "-14s" }}
      />

      {/* Grain */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-soft-light" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_40%,rgba(0,0,0,0.55))]" />
    </div>
  );
}
