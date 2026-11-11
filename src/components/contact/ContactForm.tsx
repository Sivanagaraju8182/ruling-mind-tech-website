"use client";

/**
 * ContactForm.tsx  -  The enquiry form on the Contact page.
 *
 * Flow: visitor fills form -> we check it in the browser -> send to /api/contact
 * -> the server checks it AGAIN (never trust the browser) -> success message.
 *
 * DPDP Act: the consent tick-box is NOT pre-ticked, and we say exactly why we
 * collect the data and where to read more.
 */
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { SERVICE_OPTIONS, validateContact, type FieldErrors } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "mt-2 w-full border border-jade-100/25 bg-ink-950/60 px-4 py-3.5 text-jade-50 placeholder:text-jade-100/40 transition-colors focus:border-gold-400 focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-red-300">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""), // honeypot
    };

    // 1) Check in the browser first.
    const result = validateContact(payload);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("sending");

    // 2) Send to our own server.
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });
      const data = (await response.json().catch(() => ({}))) as { message?: string; errors?: FieldErrors };

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setServerMessage(data.message ?? "Something went wrong. Please try again in a moment.");
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setServerMessage("We could not reach the server. Please check your internet connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="crest border border-gold-500/40 bg-ink-800/70 p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold-400" aria-hidden="true" />
        <h2 className="mt-5 text-3xl font-semibold text-jade-50">Message received</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-jade-100/80">Thank you. A member of our team will reply within one working day.</p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="crest border border-gold-500/25 bg-ink-800/70 p-7 sm:p-10">
      <h2 className="text-3xl font-semibold text-jade-50">Tell us about your project</h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-jade-100">
            Full name
          </label>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={80} aria-invalid={!!errors.name} aria-describedby="name-error" className={fieldClass} />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-jade-100">
            Email address
          </label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={120} aria-invalid={!!errors.email} aria-describedby="email-error" className={fieldClass} />
          <FieldError id="email-error" message={errors.email} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-jade-100">
            Phone (optional)
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={20} aria-invalid={!!errors.phone} aria-describedby="phone-error" className={fieldClass} />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium text-jade-100">
            Company (optional)
          </label>
          <input id="company" name="company" type="text" autoComplete="organization" maxLength={100} className={fieldClass} />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="service" className="text-sm font-medium text-jade-100">
          What do you need?
        </label>
        <select id="service" name="service" defaultValue="" aria-invalid={!!errors.service} aria-describedby="service-error" className={cn(fieldClass, "appearance-none")}>
          <option value="" disabled>
            Choose a service
          </option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-ink-900">
              {option}
            </option>
          ))}
        </select>
        <FieldError id="service-error" message={errors.service} />
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="text-sm font-medium text-jade-100">
          Your message
        </label>
        <textarea id="message" name="message" rows={5} maxLength={2000} aria-invalid={!!errors.message} aria-describedby="message-error" className={fieldClass} />
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Honeypot: hidden from people, visible to bots. If filled, the server ignores the message. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* DPDP Act: clear, specific, un-ticked consent */}
      <div className="mt-6">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-jade-100/85">
          <input type="checkbox" name="consent" aria-describedby="consent-error" className="mt-1 h-5 w-5 shrink-0 accent-[#C9A24B]" />
          <span>
            I agree that Ruling Mind Tech may use my name, email, phone and message only to reply to this enquiry. I can withdraw this consent at any time by emailing the address in the{" "}
            <Link href="/privacy-policy" className="text-gold-300 underline underline-offset-4">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent} />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {serverMessage}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"} className="mt-8 w-full sm:w-auto">
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
