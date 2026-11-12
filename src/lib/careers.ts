/**
 * careers.ts  -  The job openings shown on the Careers page.
 *
 * HOW TO EDIT: add, remove or change a role below. Nothing else needs to change;
 * the page, the "Apply" buttons and the form's role list all update automatically.
 * >>> These are SAMPLE openings. Ask your manager to confirm the real ones. <<<
 */
export type Role = {
  slug: string;
  title: string;
  type: "Full-time" | "Internship" | "Part-time" | "Contract";
  experience: string;
  location: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
};

export const roles: Role[] = [
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    type: "Full-time",
    experience: "0 to 3 years (strong fresher projects welcome)",
    location: "Hybrid",
    summary: "Build websites, web apps and e-commerce platforms for our clients, from the screen the customer sees to the database behind it.",
    responsibilities: [
      "Develop responsive interfaces with React and Next.js",
      "Build secure APIs and database layers with Node.js",
      "Write clean, tested and documented code",
    ],
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL or MongoDB"],
  },
  {
    slug: "python-ai-engineer",
    title: "Python and AI Engineer",
    type: "Full-time",
    experience: "0 to 3 years",
    location: "Hybrid",
    summary: "Turn ideas into working AI features: chatbots, document processing, predictions and smart automation for real businesses.",
    responsibilities: [
      "Build backend services with Python and FastAPI",
      "Integrate language models and machine-learning pipelines",
      "Test and monitor AI features for accuracy and safety",
    ],
    skills: ["Python", "FastAPI", "LLM APIs", "Machine learning basics", "SQL"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    type: "Full-time",
    experience: "0 to 3 years (portfolio required)",
    location: "Hybrid",
    summary: "Design clear, beautiful experiences for websites and products, and turn client ideas into screens people enjoy using.",
    responsibilities: [
      "Create wireframes, prototypes and design systems",
      "Work with developers so designs are built faithfully",
      "Run simple user tests and improve based on feedback",
    ],
    skills: ["Figma", "Design systems", "Typography and colour", "Prototyping"],
  },
  {
    slug: "ecommerce-specialist",
    title: "E-commerce Specialist",
    type: "Full-time",
    experience: "1 to 3 years",
    location: "Hybrid",
    summary: "Set up and improve online stores, payments and order flows so our clients' shops sell smoothly.",
    responsibilities: [
      "Configure and customise Shopify, WooCommerce or custom stores",
      "Integrate payment gateways, shipping and inventory",
      "Improve store speed, search visibility and conversion",
    ],
    skills: ["Shopify or WooCommerce", "Payment gateways", "SEO basics", "JavaScript"],
  },
  {
    slug: "business-development-executive",
    title: "Business Development Executive",
    type: "Full-time",
    experience: "0 to 3 years",
    location: "Hybrid",
    summary: "Help businesses discover what Ruling Mind Tech can build for them, and be the friendly first face of our company.",
    responsibilities: [
      "Find and speak with potential clients",
      "Understand their needs and prepare proposals with our team",
      "Build long-term client relationships",
    ],
    skills: ["Communication", "Negotiation", "Basic understanding of IT services", "CRM tools"],
  },
  {
    slug: "software-engineering-intern",
    title: "Software Engineering Intern",
    type: "Internship",
    experience: "Freshers and final-year students",
    location: "Hybrid",
    summary: "Learn on real projects beside our engineers. A great start for students and fresh graduates who want to grow with a new company.",
    responsibilities: [
      "Build features under the guidance of a senior developer",
      "Fix bugs and write tests",
      "Present your work to the team every month",
    ],
    skills: ["Any programming language", "Web basics (HTML, CSS, JavaScript)", "Eagerness to learn"],
  },
];

/** Options in the application form's "Role" drop-down. */
export const GENERAL_APPLICATION = "General application (no specific role)";
export const roleOptions: string[] = [...roles.map((role) => role.title), GENERAL_APPLICATION];
