"use client";

import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectVisualProps {
  project: Project;
  className?: string;
  /** Larger treatment for the modal. */
  large?: boolean;
}

/**
 * A generated, lightweight visual for each project — a mesh-gradient tile built
 * from the project's two accent colors, with an abstract mark. No images to
 * ship or optimize; swap for a real screenshot later by replacing this render.
 */
export function ProjectVisual({ project, className, large }: ProjectVisualProps) {
  const [a, b] = project.accent;
  const initials = project.title
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden bg-base-900",
        className,
      )}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 15% 10%, ${a}55, transparent 50%), radial-gradient(120% 120% at 90% 80%, ${b}55, transparent 45%)`,
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at 50% 50%, #000, transparent 78%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, #000, transparent 78%)",
        }}
      />

      {/* Floating orbs */}
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl"
        style={{ background: b, opacity: 0.5 }}
      />
      <div
        className="absolute -bottom-8 -left-4 h-28 w-28 rounded-full blur-2xl"
        style={{ background: a, opacity: 0.4 }}
      />

      {/* Mark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "font-display font-bold tracking-tight text-white/90 mix-blend-overlay",
            large ? "text-[7rem]" : "text-6xl",
          )}
        >
          {initials}
        </span>
      </div>

      {/* Sheen */}
      <div className="absolute inset-0 bg-gradient-to-t from-base-950/70 via-transparent to-white/[0.06]" />
    </div>
  );
}
