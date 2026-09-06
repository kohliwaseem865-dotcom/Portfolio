"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import type { Project } from "@/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProjectVisual } from "./ProjectVisual";
import { ProjectLinks } from "./ProjectLinks";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: (project: Project) => void;
}

export function ProjectCard({ project, index, onOpen }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard onClick={() => onOpen(project)} className="group h-full">
        <div
          data-cursor="hover"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onOpen(project);
            }
          }}
          className="flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl glass transition-colors duration-300 hover:border-white/20"
        >
          {/* Visual */}
          <div className="relative">
            <ProjectVisual
              project={project}
              className="h-52 w-full transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {project.featured ? (
              <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-base-950/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-cyan-glow backdrop-blur">
                <Star size={11} className="fill-cyan-glow" />
                Featured
              </span>
            ) : null}
            <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-base-950/70 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={16} />
            </span>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col gap-4 p-6">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">{project.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">{project.tagline}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/[0.05] px-2 py-1 font-mono text-[11px] text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-2">
              <span className="text-xs text-ink-faint">
                {project.features.length} key features
              </span>
              <ProjectLinks github={project.github} demo={project.demo} size="sm" />
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
