/** Promises.tsx  -  A slim strip under the hero with four honest facts about the company. */
import { Boxes, FileCheck2, Rocket, ShieldCheck } from "lucide-react";

const facts = [
  { icon: Rocket, title: "Launching in 2026", text: "A new, hungry team that treats every client as a founding partner." },
  { icon: Boxes, title: "Six service areas", text: "Software, websites, e-commerce, AI, business systems and cloud care." },
  { icon: FileCheck2, title: "Full code ownership", text: "You receive complete source code and documentation at handover." },
  { icon: ShieldCheck, title: "Privacy by design", text: "Built in line with the DPDP Act, 2023 from the very first line." },
];

export default function Promises() {
  return (
    <section id="highlights" className="border-y border-gold-500/25 bg-ink-900">
      <ul className="mx-auto grid max-w-7xl divide-gold-500/15 sm:grid-cols-2 sm:divide-x lg:grid-cols-4">
        {facts.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex gap-4 px-6 py-8">
            <Icon className="mt-1 h-7 w-7 shrink-0 text-gold-400" aria-hidden="true" />
            <div>
              <h3 className="text-xl font-semibold text-jade-50">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-jade-100/70">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
