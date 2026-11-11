/**
 * services.ts  -  The list of services Ruling Mind Tech offers.
 * Used by the home page and the Services page. Edit the text here.
 */
import { Brain, Briefcase, Cloud, Code, Globe, ShoppingCart, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "custom-software",
    title: "Custom Software Development",
    summary: "Web applications, internal tools and SaaS products built around the way your business really works.",
    icon: Code,
    points: [
      "Web and cloud applications",
      "SaaS product engineering",
      "API design and third-party integrations",
      "Legacy system modernisation",
    ],
  },
  {
    slug: "website-development",
    title: "Website Development",
    summary: "Fast, secure and beautiful websites that earn trust in the first five seconds.",
    icon: Globe,
    points: [
      "Corporate and portfolio websites",
      "Landing pages that convert",
      "Search-engine friendly structure",
      "Content management you can run yourself",
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce Solutions",
    summary: "Online stores that sell smoothly, from the first product page to the final delivery update.",
    icon: ShoppingCart,
    points: [
      "Custom stores and marketplaces",
      "UPI, card and wallet payments",
      "Inventory and order management",
      "Shipping and invoice automation",
    ],
  },
  {
    slug: "ai-solutions",
    title: "AI and Machine Learning Projects",
    summary: "Practical artificial intelligence that saves hours of work and unlocks new ways to serve customers.",
    icon: Brain,
    points: [
      "Chatbots and AI assistants",
      "Document and data processing",
      "Prediction and recommendation engines",
      "AI features added to existing products",
    ],
  },
  {
    slug: "business-solutions",
    title: "Business Solutions and Automation",
    summary: "Software for the daily work of running a company: sales, billing, people and reporting.",
    icon: Briefcase,
    points: [
      "CRM and ERP style systems",
      "Workflow and approval automation",
      "Live dashboards and reports",
      "Digital transformation consulting",
    ],
  },
  {
    slug: "cloud-support",
    title: "Cloud, Security and Support",
    summary: "We keep what we build online, protected and improving long after launch day.",
    icon: Cloud,
    points: [
      "Cloud hosting and deployment",
      "Security reviews and hardening",
      "Monitoring, backups and updates",
      "Maintenance plans with clear response times",
    ],
  },
];
