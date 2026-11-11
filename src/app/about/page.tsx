/** app/about/page.tsx  -  "About Us" page (address: "/about"). Edit the story text freely. */
import type { Metadata } from "next";
import { Gem, Scale, Telescope } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/home/CtaBanner";
import { LogoMark } from "@/components/brand/Logo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet Ruling Mind Tech, a new software, e-commerce and AI company built on craft, security and transparency.",
};

const values = [
  { icon: Gem, title: "Excellence", text: "We sweat the details nobody asked about, because that is where quality shows." },
  { icon: Scale, title: "Integrity", text: "Honest timelines, honest prices and honest advice, even when it costs us a sale." },
  { icon: Telescope, title: "Vision", text: "We build for where your business will be in three years, not only for today." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="A new company with an old-fashioned promise"
        description="Ruling Mind Tech was founded to give growing businesses the quality of a large technology house, with the attention of a small team that picks up the phone."
      />

      <section id="story" className="scroll-mt-20 bg-jade-100 py-24 text-ink-900">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex justify-center">
            <div className="crest relative border border-ink-800/20 bg-ink-900 p-14">
              <LogoMark className="h-48 w-48 drop-shadow-[0_6px_24px_rgba(201,162,75,0.4)]" />
            </div>
          </div>
          <div>
            <h2 className="text-4xl font-semibold leading-tight">Why we are called Ruling Mind</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-800/85">
              Every great product begins as an idea in a clear mind. The crown in our emblem stands for mastery over the craft, and the circuit running through it stands for the thinking
              behind every line of code. We believe technology should serve the person who commands it.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink-800/85">
              We launch in {siteConfig.foundedYear}, and we are building the company the way we build software: carefully, in the open and for the long term. We work across software,
              websites, e-commerce, artificial intelligence and business systems, and we take on projects of every size and kind.
            </p>
          </div>
        </div>
      </section>

      <section id="mission" className="scroll-mt-20 lattice bg-ink-900 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="crest border border-gold-500/25 bg-ink-800/70 p-9">
              <h2 className="text-3xl font-semibold text-gold-300">Our mission</h2>
              <p className="mt-4 text-lg leading-relaxed text-jade-100/80">
                To make world-class digital technology accessible to ambitious businesses, delivered with transparency, security and care.
              </p>
            </div>
            <div className="crest border border-gold-500/25 bg-ink-800/70 p-9">
              <h2 className="text-3xl font-semibold text-gold-300">Our vision</h2>
              <p className="mt-4 text-lg leading-relaxed text-jade-100/80">
                To become the technology partner that growing Indian businesses trust first, and recommend to others without hesitation.
              </p>
            </div>
          </div>

          <h2 id="values" className="mt-20 scroll-mt-24 text-center text-4xl font-semibold text-jade-50">What we stand for</h2>
          <ul className="mt-12 grid gap-10 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="text-center">
                <span className="mx-auto flex h-16 w-16 items-center justify-center border border-gold-500/60 text-gold-300">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-jade-50">{title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-jade-100/75">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
