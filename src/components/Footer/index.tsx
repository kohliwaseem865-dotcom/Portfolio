"use client";

import { ArrowUp } from "lucide-react";
import { navItems } from "@/data/navigation";
import { site } from "@/data/site";
import { SocialRow } from "@/components/ui/SocialRow";

export function Footer() {
  const year = new Date().getFullYear();

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="relative border-t border-white/[0.06] py-14">
      <div className="container-px">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <button onClick={() => go("home")} className="flex items-center gap-2.5">
              <span className="gradient-ring flex h-9 w-9 items-center justify-center rounded-xl bg-base-900">
                <span className="font-display text-lg font-bold text-gradient-accent">W</span>
              </span>
              <span className="font-display text-base font-medium text-ink">{site.name}</span>
            </button>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{site.shortTagline}</p>
            <div className="mt-5">
              <SocialRow variant="icon" />
            </div>
          </div>

          {/* Nav */}
          <nav className="grid grid-cols-2 gap-x-12 gap-y-2 sm:grid-cols-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="text-left text-sm text-ink-muted transition-colors hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-ink-faint">
            © {year} {site.name}. Designed & built with Next.js, Three.js & care.
          </p>
          <button
            onClick={() => go("home")}
            className="group inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-ink-muted transition-colors hover:text-ink"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
