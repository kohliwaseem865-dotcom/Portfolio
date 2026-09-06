"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Server, BrainCircuit, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories, type SkillCategory } from "@/data/skills";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, LucideIcon> = {
  development: Code2,
  backend: Server,
  ai: BrainCircuit,
  tools: Wrench,
};

function SkillRow({ name, level, index }: { name: string; level: number; index: number }) {
  const reduced = usePrefersReducedMotion();
  const [hover, setHover] = useState(false);

  return (
    <div
      className="group/skill py-2"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-sm text-ink transition-colors">{name}</span>
        <span
          className={cn(
            "font-mono text-xs tabular-nums transition-colors",
            hover ? "text-cyan-glow" : "text-ink-faint",
          )}
        >
          {level}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent to-cyan-glow"
          initial={reduced ? { width: `${level}%` } : { width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: reduced ? 0 : 1, delay: 0.15 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const Icon = categoryIcons[category.id] ?? Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="gradient-ring group relative flex flex-col gap-5 rounded-3xl glass p-6 transition-colors duration-300 hover:bg-white/[0.05]"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] text-accent-300 transition-colors duration-300 group-hover:bg-accent/15 group-hover:text-cyan-glow">
          <Icon size={20} />
        </span>
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">{category.title}</h3>
          <p className="text-xs text-ink-faint">{category.caption}</p>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-white/[0.04]">
        {category.skills.map((skill, i) => (
          <SkillRow key={skill.name} name={skill.name} level={skill.level} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <SectionHeading
          eyebrow="02 — Skills"
          title="Tools I build with"
          description="A snapshot of the technologies I use day to day. The meters are a self-assessed sense of comfort — a map of where I am and where I'm growing."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <CategoryCard key={category.id} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
