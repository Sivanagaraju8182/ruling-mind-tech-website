/** TechStack.tsx  -  The tools we build with. Edit the list to match your real stack. */
import SectionHeading from "@/components/ui/SectionHeading";

const tools = [
  "Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI", ".NET", "PostgreSQL",
  "MongoDB", "Docker", "AWS and Azure", "TensorFlow", "OpenAI and LLM APIs", "Shopify and WooCommerce", "Figma",
];

export default function TechStack() {
  return (
    <section id="technology" className="scroll-mt-20 lattice border-y border-gold-500/20 bg-ink-950 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="Built with proven technology" description="Modern, secure and widely supported tools, so what we build stays easy to maintain for years." />
        <ul className="mx-auto mt-12 flex max-w-5xl flex-wrap justify-center gap-3">
          {tools.map((tool) => (
            <li key={tool} className="border border-gold-500/30 bg-ink-900/70 px-5 py-2.5 text-jade-100/85 transition-colors hover:border-gold-400 hover:text-gold-300">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
