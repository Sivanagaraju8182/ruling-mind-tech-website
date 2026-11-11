/** LegalPage.tsx  -  Shared layout for Privacy Policy and Terms (readable long-form text). */
import type { ReactNode } from "react";
import PageHero from "@/components/ui/PageHero";

export default function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} description={intro} />
      <section className="bg-jade-100 py-16 text-ink-900">
        <article className="mx-auto max-w-3xl px-6 [&_a]:text-ink-700 [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-semibold [&_li]:mt-2 [&_p]:mt-4 [&_p]:text-lg [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-lg [&_ul]:leading-relaxed">
          <p className="!mt-0 border-l-2 border-gold-600 pl-4 text-base text-ink-800/80">Last updated: {updated}</p>
          {children}
        </article>
      </section>
    </>
  );
}
