export interface Project {
  id: string;
  title: string;
  /** One-line summary shown on the card. */
  tagline: string;
  /** Longer paragraph shown in the detail modal. */
  description: string;
  tech: string[];
  features: string[];
  /** Optional structured case-study fields — shown in the modal when present. */
  problem?: string;
  solution?: string;
  process?: string[];
  /** Only fill this in with REAL, measurable results. Leave empty otherwise. */
  results?: string[];
  /** Use null when there is no real URL yet — the UI shows a clear placeholder. */
  github: string | null;
  demo: string | null;
  /** Two hex colors used to render the generated 3D/gradient visual. */
  accent: [string, string];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "aether-ai",
    title: "Aether AI",
    tagline: "AI-powered productivity & research platform.",
    description:
      "Aether AI is a productivity and research companion that brings AI into everyday knowledge work — summarizing sources, drafting content and keeping research organized in one focused workspace.",
    tech: ["Flutter", "Firebase", "AI APIs"],
    features: [
      "AI-assisted research summaries",
      "Organized workspaces & notes",
      "Cloud sync across devices",
      "Fast, distraction-free UI",
    ],
    problem:
      "Research and productivity tools are scattered — notes live in one app, AI in another, and context is constantly lost between them.",
    solution:
      "A single workspace where AI is a first-class citizen: capture, summarize and organize research without leaving the flow.",
    process: [
      "Mapped the core research-to-output workflow",
      "Prototyped the AI summary + workspace model in Flutter",
      "Wired Firebase for auth and real-time sync",
      "Refined motion and micro-interactions",
    ],
    github: null,
    demo: null,
    accent: ["#7c5cff", "#38e6ff"],
    featured: true,
  },
  {
    id: "edunest",
    title: "EduNest",
    tagline: "Modern school management & learning platform.",
    description:
      "EduNest is a school management and learning platform that connects students, teachers and administrators — attendance, classes, resources and communication in one modern, mobile-first experience.",
    tech: ["Flutter", "Firebase", "Firestore"],
    features: [
      "Role-based dashboards",
      "Class & attendance management",
      "Learning resources & materials",
      "Real-time updates with Firestore",
    ],
    problem:
      "Schools juggle multiple disconnected tools for attendance, communication and learning materials.",
    solution:
      "One mobile-first platform with role-based views so every user only sees what matters to them.",
    process: [
      "Designed role-based information architecture",
      "Modeled data in Firestore for real-time sync",
      "Built responsive Flutter UI for phones & tablets",
    ],
    github: null,
    demo: null,
    accent: ["#38e6ff", "#5cff9d"],
    featured: true,
  },
  {
    id: "snapstudy-ai",
    title: "SnapStudy AI",
    tagline: "AI-powered study & learning assistant.",
    description:
      "SnapStudy AI turns study material into interactive learning — generating summaries, questions and explanations so students can learn faster and revise smarter.",
    tech: ["Flutter", "AI", "Firebase"],
    features: [
      "AI-generated summaries & quizzes",
      "Snap-to-study from notes",
      "Progress tracking",
      "Clean, focused study mode",
    ],
    problem:
      "Turning raw notes into effective revision material is slow and tedious for students.",
    solution:
      "Snap or paste study material and let AI generate summaries and practice questions instantly.",
    process: [
      "Explored AI prompt flows for study generation",
      "Built the capture-to-quiz pipeline in Flutter",
      "Added progress tracking on Firebase",
    ],
    github: null,
    demo: null,
    accent: ["#ff7c5c", "#7c5cff"],
    featured: true,
  },
  {
    id: "web-experiments",
    title: "AI Portfolio & Web Projects",
    tagline: "Interactive websites & AI-powered experiments.",
    description:
      "A collection of interactive websites and AI-powered experiments — exploring 3D on the web, generative interfaces and creative uses of AI APIs.",
    tech: ["React", "Next.js", "Three.js", "AI APIs"],
    features: [
      "Interactive 3D web scenes",
      "Generative & AI-driven UIs",
      "Performance-minded animation",
      "Reusable component patterns",
    ],
    problem:
      "The web is capable of far richer experiences than most sites use.",
    solution:
      "A playground of experiments pushing interactivity, 3D and AI on the web.",
    process: [
      "Prototyped ideas quickly with React & Three.js",
      "Measured performance across devices",
      "Distilled learnings into reusable patterns",
    ],
    github: "https://github.com/kohliwaseem865-dotcom",
    demo: null,
    accent: ["#5cff9d", "#38e6ff"],
    featured: false,
  },
];
