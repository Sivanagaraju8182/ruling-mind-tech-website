/** app/services/page.tsx  -  "Our Services" page (address: "/services"). */
import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/home/CtaBanner";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Custom software, website development, e-commerce, AI projects, business automation and cloud support from Ruling Mind Tech.",
};

const engagements = [
  { title: "Fixed-scope project", text: "A clear scope, price and deadline. Ideal for websites, stores and well-defined products." },
  { title: "Dedicated team", text: "Our engineers and designers work as an extension of your team on larger, evolving products." },
  { title: "Support retainer", text: "Monthly care for hosting, security, fixes and improvements after launch." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services crafted for ambitious businesses"
        description="Whatever you need to build, run or automate, our team can take it from first idea to a live, secure product. If you do not see your project below, bring it to us anyway."
      />

      <div className="bg-jade-100 text-ink-900">
        {services.map(({ slug, title, summary, icon: Icon, points }, index) => (
          <section key={slug} id={slug} className="lattice-light scroll-mt-24 border-b border-ink-800/15 py-20 last:border-b-0">
            <div className={cn("mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2 lg:gap-20")}>
              <div className={cn(index % 2 === 1 && "lg:order-2")}>
                <span className="flex h-16 w-16 items-center justify-center bg-ink-800 text-gold-300">
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-4xl font-semibold leading-tight">{title}</h2>
                <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-800/80">{summary}</p>
              </div>
              <ul className={cn("crest space-y-4 border border-ink-800/20 bg-white p-8", index % 2 === 1 && "lg:order-1")}>
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-lg">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className="lattice bg-ink-900 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-semibold text-jade-50">Choose how you want to work with us</h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {engagements.map((item) => (
              <li key={item.title} className="crest border border-gold-500/25 bg-ink-800/70 p-7">
                <h3 className="text-2xl font-semibold text-gold-300">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-jade-100/75">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
