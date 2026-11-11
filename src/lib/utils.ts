/** Small helper: joins CSS class names and ignores empty values.
 *  cn("a", false, "b")  ->  "a b"  */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
