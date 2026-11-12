import { services } from "./services";
import { processSteps } from "./process";

/**
 * site.ts  -  ONE PLACE FOR ALL COMPANY DETAILS
 *
 * Change your email, phone, address etc. here and every page (header,
 * footer, contact page, privacy policy) updates automatically.
 *
 * >>> Everything marked "CHANGE ME" must be replaced with real details
 *     before the website goes live. <<<
 */
export const siteConfig = {
  name: "Ruling Mind Tech",
  tagline: "Your Partner in Digital Innovation",
  description:
    "Ruling Mind Tech builds custom software, websites, e-commerce platforms and AI solutions that give growing businesses a commanding edge.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  foundedYear: 2026,

  // ---- CHANGE ME: real contact details ----
  email: "hello@rulingmindtech.com",
  phone: "+91 00000 00000",
  address: "Your office address, City, State, PIN, India",
  hours: "Monday to Saturday, 10:00 AM to 7:00 PM IST",

  // ---- CHANGE ME: DPDP Act requires a contact for privacy complaints ----
  privacyEmail: "privacy@rulingmindtech.com",
  grievanceOfficer: {
    name: "Name of Grievance Officer",
    email: "grievance@rulingmindtech.com",
  },

  // ---- CHANGE ME: the exact address Google Maps should show on the Contact page ----
  // Tip: open Google Maps, find your office, and copy the address (or "Company name, City").
  mapQuery: "Hyderabad, Telangana, India",

  // ---- OPTIONAL: photo credit shown in the footer (needed by some free-photo licences) ----
  // Example: "Photo by Author Name on Magnific"  (leave "" if no credit is required)
  heroPhotoCredit: "" as string,

  // ---- CHANGE ME: your real social profile links ----
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "GitHub", href: "https://github.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
} as const;

/** One link inside a dropdown. */
export type NavChild = { label: string; href: string };
/** One header item. "children" are the buttons shown when the visitor hovers over it. */
export type NavItem = { label: string; href: string; children: NavChild[] };

/**
 * Links shown in the header (text buttons) and their hover dropdowns.
 * The part after # must match an id="..." on that page (for example id="crown-method").
 */
export const navLinks: NavItem[] = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Welcome", href: "/#top" },
      { label: "What we build", href: "/#what-we-build" },
      { label: "The Crown Method", href: "/#crown-method" },
      { label: "The Royal Standard", href: "/#royal-standard" },
      { label: "Technology we use", href: "/#technology" },
      { label: "Start a project", href: "/#get-started" },
    ],
  },
  {
    label: "Our Services",
    href: "/services",
    children: services.map((service) => ({ label: service.title, href: `/services#${service.slug}` })),
  },
  {
    label: "Our Process",
    href: "/process",
    children: processSteps.map((step) => ({ label: `${step.name}: ${step.meaning}`, href: `/process#${step.name.toLowerCase()}` })),
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "Our story", href: "/about#story" },
      { label: "Mission and vision", href: "/about#mission" },
      { label: "What we stand for", href: "/about#values" },
      { label: "Start a project", href: "/about#get-started" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    children: [
      { label: "Why join us", href: "/careers#why-join" },
      { label: "How we hire", href: "/careers#hiring-process" },
      { label: "Open positions", href: "/careers#open-roles" },
      { label: "Apply now", href: "/careers#apply" },
    ],
  },
];
