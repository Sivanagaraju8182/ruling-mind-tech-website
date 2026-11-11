/**
 * SectionHeading.tsx  -  Title + short description for each section.
 * tone="dark"  -> for dark backgrounds,  tone="light" -> for pale backgrounds.
 */
import { cn } from "@/lib/utils";
import Ornament from "./Ornament";

type Props = {
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({ title, description, align = "center", tone = "dark", className }: Props) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <h2 className={cn("text-4xl font-semibold leading-tight sm:text-5xl", tone === "dark" ? "text-jade-50" : "text-ink-900")}>{title}</h2>
      <Ornament className={cn("mt-6", align === "center" && "justify-center")} />
      {description && (
        <p className={cn("mt-6 text-lg leading-relaxed", tone === "dark" ? "text-jade-100/75" : "text-ink-800/80")}>{description}</p>
      )}
    </div>
  );
}
