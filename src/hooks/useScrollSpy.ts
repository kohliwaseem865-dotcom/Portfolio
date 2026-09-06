"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently considered "active" based on
 * scroll position. Uses IntersectionObserver for efficiency.
 */
export function useScrollSpy(
  sectionIds: string[],
  options?: { rootMargin?: string }
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const rootMargin = options?.rootMargin ?? "-45% 0px -50% 0px";
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Pick the most-visible section that's in the active band.
        let best: string | null = null;
        let bestRatio = -1;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        if (best) setActiveId(best);
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join(","), options?.rootMargin]);

  return activeId;
}
