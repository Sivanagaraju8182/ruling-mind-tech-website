"use client";

/** CookieSettingsButton.tsx  -  Footer button that re-opens the cookie panel (lets people withdraw consent). */
import { useConsent } from "./ConsentProvider";

export default function CookieSettingsButton({ className }: { className?: string }) {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className={className}>
      Cookie Settings
    </button>
  );
}
