/**
 * ServicesPreview.tsx  -  "What we build" on the home page (pale jade section).
 * Laid out as an elegant ledger of rows (not a grid of identical boxes).
 */
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { services } from "@/lib/services";

export default function ServicesPreview() {
  return (
    <section id="what-we-build" className="scroll-mt-20 lattice-light bg-jade-100 py-24 text-ink-900">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          tone="light"
          title="Everything your business needs to go digital and grow"
          description="From a first website to a full AI-powered platform, one team handles the whole journey. Have something different in mind? We take on projects of every kind."
        />

        <ul className="mt-16 grid gap-x-16 md:grid-cols-2">
          {services.map(({ slug, title, summary, icon: Icon }) => (
            <li key={slug} className="group border-t border-ink-800/20 py-8 last:border-b md:[&:nth-last-child(2)]:border-b">
              <Link href="/services" className="flex gap-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center bg-ink-800 text-gold-300 transition-colors group-hover:bg-gold-500 group-hover:text-ink-950">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-display text-2xl font-semibold text-ink-900 group-hover:text-ink-700">{title}</span>
                  <span className="mt-2 block leading-relaxed text-ink-800/80">{summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 text-center">
          <Button href="/services" variant="dark">
            See all services in detail
          </Button>
        </div>
      </div>
    </section>
  );
}
