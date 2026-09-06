import type { LucideIcon } from "lucide-react";
import {
  Smartphone,
  BrainCircuit,
  Globe,
  Database,
  Palette,
  Workflow,
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Short capability tags shown as chips. */
  tags: string[];
}

export const services: Service[] = [
  {
    id: "flutter",
    title: "Flutter App Development",
    description:
      "Cross-platform mobile apps for iOS & Android from a single, maintainable Flutter codebase — smooth, native-feeling and fast.",
    icon: Smartphone,
    tags: ["iOS & Android", "Dart", "Native feel"],
  },
  {
    id: "ai",
    title: "AI App Development",
    description:
      "Products with AI at their core — assistants, automation and AI-powered features wired to reliable, well-structured backends.",
    icon: BrainCircuit,
    tags: ["AI APIs", "Agents", "Automation"],
  },
  {
    id: "web",
    title: "Website Development",
    description:
      "Modern, responsive websites and web apps built with React & Next.js — accessible, performant and genuinely enjoyable to use.",
    icon: Globe,
    tags: ["React", "Next.js", "Responsive"],
  },
  {
    id: "firebase",
    title: "Firebase Integration",
    description:
      "Authentication, Firestore, storage and real-time data — a scalable backend for your app without the server maintenance.",
    icon: Database,
    tags: ["Auth", "Firestore", "Realtime"],
  },
  {
    id: "uiux",
    title: "UI/UX Implementation",
    description:
      "Turning designs into pixel-precise, motion-rich interfaces with attention to spacing, hierarchy and interaction detail.",
    icon: Palette,
    tags: ["Design-to-code", "Motion", "Detail"],
  },
  {
    id: "automation",
    title: "AI Automation",
    description:
      "Automating repetitive workflows with AI — connecting tools and APIs so tedious tasks run themselves.",
    icon: Workflow,
    tags: ["Workflows", "Integrations", "APIs"],
  },
];
