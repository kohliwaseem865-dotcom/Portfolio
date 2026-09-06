export interface NavItem {
  label: string;
  /** Matches the `id` on the corresponding <section>. */
  id: string;
}

export const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "journey" },
  { label: "Services", id: "services" },
  { label: "Contact", id: "contact" },
];
