/** PageHero.tsx  -  The dark banner at the top of inner pages (Services, About, ...). */
import Ornament from "./Ornament";

export default function PageHero({ title, description }: { title: string; description: string }) {
  return (
    <section className="lattice relative overflow-hidden border-b border-gold-500/20 bg-ink-900">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-plum-700/40 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[24rem] w-[24rem] rounded-full bg-gold-500/10 blur-[110px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <h1 className="animate-rise max-w-4xl text-5xl font-semibold leading-[1.1] text-jade-50 sm:text-6xl">{title}</h1>
        <Ornament className="animate-rise mt-7 justify-start [animation-delay:0.15s]" />
        <p className="animate-rise mt-7 max-w-2xl text-lg leading-relaxed text-jade-100/75 [animation-delay:0.3s]">{description}</p>
      </div>
    </section>
  );
}
