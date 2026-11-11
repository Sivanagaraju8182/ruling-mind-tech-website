/**
 * tailwind.config.ts  -  THE DESIGN SYSTEM OF RULING MIND TECH
 *
 * All brand colours, fonts and animations live here.
 * Change a colour here and the whole website updates.
 *
 *  ink   = deep imperial emerald (dark sections)
 *  gold  = antique gold (accent, borders, buttons)
 *  jade  = pale jade mist (light sections, instead of boring white/cream)
 *  plum  = royal plum (rare secondary glow)
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#03130F",
          900: "#05201A",
          800: "#082D25",
          700: "#0E4034",
          600: "#17594A",
        },
        gold: {
          200: "#EFD9A0",
          300: "#E2C474",
          400: "#D4AE5A",
          500: "#C9A24B",
          600: "#A98230",
          700: "#7F611F",
        },
        jade: {
          50: "#F5F9F7",
          100: "#E9F1ED",
          200: "#D3E2DB",
        },
        plum: {
          500: "#6B2A58",
          700: "#4B1B3F",
          900: "#2A0E24",
        },
      },
      fontFamily: {
        // These CSS variables are created in src/lib/fonts.ts
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        bob: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-5px)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
        twinkle: { "0%,100%": { opacity: "0.15", transform: "scale(0.7)" }, "50%": { opacity: "1", transform: "scale(1)" } },
        beam: { "0%,100%": { opacity: "0.10" }, "50%": { opacity: "0.28" } },
        rise: { from: { opacity: "0", transform: "translateY(22px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        bob: "bob 5s ease-in-out infinite",
        "spin-slow": "spinSlow 60s linear infinite",
        twinkle: "twinkle 3.5s ease-in-out infinite",
        beam: "beam 4s ease-in-out infinite",
        rise: "rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
