/** Ornament.tsx  -  A small royal divider: line - diamond - line. */
import { cn } from "@/lib/utils";

export default function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
      <span className="h-2.5 w-2.5 rotate-45 border border-gold-500 bg-gold-500/30" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
    </div>
  );
}
