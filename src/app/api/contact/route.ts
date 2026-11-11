/**
 * app/api/contact/route.ts  -  The SERVER side of the contact form (address: POST /api/contact).
 *
 * Protections included:
 *   1. Same-origin check      (blocks forms posted from other websites - CSRF)
 *   2. Size limit             (blocks giant payloads)
 *   3. Rate limit             (5 messages per 10 minutes per visitor)
 *   4. Strict validation      (same rules as the browser, re-checked here)
 *   5. Honeypot               (silently drops spam bots)
 *   6. Consent required       (DPDP Act)
 *   7. No-store caching       (responses are never cached)
 *
 * TODO (before launch): send the enquiry to your inbox / CRM.
 * See README.md -> "Receiving contact form emails".
 */
import { NextResponse, type NextRequest } from "next/server";
import { validateContact } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  // 1) Only accept requests that come from our own website.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    try {
      if (new URL(origin).host !== host) return reply({ message: "Request not allowed." }, 403);
    } catch {
      return reply({ message: "Request not allowed." }, 403);
    }
  }

  // 2) Reject oversized requests.
  if (Number(request.headers.get("content-length") ?? 0) > 10_000) {
    return reply({ message: "Your message is too large." }, 413);
  }

  // 3) Rate limit by visitor IP address.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return reply({ message: "Too many messages. Please wait a few minutes and try again." }, 429);
  }

  // 4) Read and validate.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ message: "Invalid request." }, 400);
  }

  const result = validateContact(body);
  if (!result.ok) return reply({ message: "Please correct the highlighted fields.", errors: result.errors }, 422);

  // 5) Honeypot: pretend success so bots learn nothing.
  if (result.value.website) return reply({ ok: true });

  // 6) Do something with the enquiry.
  // ---------------------------------------------------------------
  // For now we only print it in the terminal during development.
  // In production we do NOT log personal details (data minimisation).
  if (process.env.NODE_ENV !== "production") {
    const { website, consent, ...enquiry } = result.value;
    void website;
    void consent;
    console.log("[contact form] New enquiry:", enquiry);
  }
  // Replace the block above with an email / CRM call. Example in README.md.

  return reply({ ok: true });
}
