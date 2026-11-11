# Ruling Mind Tech: Design System

**Concept: "The Royal Court of Code".** Deep imperial emerald, antique gold and pale jade instead of the usual tech blue.
Everything is built from three signature devices that no other IT company uses together:

| Signature | What it is | Where it appears |
|---|---|---|
| **Lattice** | Faint gold diamond-weave pattern, like royal brocade | Section backgrounds |
| **Crest corners** | Gold brackets on two opposite corners that grow on hover | Cards, forms |
| **Chamfered buttons** | Corner-cut "seal" shaped buttons | All primary buttons |

The memorable moment is **The Crown Method** (home page): the 5-step process drawn as a staircase climbing to a crown.

## Colour palette (defined in `tailwind.config.ts`)
| Name | Hex | Use |
|---|---|---|
| Ink 950 / 900 / 800 | `#03130F` / `#05201A` / `#082D25` | Dark sections, header |
| Antique Gold 500 (300 to 700) | `#C9A24B` | Accent, borders, buttons |
| Jade Mist 100 / 50 | `#E9F1ED` / `#F5F9F7` | Light sections (instead of plain white) |
| Royal Plum 700 | `#4B1B3F` | Soft background glows only |

## Typography (defined in `src/lib/fonts.ts`)
- **Bodoni Moda**: headings. A high-contrast serif with a regal, fashion-house feel.
- **Hanken Grotesk**: body text. Clean and highly readable.

## Logo
A gold crown inside a shield. The three crown tips are glowing circuit nodes and a circuit trace runs through the crown:
Crown = **Ruling**, Circuit = **Mind / Tech**. Files: `src/components/brand/Logo.tsx`, `public/brand/logo.svg`, `src/app/icon.svg` (favicon).

## Layout rules
- Header: fixed on every page. Logo + name left; text links (Home, Our Services, Our Process, About Us) and a gold "Contact Us" button on the right.
- Home: Hero (picture left, text right) > Promises strip > Services > Crown Method > Royal Standard > Technology > Call to action.
- Sections alternate between deep emerald and pale jade for rhythm.
- Motion is limited to: one page-load reveal of the hero text, the gently floating hero illustration, and hover effects. All motion stops for visitors who enable "reduce motion".
