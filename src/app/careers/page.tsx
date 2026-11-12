/** app/careers/page.tsx  -  "Careers" page (address: "/careers"). */
import type { Metadata } from "next";
import { GraduationCap, Rocket, TrendingUp, Users } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import CareersApply from "@/components/careers/CareersApply";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Ruling Mind Tech. Open roles in software development, AI, design, e-commerce and business development, including internships for freshers.",
};

const reasons = [
  { icon: Rocket, title: "Real responsibility early", text: "We are a new company. You will work on real client projects and own meaningful pieces of them from your first weeks." },
  { icon: GraduationCap, title: "Learn across the whole stack", text: "Websites, e-commerce, cloud and AI all live under one roof, so you can grow far beyond a single narrow skill." },
  { icon: Users, title: "Honest, respectful team", text: "Clear feedback, shared credit and the freedom to ask questions. We build the culture together." },
  { icon: TrendingUp, title: "Grow as we grow", text: "People who join at the start shape the company, and their roles grow as Ruling Mind Tech does." },
];

const hiringSteps = [
  { name: "Apply", text: "Send your details and a link to your resume or portfolio using the form below." },
  { name: "Introduction", text: "A relaxed conversation to get to know you and tell you more about the work." },
  { name: "Skills round", text: "A practical task or discussion about real work. No trick questions." },
  { name: "Offer", text: "A clear, honest offer, explained in full, and a warm welcome to the team." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Build your career at the crown of technology"
        description="We are a new company with big ambitions, and we are looking for curious, careful and driven people to build it with us. Freshers and final-year students are warmly welcome."
      />

      {/* WHY JOIN */}
      <section id="why-join" className="lattice-light scroll-mt-20 bg-jade-50 py-24 text-ink-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">Why join Ruling Mind Tech</h2>
            <Ornament className="mt-6 justify-center" />
          </div>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="crest border border-ink-800/20 bg-white p-7">
                <Icon className="h-8 w-8 text-gold-600" aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 leading-relaxed text-ink-800/80">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <Button href="#open-roles" variant="dark">
              See open positions
            </Button>
          </div>
        </div>
      </section>

      {/* HIRING PROCESS */}
      <section id="hiring-process" className="lattice scroll-mt-20 bg-ink-900 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold leading-tight text-jade-50 sm:text-5xl">How we hire</h2>
            <Ornament className="mt-6 justify-center" />
            <p className="mt-6 text-lg leading-relaxed text-jade-100/75">Four simple steps, with no hidden stages and no long silences.</p>
          </div>
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {hiringSteps.map((step, index) => (
              <li key={step.name} className="crest border border-gold-500/25 bg-ink-800/70 p-7">
                <p className="text-3xl font-semibold text-jade-50">
                  <span className="text-gold-400">{index + 1}.</span> {step.name}
                </p>
                <p className="mt-3 leading-relaxed text-jade-100/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* OPEN ROLES + APPLICATION FORM (one client component so "Apply" can pre-select the role) */}
      <CareersApply />
    </>
  );
}
