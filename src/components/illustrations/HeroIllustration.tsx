/**
 * HeroIllustration.tsx  -  The animated picture on the home page.
 *
 * It is drawn in SVG (so it stays razor sharp on every screen and loads
 * instantly). Scene: four colleagues around a table share ideas; an
 * "idea beam" rises from the table into a glowing board with a light bulb
 * and a growth chart. Small bubbles (code, AI, UX, cloud) float around.
 *
 * Animations use the classes from tailwind.config.ts:
 *   animate-float / animate-bob / animate-spin-slow / animate-twinkle / animate-beam
 */

type PersonProps = {
  x: number;
  y: number;
  skin: string;
  hair: string;
  shirt: string;
  delay: string;
  flip?: boolean;
};

/** One seated colleague (head, hair, shoulders). The outer <g> positions; the inner <g> bobs. */
function Person({ x, y, skin, hair, shirt, delay, flip }: PersonProps) {
  return (
    <g transform={`translate(${x} ${y}) ${flip ? "scale(-1 1)" : ""}`}>
      <g className="animate-bob" style={{ animationDelay: delay }}>
        {/* shoulders / body */}
        <path d="M-46 130C-46 56-24 40 0 40S46 56 46 130Z" fill={shirt} />
        <path d="M-12 40h24l-4 16h-16Z" fill={skin} opacity="0.9" />
        {/* neck + head */}
        <rect x="-8" y="26" width="16" height="18" rx="6" fill={skin} />
        <circle cx="0" cy="0" r="25" fill={skin} />
        {/* hair */}
        <path d="M-26 -2C-28 -30 -8 -34 4 -32C20 -30 28 -16 25 -2C18 -14 6 -18 -26 -2Z" fill={hair} />
        {/* eyes + smile */}
        <circle cx="-8" cy="2" r="2" fill="#03130F" />
        <circle cx="8" cy="2" r="2" fill="#03130F" />
        <path d="M-6 12Q0 17 6 12" stroke="#03130F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}

/** A floating speech bubble holding a short label. */
function Bubble({ x, y, w, label, delay }: { x: number; y: number; w: number; label: string; delay: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="animate-float" style={{ animationDelay: delay }}>
        <rect width={w} height="46" rx="14" fill="#082D25" stroke="#C9A24B" strokeOpacity="0.8" />
        <path d={`M${w / 2 - 8} 46l8 12 8-12Z`} fill="#082D25" stroke="#C9A24B" strokeOpacity="0.8" />
        <rect x={w / 2 - 9} y="44" width="18" height="4" fill="#082D25" />
        <text x={w / 2} y="30" textAnchor="middle" fontSize="20" fontWeight="700" fill="#EFD9A0" fontFamily="ui-monospace, Menlo, monospace">
          {label}
        </text>
      </g>
    </g>
  );
}

function Sparkle({ x, y, delay, size = 1 }: { x: number; y: number; delay: string; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <path className="animate-twinkle [transform-box:fill-box] [transform-origin:center]" style={{ animationDelay: delay }} d="M0-9 2.5-2.500 9 0 2.500 2.500 0 9-2.500 2.500-9 0-2.500-2.500Z" fill="#EFD9A0" />
    </g>
  );
}

export default function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 560 520"
      role="img"
      aria-label="Illustration of four colleagues around a table sharing ideas, with a glowing light bulb and growth chart above them"
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="hi-glow" cx="50%" cy="48%" r="52%">
          <stop offset="0" stopColor="#C9A24B" stopOpacity="0.30" />
          <stop offset="0.6" stopColor="#6B2A58" stopOpacity="0.14" />
          <stop offset="1" stopColor="#6B2A58" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hi-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFD9A0" />
          <stop offset="1" stopColor="#A98230" />
        </linearGradient>
        <linearGradient id="hi-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#17594A" />
          <stop offset="1" stopColor="#082D25" />
        </linearGradient>
        <linearGradient id="hi-beam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#EFD9A0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#EFD9A0" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="hi-bulb" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#FFF6D8" />
          <stop offset="1" stopColor="#D4AE5A" />
        </radialGradient>
      </defs>

      {/* soft glow behind everything */}
      <circle cx="280" cy="255" r="250" fill="url(#hi-glow)" />

      {/* slowly turning decorative rings */}
      <g className="animate-spin-slow [transform-box:fill-box] [transform-origin:center]">
        <circle cx="280" cy="255" r="232" fill="none" stroke="#C9A24B" strokeOpacity="0.35" strokeDasharray="3 10" />
      </g>
      <g className="animate-spin-slow [animation-direction:reverse] [transform-box:fill-box] [transform-origin:center]">
        <circle cx="280" cy="255" r="196" fill="none" stroke="#EFD9A0" strokeOpacity="0.18" strokeDasharray="1 14" strokeWidth="2" />
      </g>

      {/* idea beam rising from the table to the board */}
      <polygon className="animate-beam" points="248,372 312,372 298,196 262,196" fill="url(#hi-beam)" />

      {/* glowing idea board */}
      <g transform="translate(190 62)">
        <g className="animate-float">
          <rect width="180" height="134" rx="12" fill="#05201A" fillOpacity="0.92" stroke="url(#hi-gold)" strokeWidth="1.6" />
          <rect x="8" y="8" width="164" height="118" rx="7" fill="none" stroke="#C9A24B" strokeOpacity="0.25" />
          {/* light bulb */}
          <g>
            <circle cx="62" cy="58" r="30" fill="#C9A24B" opacity="0.18" />
            <circle cx="62" cy="54" r="21" fill="url(#hi-bulb)" />
            <rect x="52" y="73" width="20" height="10" rx="3" fill="#A98230" />
            <rect x="55" y="84" width="14" height="4" rx="2" fill="#7F611F" />
            <path d="M62 22v-8M33 32l-6-5M91 32l6-5M26 56h-9M107 56h9" stroke="#EFD9A0" strokeWidth="2.4" strokeLinecap="round" />
          </g>
          {/* growth bars */}
          <rect x="108" y="86" width="12" height="22" rx="2" fill="#C9A24B" opacity="0.55" />
          <rect x="124" y="72" width="12" height="36" rx="2" fill="#C9A24B" opacity="0.75" />
          <rect x="140" y="56" width="12" height="52" rx="2" fill="#E2C474" />
          <path d="M108 80l16-12 16-4 14-16" stroke="#EFD9A0" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="154" cy="48" r="3.5" fill="#EFD9A0" />
        </g>
      </g>

      {/* the four colleagues (drawn BEFORE the table so the table hides their laps) */}
      <Person x={118} y={282} skin="#E8C39E" hair="#2B1B12" shirt="#C9A24B" delay="0s" />
      <Person x={208} y={256} skin="#B97F58" hair="#120C08" shirt="#F5F9F7" delay="0.8s" />
      <Person x={352} y={256} skin="#F1D3B3" hair="#5A3A22" shirt="#6B2A58" delay="1.6s" flip />
      <Person x={442} y={282} skin="#8D5A3B" hair="#1B120D" shirt="#17594A" delay="2.4s" flip />

      {/* table */}
      <ellipse cx="280" cy="470" rx="236" ry="22" fill="#000" opacity="0.25" />
      <ellipse cx="280" cy="396" rx="206" ry="52" fill="#051F19" />
      <ellipse cx="280" cy="384" rx="206" ry="52" fill="url(#hi-table)" stroke="#C9A24B" strokeOpacity="0.7" />
      <ellipse cx="280" cy="384" rx="170" ry="39" fill="none" stroke="#EFD9A0" strokeOpacity="0.16" />

      {/* things on the table: glowing ring, idea cards */}
      <ellipse className="animate-beam" cx="280" cy="372" rx="44" ry="11" fill="none" stroke="#EFD9A0" strokeWidth="2" />
      <g transform="translate(150 372) rotate(-9)">
        <rect width="46" height="30" rx="4" fill="#F5F9F7" />
        <path d="M7 10h32M7 17h22M7 24h27" stroke="#0E4034" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g transform="translate(366 374) rotate(8)">
        <rect width="46" height="30" rx="4" fill="#E2C474" />
        <path d="M7 10h32M7 17h18M7 24h26" stroke="#05201A" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* floating topic bubbles */}
      <Bubble x={34} y={96} w={84} label="</>" delay="0s" />
      <Bubble x={440} y={84} w={72} label="AI" delay="1.2s" />
      <Bubble x={14} y={196} w={66} label="UX" delay="2.2s" />
      <Bubble x={470} y={186} w={84} label="Cloud" delay="0.6s" />

      {/* sparkles */}
      <Sparkle x={150} y={60} delay="0.2s" />
      <Sparkle x={420} y={40} delay="1.4s" size={0.8} />
      <Sparkle x={520} y={300} delay="2.1s" size={0.9} />
      <Sparkle x={36} y={330} delay="0.9s" size={0.8} />
      <Sparkle x={300} y={30} delay="2.6s" size={0.7} />
    </svg>
  );
}
