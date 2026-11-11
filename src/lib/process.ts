/**
 * process.ts  -  "The Crown Method": our five-step way of working.
 * Each step is a rank on the stairway to the crown. Used on Home + Process pages.
 */
import { Compass, Crown, Hammer, Landmark, Rocket, type LucideIcon } from "lucide-react";

export type ProcessStep = {
  name: string;
  meaning: string;
  icon: LucideIcon;
  summary: string;
  details: string;
  deliverables: string[];
};

export const processSteps: ProcessStep[] = [
  {
    name: "Scout",
    meaning: "Discovery",
    icon: Compass,
    summary: "We listen first and learn your business, your customers and your goals.",
    details:
      "Before a single line of code, we study the problem. We interview your team, look at your competitors and agree on what success looks like in numbers.",
    deliverables: ["Requirement document", "Scope and priorities", "Fixed timeline and estimate"],
  },
  {
    name: "Council",
    meaning: "Strategy and design",
    icon: Landmark,
    summary: "We plan the architecture and design the experience with you in the room.",
    details:
      "Our designers and engineers sit together. You see clickable designs and a technical plan before we build, so there are no surprises later.",
    deliverables: ["User journeys and wireframes", "Visual design system", "Technical architecture"],
  },
  {
    name: "Forge",
    meaning: "Build",
    icon: Hammer,
    summary: "We build in short cycles and show you working software every week.",
    details:
      "Clean, tested, documented code. You get a live preview link, so you can follow progress and steer early instead of waiting for a big reveal.",
    deliverables: ["Weekly demo builds", "Automated testing", "Security checks at every stage"],
  },
  {
    name: "Coronation",
    meaning: "Launch",
    icon: Rocket,
    summary: "We take your product live carefully, with nothing left to chance.",
    details:
      "Performance tuning, final security review, backups and a rehearsed go-live plan. Your team is trained, and the source code is handed over to you.",
    deliverables: ["Production deployment", "Team training", "Full source code handover"],
  },
  {
    name: "Reign",
    meaning: "Support and growth",
    icon: Crown,
    summary: "We stay beside you as the product grows and your needs change.",
    details:
      "Monitoring, updates and improvements on a clear support plan. As your business grows, we add features and scale the platform.",
    deliverables: ["Monitoring and backups", "Priority support", "Quarterly improvement roadmap"],
  },
];
