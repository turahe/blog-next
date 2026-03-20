import type { IconType } from "react-icons";
import {
  SiDocker,
  SiGit,
  SiGo,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

export type TechStackItem = {
  name: string;
  Icon: IconType;
  /** Short tooltip — surfaces on hover */
  blurb: string;
};

export const techStack: TechStackItem[] = [
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    blurb: "App Router, RSC, and polished UX defaults for production sites.",
  },
  {
    name: "React",
    Icon: SiReact,
    blurb: "Component models, hooks, and accessible UI patterns.",
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    blurb: "Typed APIs and safer refactors across the stack.",
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    blurb: "Design systems with utility-first consistency.",
  },
  {
    name: "Node.js",
    Icon: SiNodedotjs,
    blurb: "Services, tooling, and pragmatic backend APIs.",
  },
  {
    name: "Go",
    Icon: SiGo,
    blurb: "Fast binaries and simple concurrency for core services.",
  },
  {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    blurb: "Relational data, migrations, and careful indexing.",
  },
  {
    name: "Docker",
    Icon: SiDocker,
    blurb: "Reproducible environments from dev to deploy.",
  },
  {
    name: "Git",
    Icon: SiGit,
    blurb: "Branching, review, and history that stays readable.",
  },
];
