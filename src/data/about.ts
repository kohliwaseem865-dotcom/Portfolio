export interface AboutHighlight {
  label: string;
  description: string;
}

export const about = {
  heading: "About Me",
  lead: "Developer, AI builder and creative technologist — learning fast, building constantly.",
  paragraphs: [
    "I'm Waseem — I build mobile apps with Flutter & Dart, bring AI into real products, and craft interactive experiences on the web. My focus is on making things that feel effortless to use and are engineered to last.",
    "I work across the stack: Flutter for beautiful cross-platform apps, Firebase for auth and real-time data, and AI APIs to add genuine intelligence. On the web I reach for React, Next.js and a healthy obsession with motion and detail.",
    "I'm early in my journey and moving quickly — every project is a chance to learn something new and raise the bar on the last one.",
  ],
  // Shown as an interactive orbit / chip cluster.
  focus: [
    { label: "Flutter", description: "Cross-platform mobile apps" },
    { label: "Dart", description: "Clean, typed app logic" },
    { label: "AI", description: "Intelligent, useful features" },
    { label: "Firebase", description: "Auth, Firestore & realtime" },
    { label: "Web Dev", description: "React & Next.js interfaces" },
    { label: "Automation", description: "Workflows that run themselves" },
    { label: "UI/UX", description: "Motion & interaction detail" },
  ] as AboutHighlight[],
} as const;
