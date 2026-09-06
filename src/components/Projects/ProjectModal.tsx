"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Lightbulb, Wrench, CheckCircle2, TrendingUp, ListChecks } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { ProjectLinks } from "./ProjectLinks";
import { useScrollLock } from "@/hooks/useScrollLock";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Lightbulb;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-ink">
        <Icon size={16} className="text-accent-300" />
        {title}
      </h4>
      <div className="text-sm leading-relaxed text-ink-muted">{children}</div>
    </div>
  );
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    // Move focus into the dialog for accessibility.
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-base-950/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} details`}
        tabIndex={-1}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl glass-strong outline-none sm:rounded-3xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-base-950/60 text-ink backdrop-blur transition-colors hover:bg-base-800"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Hero visual */}
        <ProjectVisual project={project} large className="h-56 w-full sm:h-64" />

        <div className="flex flex-col gap-8 p-6 sm:p-8">
          {/* Header */}
          <div>
            <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 text-base text-ink-muted">{project.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {project.description}
            </p>
          </div>

          <ProjectLinks github={project.github} demo={project.demo} />

          {/* Problem / Solution */}
          {(project.problem || project.solution) && (
            <div className="grid gap-6 sm:grid-cols-2">
              {project.problem ? (
                <Block icon={Lightbulb} title="The Problem">
                  {project.problem}
                </Block>
              ) : null}
              {project.solution ? (
                <Block icon={Wrench} title="The Solution">
                  {project.solution}
                </Block>
              ) : null}
            </div>
          )}

          {/* Features */}
          <Block icon={CheckCircle2} title="Key Features">
            <ul className="mt-1 grid gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-accent to-cyan-glow" />
                  {f}
                </li>
              ))}
            </ul>
          </Block>

          {/* Process */}
          {project.process && project.process.length > 0 ? (
            <Block icon={ListChecks} title="Development Process">
              <ol className="mt-1 flex flex-col gap-2">
                {project.process.map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] font-mono text-[10px] text-ink">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Block>
          ) : null}

          {/* Results — only when real data is provided */}
          {project.results && project.results.length > 0 ? (
            <Block icon={TrendingUp} title="Results">
              <ul className="mt-1 flex flex-col gap-2">
                {project.results.map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <TrendingUp size={14} className="mt-1 flex-shrink-0 text-emerald-400" />
                    {r}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}

          {/* Tech stack */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-white/[0.05] px-3 py-1.5 font-mono text-xs text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
