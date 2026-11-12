/**
 * app/api/careers/route.ts  -  SERVER side of the job application form (POST /api/careers).
 *
 * Same protections as the contact form: same-origin check, size limit, rate limit,
 * strict validation, honeypot, mandatory consent and age confirmation (DPDP Act).
 *
 * TODO (before launch): send the application to your hiring inbox.
 * Copy the same email code you used in src/app/api/contact/route.ts (see README section 4).
 */
import { NextResponse, type NextRequest } from "next/server";
import { validateApplication } from "@/lib/validation";
import { roleOptions } from "@/lib/careers";
import { isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

function reply(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  // 1) Only accept requests from our own website.
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
    return reply({ message: "Your application is too large." }, 413);
  }

  // 3) Rate limit (separate counter from the contact form).
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`careers:${ip}`)) {
    return reply({ message: "Too many applications. Please wait a few minutes and try again." }, 429);
  }

  // 4) Read and validate.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply({ message: "Invalid request." }, 400);
  }

  const result = validateApplication(body, roleOptions);
  if (!result.ok) return reply({ message: "Please correct the highlighted fields.", errors: result.errors }, 422);

  // 5) Honeypot: pretend success so bots learn nothing.
  if (result.value.website) return reply({ ok: true });

  // 6) Do something with the application.
  // In production we do NOT log personal details (data minimisation).
  if (process.env.NODE_ENV !== "production") {
    const { website, consent, adult, ...application } = result.value;
    void website;
    void consent;
    void adult;
    console.log("[careers form] New application:", application);
  }
  // Replace the block above with an email call (see README.md).

  return reply({ ok: true });
}
