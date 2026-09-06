/**
 * Statistics shown in the About / Stats section.
 * Keep these factual. Edit the numbers here — nothing is hardcoded in the UI.
 */

export interface Stat {
  id: string;
  /** The number to count up to. */
  value: number;
  /** Optional suffix, e.g. "+". */
  suffix?: string;
  label: string;
}

export const stats: Stat[] = [
  { id: "projects", value: 4, suffix: "+", label: "Projects Built" },
  { id: "technologies", value: 15, suffix: "+", label: "Technologies Learned" },
  { id: "years", value: 2, label: "Years Learning" },
  { id: "commits", value: 500, suffix: "+", label: "Commits Pushed" },
];
