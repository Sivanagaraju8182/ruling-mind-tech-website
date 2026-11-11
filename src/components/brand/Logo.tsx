/**
 * Logo.tsx  -  The Ruling Mind Tech logo.
 *
 * IDEA: A gold CROWN ("Ruling") whose three peaks are circuit NODES ("Tech"),
 * with a circuit trace running through it ("Mind"), all inside a
 * shield. Strong, royal, and clearly technology.
 *
 * <LogoMark />  -> only the symbol
 * <Logo />      -> symbol + company name (used in header and footer)
 */
import { useId } from "react";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  // Unique id so two logos on one page never clash.
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFD9A0" />
          <stop offset="0.5" stopColor="#C9A24B" />
          <stop offset="1" stopColor="#8F6C22" />
        </linearGradient>
        <linearGradient id={`${id}-shield`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0E4034" />
          <stop offset="1" stopColor="#03130F" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path d="M32 2 58 14v22c0 12-10 21-26 26C16 57 6 48 6 36V14Z" fill={`url(#${id}-shield)`} stroke={`url(#${id}-gold)`} strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M32 7 53 17v19c0 9.5-8 17-21 21.5C19 53 11 45.5 11 36V17Z" fill="none" stroke="#C9A24B" strokeOpacity="0.35" strokeWidth="0.8" />
      {/* Crown */}
      <path d="M17 43 15 24l9.5 8L32 19l7.5 13L49 24l-2 19Z" fill={`url(#${id}-gold)`} strokeLinejoin="round" />
      <rect x="17" y="45.5" width="30" height="3.5" rx="1.2" fill={`url(#${id}-gold)`} />
      {/* Circuit "mind" traces inside the crown */}
      <path d="M32 27v10M25 37h14" stroke="#03130F" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <circle cx="25" cy="37" r="1.8" fill="#03130F" />
      <circle cx="39" cy="37" r="1.8" fill="#03130F" />
      <circle cx="32" cy="27" r="2" fill="#03130F" />
      {/* Crown tips as glowing nodes */}
      <circle cx="15" cy="23" r="2.6" fill="#EFD9A0" />
      <circle cx="32" cy="17.5" r="3" fill="#EFD9A0" />
      <circle cx="49" cy="23" r="2.6" fill="#EFD9A0" />
    </svg>
  );
}

export default function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="h-11 w-11 shrink-0 drop-shadow-[0_2px_8px_rgba(201,162,75,0.35)]" />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.35rem] font-semibold tracking-[0.14em]", tone === "dark" ? "text-gold-300" : "text-ink-800")}>
          RULING MIND
        </span>
        <span className="mt-1.5 flex items-center gap-2">
          <span className="h-px flex-1 bg-gold-500/60" />
          <span className={cn("font-body text-[0.7rem] font-medium tracking-[0.5em]", tone === "dark" ? "text-jade-100/80" : "text-ink-700")}>TECH</span>
          <span className="h-px flex-1 bg-gold-500/60" />
        </span>
      </span>
    </span>
  );
}
