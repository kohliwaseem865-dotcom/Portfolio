"use client";

import { socialLinks, isPlaceholderLink } from "@/data/socialLinks";
import { cn } from "@/lib/utils";

interface SocialRowProps {
  variant?: "icon" | "detailed";
  className?: string;
}

/**
 * Renders the social links. Any link still set to "#" is shown as a clearly
 * disabled placeholder (never a fake destination) — replace the URLs in
 * `data/socialLinks.ts` to activate them.
 */
export function SocialRow({ variant = "icon", className }: SocialRowProps) {
  if (variant === "detailed") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {socialLinks.map((link) => {
          const Icon = link.icon;
          const placeholder = isPlaceholderLink(link.href);
          const content = (
            <>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-ink-muted transition-colors group-hover:text-cyan-glow">
                <Icon size={18} />
              </span>
              <span className="flex flex-col">
                <span className="text-sm text-ink">{link.label}</span>
                <span className="text-xs text-ink-faint">
                  {placeholder ? "Link coming soon" : link.handle}
                </span>
              </span>
            </>
          );
          return placeholder ? (
            <span
              key={link.id}
              title="Link coming soon — add it in data/socialLinks.ts"
              className="group flex cursor-not-allowed items-center gap-3 rounded-2xl border border-dashed border-white/10 p-2.5 opacity-70"
            >
              {content}
            </span>
          ) : (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl glass p-2.5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
            >
              {content}
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((link) => {
        const Icon = link.icon;
        const placeholder = isPlaceholderLink(link.href);
        return placeholder ? (
          <span
            key={link.id}
            title="Link coming soon — add it in data/socialLinks.ts"
            className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-white/10 text-ink-faint opacity-70"
            aria-label={`${link.label} (coming soon)`}
          >
            <Icon size={18} />
          </span>
        ) : (
          <a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex h-11 w-11 items-center justify-center rounded-full glass text-ink-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-cyan-glow"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
