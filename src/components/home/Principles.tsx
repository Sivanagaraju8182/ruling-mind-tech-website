/**
 * Principles.tsx  -  "The Royal Standard": the four promises we make to every client.
 * Two-column layout: statement on the left, promises on the right (pale jade section).
 */
import { Eye, Handshake, Lock, Sparkles } from "lucide-react";
import Ornament from "@/components/ui/Ornament";

const promises = [
  {
    icon: Sparkles,
    title: "Craft without shortcuts",
    text: "Clean, tested and documented code. We would rather take an extra day than hand you something we are not proud of.",
  },
  {
    icon: Lock,
    title: "Security and privacy built in",
    text: "Protection is designed in from the first day, and your customers' data is handled in line with India's DPDP Act.",
  },
  {
    icon: Eye,
    title: "Complete transparency",
    text: "Fixed scope, honest estimates and a live preview every week. You never have to guess what is happening.",
  },
  {
    icon: Handshake,
    title: "A partner, not a vendor",
    text: "We care how your business performs after launch, so we stay close and keep improving what we built together.",
  },
];

export default function Principles() {
  return (
    <section id="royal-standard" className="scroll-mt-20 bg-jade-50 py-24 text-ink-900">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">The Royal Standard</h2>
          <Ornament className="mt-6 justify-start" />
          <p className="mt-6 text-lg leading-relaxed text-ink-800/80">
            A young company earns trust one promise at a time. These four are written into every project we accept, and every contract we sign.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2">
          {promises.map(({ icon: Icon, title, text }) => (
            <li key={title} className="crest border border-ink-800/20 bg-white p-7">
              <Icon className="h-8 w-8 text-gold-600" aria-hidden="true" />
              <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
              <p className="mt-3 leading-relaxed text-ink-800/80">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
