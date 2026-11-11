# Ruling Mind Tech: Company Website

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**. Professional, secure and DPDP-ready.

---

## 1. Run it in VS Code (first time)

1. Install **Node.js 20 LTS** from https://nodejs.org (tick the default options). Check it: open a terminal and run `node -v`.
2. Install **VS Code** from https://code.visualstudio.com.
3. Unzip this project. In VS Code choose **File > Open Folder** and select the `ruling-mind-tech` folder.
4. Open the terminal inside VS Code: **Terminal > New Terminal**.
5. Install the packages (only once, takes 1 to 3 minutes, needs internet):
   ```bash
   npm install
   ```
6. Start the website:
   ```bash
   npm run dev
   ```
7. Open **http://localhost:3000** in your browser. Save a file and the page refreshes by itself.

Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your real domain.

### Handy commands
| Command | What it does |
|---|---|
| `npm run dev` | Development server with live reload |
| `npm run build` | Creates the optimised production version (also checks for errors) |
| `npm run start` | Runs the production version (run `build` first) |
| `npm run lint` | Checks code quality |
| `npm run type-check` | Checks TypeScript types |

Recommended VS Code extensions: *Tailwind CSS IntelliSense*, *ESLint*, *Prettier*.

---

## 1b. Version 2 changes (how to use them)

### A) Real photo on the home page
1. Download your team / staff-meeting photo (landscape, at least 1600 x 1200 px, under 500 KB is ideal).
2. Rename it exactly **`hero-team.jpg`** (`.jpeg`, `.webp` or `.png` also work).
3. Copy it into the folder **`public/images/`**.
4. Stop the server (`Ctrl + C`) and run `npm run dev` again. The home page now shows your photo in a gold frame with the floating bubbles.
5. To go back to the animated illustration, delete or rename the photo.
6. **Licence:** free photos from sites like Magnific/Freepik usually require crediting the author unless you hold a premium plan. Read the licence on the download page. If a credit is needed, type it in `src/lib/site.ts` -> `heroPhotoCredit` and it shows in the footer. (Unsplash and Pexels photos do not require credit.)

### B) Location map on the Contact page
- Open `src/lib/site.ts` and set **`mapQuery`** to your exact office address (or "Company name, City") and **`address`** to the text you want displayed.
- The map loads only after the visitor clicks **Load map** (privacy / DPDP). "Open in Google Maps" is always available.

### C) Hover menus in the header
- Hover over Home, Our Services, Our Process or About Us and a panel of buttons opens. Each button jumps to that area.
- Edit the buttons in `src/lib/site.ts` -> `navLinks`. The part after `#` must match an `id="..."` on that page.
- On mobile, the arrow next to each link opens the same buttons.

---

## 2. Folder structure (what is where)

```
ruling-mind-tech/
|-- README.md                  <- you are here
|-- DESIGN.md                  <- colours, fonts, logo idea, layout rules
|-- package.json               <- list of packages + commands
|-- next.config.mjs            <- Next.js settings + SECURITY HEADERS
|-- tailwind.config.ts         <- brand colours, fonts, animations
|-- tsconfig.json              <- TypeScript settings
|-- public/brand/              <- logo files (SVG)
|-- public/images/             <- PUT hero-team.jpg HERE (your real team photo)
`-- src/
    |-- app/                   <- PAGES (each folder = one web address)
    |   |-- layout.tsx         <- frame on every page: header + footer + cookie banner
    |   |-- globals.css        <- global styles + signature decorations
    |   |-- page.tsx           <- HOME      ( / )
    |   |-- services/page.tsx  <- SERVICES  ( /services )
    |   |-- process/page.tsx   <- PROCESS   ( /process )
    |   |-- about/page.tsx     <- ABOUT     ( /about )
    |   |-- contact/page.tsx   <- CONTACT   ( /contact )
    |   |-- privacy-policy/    <- PRIVACY POLICY (DPDP Act)
    |   |-- terms/             <- TERMS OF USE
    |   |-- api/contact/route.ts <- server code that receives the contact form
    |   |-- icon.svg, not-found.tsx, robots.ts, sitemap.ts
    |-- components/
    |   |-- brand/Logo.tsx           <- the logo
    |   |-- layout/Header.tsx, Footer.tsx
    |   |-- ui/                      <- Button, Ornament, SectionHeading, PageHero
    |   |-- home/                    <- Hero, Promises, ServicesPreview, CrownStairs,
    |   |                               Principles, TechStack, CtaBanner
    |   |-- illustrations/HeroIllustration.tsx  <- animated hero picture (used if no photo)
    |   |-- home/HeroPhoto.tsx       <- real photo version of the hero
    |   |-- consent/                 <- cookie banner + consent memory
    |   |-- contact/ContactForm.tsx, LocationMap.tsx
    |   `-- legal/LegalPage.tsx
    `-- lib/
        |-- site.ts            <- COMPANY DETAILS (email, phone, address)  <<< EDIT FIRST
        |-- services.ts        <- list of services
        |-- process.ts         <- the 5 process steps
        |-- validation.ts      <- form rules (browser + server)
        |-- rateLimit.ts       <- anti-spam limiter
        |-- heroImage.ts       <- detects public/images/hero-team.jpg
        |-- fonts.ts, utils.ts
