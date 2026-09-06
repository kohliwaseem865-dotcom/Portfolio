import type { LucideIcon } from "lucide-react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

export interface SocialLink {
  id: string;
  label: string;
  /**
   * Replace "#" with your real profile URL.
   * The UI marks any link still set to "#" as a placeholder so nothing
   * ever points somewhere fake.
   */
  href: string;
  icon: LucideIcon;
  handle: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/kohliwaseem865-dotcom",
    icon: Github,
    handle: "@kohliwaseem865-dotcom",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/wai_coders",
    icon: Instagram,
    handle: "@wai_coders",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/waseem-kohli-6b115a406/",
    icon: Linkedin,
    handle: "in/waseem-kohli",
  },
];

/** Convenience helper — the email "social" link, built from site config. */
export function mailLink(email: string): SocialLink {
  return {
    id: "email",
    label: "Email",
    href: `mailto:${email}`,
    icon: Mail,
    handle: email,
  };
}

/** True when a link is still a placeholder (`#`). */
export const isPlaceholderLink = (href: string) => href === "#" || href.trim() === "";
