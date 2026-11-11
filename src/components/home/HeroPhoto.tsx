/**
 * HeroPhoto.tsx  -  Shows a REAL team photo in the hero, in a royal gold frame,
 * with the floating topic bubbles (</>, AI, UX, Cloud) on top.
 *
 * Best photo: landscape, at least 1600 x 1200 pixels, under 500 KB, people clearly visible.
 */
import Image from "next/image";
import { cn } from "@/lib/utils";

const bubbleClass =
  "absolute animate-float border border-gold-500/80 bg-ink-800/95 px-4 py-2 text-lg font-bold text-gold-200 shadow-[0_8px_24px_rgba(0,0,0,0.5)]";

export default function HeroPhoto({ src }: { src: string }) {
  return (
    <div className="relative mx-auto w-full max-w-xl pb-4 pl-4 lg:max-w-none">
      {/* offset gold frame behind the photo */}
      <div className="absolute bottom-0 left-0 right-4 top-4 border border-gold-500/60" aria-hidden="true" />

      <div className="crest relative">
        <div className="relative aspect-[4/3] overflow-hidden border border-gold-500/40 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
          <Image
            src={src}
            alt="The Ruling Mind Tech team in a meeting, sharing ideas around a table"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          {/* soft dark gradient so the bubbles and the page blend together */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/10" aria-hidden="true" />
        </div>

        {/* floating bubbles */}
        <span className={cn(bubbleClass, "-left-3 top-6 rounded-2xl sm:-left-6")}>&lt;/&gt;</span>
        <span className={cn(bubbleClass, "-right-2 top-14 rounded-2xl [animation-delay:1.2s] sm:-right-5")}>AI</span>
        <span className={cn(bubbleClass, "-left-2 bottom-16 rounded-2xl [animation-delay:2.2s] sm:-left-5")}>UX</span>
        <span className={cn(bubbleClass, "-right-3 bottom-6 rounded-2xl [animation-delay:0.6s] sm:-right-6")}>Cloud</span>
      </div>
    </div>
  );
}
