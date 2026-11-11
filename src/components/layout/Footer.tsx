/**
 * Footer.tsx  -  The bottom of every page: company info, quick links,
 * contact details and the DPDP / legal links.
 */
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/brand/Logo";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

const linkClass = "text-jade-100/70 transition-colors hover:text-gold-300";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="lattice relative border-t border-gold-500/30 bg-ink-950">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
        <div>
          <Logo />
          <p className="mt-6 max-w-sm leading-relaxed text-jade-100/70">
            Software, websites, e-commerce and AI, built with royal attention to detail for businesses that mean to lead.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {siteConfig.social.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer pages">
          <h2 className="text-xl font-semibold text-gold-300">Explore</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className={linkClass}>
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer services">
          <h2 className="text-xl font-semibold text-gold-300">What we build</h2>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href="/services" className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xl font-semibold text-gold-300">Get in touch</h2>
          <ul className="mt-5 space-y-4 text-jade-100/75">
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
              <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className={linkClass}>
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-gold-500/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-sm text-jade-100/60 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy-policy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy#cookies" className={linkClass}>
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms of Use
              </Link>
            </li>
            <li>
              <CookieSettingsButton className={linkClass} />
            </li>
          </ul>
        </div>
        {siteConfig.heroPhotoCredit && <p className="mx-auto max-w-7xl px-6 pb-3 text-xs text-jade-100/45">{siteConfig.heroPhotoCredit}</p>}
        <p className="mx-auto max-w-7xl px-6 pb-6 text-xs leading-relaxed text-jade-100/45">
          We handle personal data in line with India&apos;s Digital Personal Data Protection Act, 2023. To exercise your rights or raise a complaint, write to our Grievance Officer at{" "}
          <a href={`mailto:${siteConfig.grievanceOfficer.email}`} className="underline underline-offset-2 hover:text-gold-300">
            {siteConfig.grievanceOfficer.email}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
