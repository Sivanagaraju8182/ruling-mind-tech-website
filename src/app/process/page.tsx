/** app/process/page.tsx  -  "Our Process" page (address: "/process"): the Crown Method in detail. */
import type { Metadata } from "next";
import { Check } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import CtaBanner from "@/components/home/CtaBanner";
import { processSteps } from "@/lib/process";

export const metadata: Metadata = {
  title: "Our Process",
  description: "The Crown Method: Scout, Council, Forge, Coronation and Reign. How Ruling Mind Tech takes an idea to a live product.",
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        title="The Crown Method"
        description="A calm, transparent way of working in five ranks. You will always know what we are doing, what we need from you and what you will receive next."
      />

      <section className="bg-ink-950 py-20">
        <ol className="relative mx-auto max-w-4xl space-y-12 px-6">
          {/* the vertical gold line that connects the steps */}
          <span className="absolute bottom-0 left-[2.15rem] top-0 hidden w-px bg-gradient-to-b from-gold-500 via-gold-500/40 to-transparent sm:block" aria-hidden="true" />
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.name} id={step.name.toLowerCase()} className="relative scroll-mt-28 sm:pl-24">
                <span className="mb-4 flex h-14 w-14 items-center justify-center border border-gold-500 bg-ink-900 text-gold-300 sm:absolute sm:left-0 sm:top-0 sm:mb-0 sm:h-[4.4rem] sm:w-[4.4rem]">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <div className="crest border border-gold-500/25 bg-ink-900/80 p-8">
                  <h2 className="text-3xl font-semibold text-jade-50">
                    <span className="text-gold-400">Step {index + 1}.</span> {step.name}
                    <span className="ml-3 text-lg font-normal text-gold-300/80">{step.meaning}</span>
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-jade-100/80">{step.details}</p>
                  <h3 className="mt-6 text-xl font-semibold text-gold-300">You receive</h3>
                  <ul className="mt-3 space-y-2">
                    {step.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-jade-100/85">
                        <Check className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <CtaBanner title="Ready to begin at Scout?" text="The first conversation is free. Tell us what you want to achieve and we will map the path." />
    </>
  );
}
