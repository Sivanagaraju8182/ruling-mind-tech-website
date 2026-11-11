/** not-found.tsx  -  Shown when someone opens a page that does not exist (404). */
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";

export default function NotFound() {
  return (
    <section className="lattice flex min-h-[70vh] items-center justify-center px-6 py-24 text-center">
      <div>
        <p className="font-display text-8xl font-semibold text-gold-400">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-jade-50">This page is not in our kingdom</h1>
        <Ornament className="mt-6 justify-center" />
        <p className="mx-auto mt-6 max-w-md text-jade-100/75">The page may have moved or never existed. Let us take you back to somewhere useful.</p>
        <Button href="/" className="mt-10">
          Return home
        </Button>
      </div>
    </section>
  );
}
