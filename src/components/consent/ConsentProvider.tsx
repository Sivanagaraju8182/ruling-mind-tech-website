"use client";

/**
 * ConsentProvider.tsx  -  Remembers the visitor's COOKIE CHOICES (DPDP Act ready).
 *
 * How it follows the DPDP Act, 2023 (consent must be free, specific, informed,
 * unconditional, unambiguous and given by a clear action):
 *   - Nothing except "necessary" storage is allowed before the visitor chooses.
 *   - Optional categories (analytics, marketing) are OFF by default (no pre-ticked boxes).
 *   - "Reject" is as easy and as visible as "Accept".
 *   - Visitors can change or WITHDRAW consent any time (footer -> Cookie Settings).
 *   - We store the time + policy version of the choice as proof of consent.
 *
 * HOW TO USE IN OTHER CODE (for example when you add Google Analytics later):
 *     const { consent } = useConsent();
 *     if (consent?.analytics) { ...load the analytics script... }
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "rmt_consent";
/** Increase this number whenever the Privacy Policy changes, so everyone is asked again. */
const POLICY_VERSION = 1;
/** Ask again after 12 months. */
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export type ConsentChoices = {
  necessary: true; // always on, the website cannot work without it
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = ConsentChoices & { version: number; savedAt: string };

type ConsentContextValue = {
  /** null = visitor has not chosen yet */
  consent: ConsentChoices | null;
  /** false until we have checked the browser storage (avoids a flash of the banner) */
  ready: boolean;
  /** true while the banner / settings panel should be visible */
  panelOpen: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  save: (choices: Pick<ConsentChoices, "analytics" | "marketing">) => void;
  openSettings: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function readStored(): ConsentChoices | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    const age = Date.now() - new Date(parsed.savedAt ?? 0).getTime();
    if (parsed.version !== POLICY_VERSION || !(age >= 0 && age < MAX_AGE_MS)) return null;
    return { necessary: true, analytics: parsed.analytics === true, marketing: parsed.marketing === true };
  } catch {
    return null; // storage blocked or corrupted: treat as "not chosen yet"
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentChoices | null>(null);
  const [ready, setReady] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);

  // On first load, look for an earlier choice.
  useEffect(() => {
    const stored = readStored();
    setConsent(stored);
    setPanelOpen(stored === null);
    setReady(true);
  }, []);

  const persist = useCallback((choices: Pick<ConsentChoices, "analytics" | "marketing">) => {
    const full: ConsentChoices = { necessary: true, ...choices };
    const record: StoredConsent = { ...full, version: POLICY_VERSION, savedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
    setConsent(full);
    setPanelOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      consent,
      ready,
      panelOpen,
      acceptAll: () => persist({ analytics: true, marketing: true }),
      rejectOptional: () => persist({ analytics: false, marketing: false }),
      save: persist,
      openSettings: () => setPanelOpen(true),
    }),
    [consent, ready, panelOpen, persist],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
