/** CtaBanner.tsx  -  The closing call-to-action, reused at the bottom of most pages. */
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";

export default function CtaBanner({
  title = "Let us build something worthy of a crown",
  text = "Tell us about your idea. We will reply within one working day with honest advice and a clear next step.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section id="get-started" className="relative scroll-mt-20 overflow-hidden bg-ink-800 py-24">
      <div className="lattice absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/15 blur-[110px]" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-semibold leading-tight text-jade-50 sm:text-5xl">{title}</h2>
        <Ornament className="mt-6 justify-center" />
        <p className="mt-6 text-lg leading-relaxed text-jade-100/80">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/contact">Contact Us</Button>
          <Button href="/process" variant="outline">
            See how we work
          </Button>
        </div>
      </div>
    </section>
  );
}
