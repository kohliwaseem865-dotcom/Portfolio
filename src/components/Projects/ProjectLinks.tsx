"use client";

import { Github, ExternalLink, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectLinksProps {
  github: string | null;
  demo: string | null;
  className?: string;
  size?: "sm" | "md";
}

/**
 * Renders GitHub / Live Demo actions. When a URL is not provided (null), shows
 * a clearly-marked, disabled "Coming soon" state instead of inventing a link.
 */
export function ProjectLinks({ github, demo, className, size = "md" }: ProjectLinksProps) {
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  const base = cn(
    "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300",
    pad,
  );

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          className={cn(base, "glass text-ink hover:border-white/25 hover:bg-white/[0.07]")}
        >
          <Github size={size === "sm" ? 14 : 16} />
          Code
        </a>
      ) : (
        <span
          className={cn(base, "cursor-not-allowed border border-dashed border-white/10 text-ink-faint")}
          title="Repository link coming soon"
        >
          <Lock size={size === "sm" ? 14 : 16} />
          Repo soon
        </span>
      )}

      {demo ? (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
          className={cn(
            base,
            "bg-gradient-to-r from-accent to-cyan-glow text-base-950 hover:shadow-glow",
          )}
        >
          <ExternalLink size={size === "sm" ? 14 : 16} />
          Live Demo
        </a>
      ) : (
        <span
          className={cn(base, "cursor-not-allowed border border-dashed border-white/10 text-ink-faint")}
          title="Live demo coming soon"
        >
          <Lock size={size === "sm" ? 14 : 16} />
          Demo soon
        </span>
      )}
    </div>
  );
}