```

**Rule of thumb:** to change TEXT, edit `lib/site.ts`, `lib/services.ts`, `lib/process.ts` or the page file. To change COLOURS, edit `tailwind.config.ts`.

---

## 3. Before you go live: checklist

1. **`src/lib/site.ts`**: replace every "CHANGE ME": email, phone, address, **mapQuery (map location)**, Grievance Officer name and email, social links.
2. **Privacy Policy + Terms**: have a lawyer review them (they are strong templates, not legal advice).
3. **Receive contact emails** (see section 4). Until then enquiries are only printed in the dev terminal.
4. Set `NEXT_PUBLIC_SITE_URL` to your real domain.
5. Deploy over **HTTPS** (Vercel, Netlify, or your own server).
6. Test with the real domain at https://securityheaders.com.

---

## 4. Receiving contact form emails

Install Nodemailer: `npm install nodemailer` and `npm install -D @types/nodemailer`.
Add to `.env.local`:
```
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your-user
SMTP_PASS=your-password
MAIL_TO=hello@yourdomain.com
```
Then in `src/app/api/contact/route.ts`, replace the "Do something with the enquiry" block with:
```ts
import nodemailer from "nodemailer"; // put this at the top of the file

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});
const { name, email, phone, company, service, message } = result.value;
await transporter.sendMail({
  from: process.env.SMTP_USER,
  to: process.env.MAIL_TO,
  replyTo: email,
  subject: `New enquiry from ${name}: ${service}`,
  text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\n${message}`,
});
```
Never put passwords in code. Only in `.env.local` (which is already git-ignored).

---

## 5. DPDP Act, 2023: what is built in

| Requirement | How the website meets it |
|---|---|
| Free, specific, informed, clear consent | Cookie banner in plain language; contact form consent box is **not pre-ticked** and states the purpose |
| No consent bundling | Analytics and marketing are separate switches, **off by default** |
| Refusing as easy as accepting | "Accept all" and "Reject optional" buttons carry equal weight |
| Withdraw consent easily | "Cookie Settings" in the footer on every page |
| Proof of consent | Choice, date and policy version stored; asked again after 12 months or a policy change |
| Notice of rights and purposes | Full Privacy Policy: purposes, retention, rights, children, transfers, breach handling |
| Grievance redressal | Grievance Officer section + footer line (fill in the real name in `site.ts`) |
| Data minimisation | Form asks only what is needed; no personal data logged in production |
| Children's data | Policy states no knowing collection under 18, no tracking of children |

**Still to do on the business side (not code):** appoint the Grievance Officer, keep a record of data you store, delete old enquiries per the retention period, and have a breach-response plan. If you add analytics later, load the script **only when** `useConsent().consent?.analytics` is true.

## 6. Security built in

- Strict **Content-Security-Policy** + HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy (`next.config.mjs`).
- The Google map loads only after a click; the CSP allows only `https://www.google.com` for frames.
- Contact API: same-origin check, size limit, per-visitor rate limit, strict server-side validation, honeypot against bots.
- `X-Powered-By` header removed; no secrets in code; `.env` files git-ignored.
- Fonts are self-hosted, so visitors' data is not sent to Google.
- Keep safe: run `npm audit` and update packages regularly (`npm update`).
- For many servers, replace the in-memory rate limiter with Redis/Upstash.

## 7. Deploy (easiest way)

Push the project to GitHub, then import it at https://vercel.com (free plan works). Add `NEXT_PUBLIC_SITE_URL` (and email settings) in Project Settings > Environment Variables.

## 8. Common problems

| Problem | Fix |
|---|---|
| `npm` is not recognised | Install Node.js, then close and reopen VS Code |
| Port 3000 already in use | `npm run dev -- -p 3001` |
| Fonts do not load while running `npm run build` | You need an internet connection during build (fonts are downloaded once) |
| Styles look broken | Stop the server, delete the `.next` folder, run `npm run dev` again |
