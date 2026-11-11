/**
 * heroImage.ts  -  Looks for YOUR real team photo for the home page.
 *
 * Put your photo in the folder  public/images/  and name it exactly:
 *     hero-team.jpg   (or hero-team.jpeg / hero-team.webp / hero-team.png)
 * If a file with that name exists, the home page shows the photo.
 * If not, the home page shows the animated illustration instead.
 *
 * (This runs on the server when the page is built, so restart `npm run dev`
 *  after adding the photo.)
 */
import { existsSync } from "node:fs";
import path from "node:path";

const candidates = ["hero-team.jpg", "hero-team.jpeg", "hero-team.webp", "hero-team.png"];

export function getHeroPhoto(): string | null {
  for (const file of candidates) {
    if (existsSync(path.join(process.cwd(), "public", "images", file))) return `/images/${file}`;
  }
  return null;
}
