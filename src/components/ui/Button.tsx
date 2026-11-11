/**
 * Button.tsx  -  One button component used everywhere.
 *
 *  <Button href="/contact">Contact Us</Button>      -> renders a link (<a>)
 *  <Button onClick={...}>Save</Button>              -> renders a real <button>
 *
 * Variants:
 *   primary  = solid gold with cut corners (main action)
 *   outline  = gold outline (secondary action)
 *   dark     = dark emerald, for use on light sections
 */
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "dark";

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };
type LinkProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide transition duration-300 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "chamfer gold-gradient text-ink-950 hover:brightness-110",
  outline: "border border-gold-500/70 text-gold-300 hover:border-gold-300 hover:bg-gold-500/10",
  dark: "chamfer bg-ink-800 text-gold-300 hover:bg-ink-700",
};

export default function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as Omit<LinkProps, "variant" | "className" | "children">;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
