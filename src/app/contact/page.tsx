/** app/contact/page.tsx  -  "Contact Us" page (address: "/contact"). */
import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Tell Ruling Mind Tech about your project. We reply within one working day.",
};

export default function ContactPage() {
  const details = [
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Office", value: siteConfig.address },
    { icon: Clock, label: "Working hours", value: siteConfig.hours },
  ];

  return (
    <>
      <PageHero title="Let us talk about your idea" description="Share a few details and we will reply within one working day with honest advice and a clear next step. No pressure, no jargon." />

      <section className="lattice bg-ink-950 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="text-3xl font-semibold text-jade-50">Reach us directly</h2>
            <ul className="mt-8 space-y-7">
              {details.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold-500/50 text-gold-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm text-jade-100/60">{label}</p>
                    {href ? (
                      <a href={href} className="text-lg text-jade-50 hover:text-gold-300">
                        {value}
                      </a>
                    ) : (
                      <p className="text-lg text-jade-50">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-10 border-l-2 border-gold-500 pl-5 leading-relaxed text-jade-100/70">
              Your details are used only to answer your enquiry. See our Privacy Policy to learn how we protect them and how to exercise your rights.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* LOCATION MAP */}
      <section id="map" className="scroll-mt-20 border-t border-gold-500/20 bg-ink-900 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-semibold text-jade-50">Find us on the map</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-jade-100/70">Visit our office or use the map to plan your route. {siteConfig.hours}.</p>
          <div className="mt-10">
            <LocationMap query={siteConfig.mapQuery} address={siteConfig.address} />
          </div>
        </div>
      </section>
    </>
  );
}
