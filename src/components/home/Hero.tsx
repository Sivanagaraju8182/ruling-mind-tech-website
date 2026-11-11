/**
 * Hero.tsx  -  First thing visitors see on the home page.
 *
 *  Desktop: picture on the LEFT, headline + text + buttons on the RIGHT.
 *  Mobile : the text comes first, picture below it.
 *
 * The text "rises" in once when the page loads (the one orchestrated
 * moment); the picture then keeps gently floating.
 */
import { ShieldCheck, Lock, KeyRound } from "lucide-react";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import HeroIllustration from "@/components/illustrations/HeroIllustration";
import HeroPhoto from "@/components/home/HeroPhoto";
import { getHeroPhoto } from "@/lib/heroImage";

const assurances = [
  { icon: KeyRound, text: "You own your source code" },
  { icon: Lock, text: "Secure by design" },
  { icon: ShieldCheck, text: "DPDP Act ready" },
];

export default function Hero() {
  // Real photo if you added public/images/hero-team.jpg, otherwise the illustration.
  const photo = getHeroPhoto();

  return (
    <section id="top" className="lattice relative overflow-hidden bg-ink-950">
      {/* background light pools */}
      <div className="pointer-events-none absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full bg-plum-700/40 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[30rem] w-[30rem] rounded-full bg-ink-600/50 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* PICTURE or PHOTO (left on desktop) */}
        <div className="order-2 mx-auto w-full max-w-xl lg:order-1 lg:max-w-none">
          {photo ? <HeroPhoto src={photo} /> : <HeroIllustration />}
        </div>

        {/* TEXT (right on desktop) */}
        <div className="order-1 lg:order-2">
          <h1 className="animate-rise text-5xl font-semibold leading-[1.08] text-jade-50 sm:text-6xl xl:text-7xl">Your Partner in Digital Innovation</h1>
          <Ornament className="animate-rise mt-8 justify-start [animation-delay:0.15s]" />
          <p className="animate-rise mt-8 max-w-xl text-lg leading-relaxed text-jade-100/80 [animation-delay:0.3s] sm:text-xl">
            We design and build software, online stores and AI solutions that give your business a commanding edge. Every project is crafted with precision and delivered with
            complete transparency.
          </p>
          <div className="animate-rise mt-10 flex flex-wrap gap-4 [animation-delay:0.45s]">
            <Button href="/contact">Start Your Project</Button>
            <Button href="/services" variant="outline">
              Explore Our Services
            </Button>
          </div>
          <ul className="animate-rise mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-jade-100/70 [animation-delay:0.6s]">
            {assurances.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-gold-400" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
