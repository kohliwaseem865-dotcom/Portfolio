export interface Skill {
  name: string;
  /** 0–100 self-assessed comfort level, used purely for the visual meter. */
  level: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  /** Short supporting line shown under the category title. */
  caption: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "development",
    title: "Development",
    caption: "Building interfaces and apps end to end.",
    skills: [
      { name: "Flutter", level: 88 },
      { name: "Dart", level: 86 },
      { name: "JavaScript", level: 82 },
      { name: "TypeScript", level: 78 },
      { name: "React", level: 80 },
      { name: "Next.js", level: 74 },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    caption: "Data, auth and APIs that power the app.",
    skills: [
      { name: "Firebase", level: 84 },
      { name: "Firestore", level: 82 },
      { name: "REST APIs", level: 80 },
      { name: "Authentication", level: 78 },
    ],
  },
  {
    id: "ai",
    title: "AI",
    caption: "Bringing intelligence into products.",
    skills: [
      { name: "AI APIs", level: 82 },
      { name: "AI Agents", level: 76 },
      { name: "Automation", level: 78 },
      { name: "AI-powered Apps", level: 80 },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    caption: "The workflow that keeps things shipping.",
    skills: [
      { name: "Git", level: 84 },
      { name: "GitHub", level: 84 },
      { name: "VS Code", level: 90 },
      { name: "Android Studio", level: 82 },
      { name: "Claude Code", level: 86 },
    ],
  },
];
