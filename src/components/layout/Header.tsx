"use client";

/**
 * Header.tsx  -  The fixed top bar shown on EVERY page.
 *
 *  Left  : logo + company name (click = go home)
 *  Right : text links (Home, Our Services, Our Process, About Us) + gold "Contact Us" button
 *
 * HOVER MENUS: when the mouse rests on a link, a small panel of buttons opens below it.
 * Each button jumps to that area of the website. (Also works with the keyboard: Tab opens it,
 * Esc closes it.) On phones the same buttons open with the small arrow next to each link.
 * The buttons are defined in src/lib/site.ts -> navLinks.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type FocusEvent } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import Button from "@/components/ui/Button";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const [scrolled, setScrolled] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null); // which desktop dropdown is open
  const [mobileKey, setMobileKey] = useState<string | null>(null); // which mobile group is expanded

  // Close menus whenever the page changes.
  useEffect(() => {
    setMenuOpen(false);
    setOpenKey(null);
  }, [pathname]);

  // Make the header a little darker after the visitor scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close a dropdown when keyboard focus leaves it.
  function handleBlur(event: FocusEvent<HTMLLIElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenKey(null);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || menuOpen ? "border-gold-500/30 bg-ink-950/95 backdrop-blur-md" : "border-gold-500/15 bg-ink-950/80 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" aria-label="Ruling Mind Tech - home" className="shrink-0">
          <Logo />
        </Link>

        {/* ---------- Desktop navigation with hover dropdowns ---------- */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              const open = openKey === link.href;
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenKey(link.href)}
                  onMouseLeave={() => setOpenKey(null)}
                  onFocus={() => setOpenKey(link.href)}
                  onBlur={handleBlur}
                  onKeyDown={(event) => event.key === "Escape" && setOpenKey(null)}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open}
                    className={cn(
                      "group relative flex items-center gap-1 py-2 text-[0.95rem] font-medium transition-colors",
                      active || open ? "text-gold-300" : "text-jade-100/80 hover:text-gold-300",
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
                    {/* gold underline */}
                    <span className={cn("absolute inset-x-0 bottom-0 h-px origin-left bg-gold-400 transition-transform duration-300", active || open ? "scale-x-100" : "scale-x-0")} />
                  </Link>

                  {/* The dropdown panel. The top padding (pt-4) keeps the hover alive while the mouse travels down. */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-4 transition duration-200",
                      open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
                    )}
                  >
                    <div className="crest border border-gold-500/40 bg-ink-900 p-3 shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
                      <ul className="flex flex-col gap-1.5">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpenKey(null)}
                              className="block border border-gold-500/25 px-4 py-2.5 text-sm font-medium text-jade-100/90 transition-colors hover:border-gold-400 hover:bg-gold-500 hover:text-ink-950 focus-visible:bg-gold-500 focus-visible:text-ink-950"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
            <li>
              <Button href="/contact" className="ml-2 !py-3">
                Contact Us
              </Button>
            </li>
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-gold-500/40 text-gold-300 lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* ---------- Mobile navigation ---------- */}
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Mobile" className="max-h-[calc(100vh-4.75rem)] overflow-y-auto border-t border-gold-500/20 px-6 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const expanded = mobileKey === link.href;
              return (
                <li key={link.href} className="border-b border-jade-100/10">
                  <div className="flex items-center justify-between">
                    <Link href={link.href} onClick={() => setMenuOpen(false)} className="block flex-1 py-4 text-lg text-jade-100 hover:text-gold-300">
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-label={`Show sections of ${link.label}`}
                      onClick={() => setMobileKey(expanded ? null : link.href)}
                      className="p-3 text-gold-300"
                    >
                      <ChevronDown className={cn("h-5 w-5 transition-transform", expanded && "rotate-180")} />
                    </button>
                  </div>
                  {expanded && (
                    <ul className="mb-4 flex flex-col gap-2">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            className="block border border-gold-500/30 px-4 py-3 text-sm text-jade-100/90 hover:bg-gold-500 hover:text-ink-950"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <Button href="/contact" className="mt-6 w-full" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Button>
        </nav>
      )}
    </header>
  );
}
