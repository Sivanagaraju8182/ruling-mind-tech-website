"use client";

/**
 * CookieBanner.tsx  -  The cookie / privacy notice shown to new visitors.
 *
 * Plain language, equal-weight "Accept" and "Reject" buttons, and a
 * "Customise" view with separate switches (all OFF by default).
 */
import Link from "next/link";
import { useState } from "react";
import { Cookie } from "lucide-react";
import { useConsent } from "./ConsentProvider";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

function Switch({ checked, onChange, disabled, label }: { checked: boolean; onChange?: (v: boolean) => void; disabled?: boolean; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition",
        checked ? "border-gold-500 bg-gold-500/80" : "border-jade-100/30 bg-ink-700",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-jade-50 transition-all", checked ? "left-[1.35rem]" : "left-0.5")} />
    </button>
  );
}

export default function CookieBanner() {
  const { ready, panelOpen, consent, acceptAll, rejectOptional, save } = useConsent();
  const [customising, setCustomising] = useState(false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  if (!ready || !panelOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl animate-rise border border-gold-500/40 bg-ink-900/95 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-md sm:bottom-6"
    >
      <div className="flex items-start gap-4">
        <Cookie className="mt-1 hidden h-6 w-6 shrink-0 text-gold-400 sm:block" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h2 id="cookie-title" className="text-xl font-semibold text-jade-50">
            Your privacy, your choice
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-jade-100/80">
            We use essential storage to run this website. With your permission we would also like to use optional cookies to understand how the site is used (analytics) and to
            measure our outreach (marketing). You can say no and still use every part of the website. Read our{" "}
            <Link href="/privacy-policy" className="text-gold-300 underline underline-offset-4 hover:text-gold-200">
              Privacy Policy
            </Link>
            . You can change your mind at any time from the footer.
          </p>

          {customising && (
            <ul className="mt-5 space-y-4 border-t border-gold-500/20 pt-5">
              <li className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-jade-50">Necessary</p>
                  <p className="text-sm text-jade-100/70">Remembers your cookie choice and keeps the site secure. Always on.</p>
                </div>
                <Switch checked disabled label="Necessary storage (always on)" />
              </li>
              <li className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-jade-50">Analytics</p>
                  <p className="text-sm text-jade-100/70">Helps us see which pages are useful so we can improve them.</p>
                </div>
                <Switch checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
              </li>
              <li className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-jade-50">Marketing</p>
                  <p className="text-sm text-jade-100/70">Lets us measure which of our campaigns bring visitors here.</p>
                </div>
                <Switch checked={marketing} onChange={setMarketing} label="Marketing cookies" />
              </li>
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {customising ? (
              <>
                <Button variant="primary" onClick={() => save({ analytics, marketing })}>
                  Save my choices
                </Button>
                <Button variant="outline" onClick={() => setCustomising(false)}>
                  Back
                </Button>
              </>
            ) : (
              <>
                <Button variant="primary" onClick={acceptAll}>
                  Accept all
                </Button>
                <Button variant="outline" onClick={rejectOptional}>
                  Reject optional
                </Button>
                <button
                  type="button"
                  onClick={() => setCustomising(true)}
                  className="px-3 py-3.5 text-sm font-medium text-jade-100/80 underline underline-offset-4 hover:text-gold-300"
                >
                  Customise
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
