"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { stats, type Stat } from "@/data/stats";
import { useCountUp } from "@/hooks/useCountUp";

function StatItem({ stat, active, index }: { stat: Stat; active: boolean; index: number }) {
  const value = useCountUp(stat.value, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative flex flex-col gap-1 px-2 py-4 text-center sm:text-left"
    >
      <span className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        {value}
        {stat.suffix ? <span className="text-gradient-accent">{stat.suffix}</span> : null}
      </span>
      <span className="text-sm text-ink-muted">{stat.label}</span>
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl glass lg:grid-cols-4"
    >
      {stats.map((stat, i) => (
        <div key={stat.id} className="bg-white/[0.01]">
          <StatItem stat={stat} active={inView} index={i} />
        </div>
      ))}
    </div>
  );
}
