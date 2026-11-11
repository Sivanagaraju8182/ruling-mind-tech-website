/**
 * fonts.ts  -  Website fonts
 *
 * next/font downloads the fonts ONCE during build and serves them from our own
 * server. That means: faster pages and NO visitor data is sent to Google
 * (good for privacy / DPDP compliance).
 *
 *  - Bodoni Moda   : elegant, high-contrast "royal" serif for headings
 *  - Hanken Grotesk: clean, friendly sans-serif for paragraphs
 */
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";

export const displayFont = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
