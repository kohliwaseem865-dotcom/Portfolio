/**
 * "My Journey" timeline. Edit freely — add, remove or reorder entries.
 * Keep these honest: this is a learning-and-building journey, not employment.
 */

export interface JourneyItem {
  /** Year or short period label. */
  year: string;
  title: string;
  description: string;
  /** Optional short tags shown as chips. */
  tags?: string[];
}

export const journey: JourneyItem[] = [
  {
    year: "2026",
    title: "Building AI & Flutter products",
    description:
      "Designing and shipping AI-powered apps and tools — combining Flutter, Firebase and AI APIs into polished, real products.",
    tags: ["Flutter", "AI APIs", "Firebase"],
  },
  {
    year: "2026",
    title: "Advanced app development",
    description:
      "Going deeper into architecture, state management and performance — writing cleaner, more maintainable code and richer interfaces.",
    tags: ["Architecture", "State", "Performance"],
  },
  {
    year: "2025",
    title: "Started my programming journey",
    description:
      "Fell for building things with code. Started with the fundamentals, then Dart & Flutter, and never looked back.",
    tags: ["Dart", "Fundamentals", "Curiosity"],
  },
];
