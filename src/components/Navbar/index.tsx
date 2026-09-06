"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import { site } from "@/data/site";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sectionIds = useMemo(() => navItems.map((n) => n.id), []);
  const active = useScrollSpy(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = useCallback((id: string) => {
    setOpen(false);
    // Release the mobile-menu scroll lock immediately — otherwise scrollIntoView
    // is a no-op while `body { overflow: hidden }` is still applied. Then defer
    // the scroll a frame so the layout has settled.
    document.body.style.overflow = "";
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="container-px">
          <nav
            className={cn(
              "mt-4 flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500",
              scrolled ? "glass-strong shadow-inner-line" : "border border-transparent",
            )}
          >
            {/* Logo */}
            <button
              onClick={() => go("home")}
              className="group flex items-center gap-2.5 pl-1"
              aria-label="Back to top"
            >
              <span className="gradient-ring flex h-9 w-9 items-center justify-center rounded-xl bg-base-900">
                <span className="font-display text-lg font-bold text-gradient-accent">
                  W
                </span>
              </span>
              <span className="hidden font-display text-sm font-medium tracking-tight text-ink sm:block">
                {site.name}
              </span>
            </button>

            {/* Desktop nav */}
            <ul className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => go(item.id)}
                      className={cn(
                        "relative rounded-full px-4 py-2 text-sm transition-colors duration-300",
                        isActive ? "text-ink" : "text-ink-muted hover:text-ink",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-white/[0.07]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <button
              onClick={() => go("contact")}
              className="hidden rounded-full bg-gradient-to-r from-accent to-cyan-glow px-5 py-2 text-sm font-medium text-base-950 transition-shadow duration-300 hover:shadow-glow md:inline-flex"
            >
              Let&apos;s Connect
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full glass text-ink md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-base-950/80 backdrop-blur-xl"
              onClick={() => setOpen(false)}
            />
            <motion.ul
              className="absolute inset-x-4 top-24 flex flex-col gap-1 rounded-3xl glass-strong p-4"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
              }}
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left font-display text-lg transition-colors",
                      active === item.id
                        ? "bg-white/[0.06] text-ink"
                        : "text-ink-muted hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-ink-faint">
                      {String(navItems.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
