/**
 * CrownStairs.tsx  -  THE MEMORABLE ELEMENT of the website.
 *
 * Our five-step method is shown as a staircase that climbs to the crown:
 * each step stands a little higher than the one before it.
 * On phones it becomes a simple vertical list.
 */
import { Crown } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { processSteps } from "@/lib/process";

// How far each step is lifted on desktop (in rem). Step 1 is lowest, step 5 highest.
const lift = ["lg:mt-48", "lg:mt-36", "lg:mt-24", "lg:mt-12", "lg:mt-0"];

export default function CrownStairs() {
  return (
    <section id="crown-method" className="relative scroll-mt-20 overflow-hidden bg-ink-900 py-24">
      <div className="pointer-events-none absolute right-0 top-0 h-[32rem] w-[32rem] rounded-full bg-plum-700/30 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          title="The Crown Method"
          description="Five ranks, one clear path. Every project we take climbs the same stairway, so you always know where you stand and what comes next."
        />

        <ol className="mt-16 grid gap-6 lg:grid-cols-5 lg:items-start lg:gap-0">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.name} className={`crest border border-gold-500/25 bg-ink-800/70 p-6 lg:mx-1.5 ${lift[index]}`}>
                <span className="flex h-12 w-12 items-center justify-center border border-gold-500/60 text-gold-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-jade-50">
                  <span className="text-gold-400">{index + 1}.</span> {step.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold-300/90">{step.meaning}</p>
                <p className="mt-4 text-sm leading-relaxed text-jade-100/75">{step.summary}</p>
              </li>
            );
          })}
        </ol>

        {/* the crown at the top of the stairs */}
        <div className="mt-14 flex flex-col items-center text-center">
          <Crown className="h-9 w-9 text-gold-400" aria-hidden="true" />
          <p className="mt-3 max-w-lg text-jade-100/75">At the top: a product that is live, secure and yours, with a partner who stays.</p>
          <Button href="/process" variant="outline" className="mt-8">
            Learn how each stage works
          </Button>
        </div>
      </div>
    </section>
  );
}
