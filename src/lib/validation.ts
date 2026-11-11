/**
 * validation.ts  -  Rules for the contact form.
 *
 * The SAME function is used in two places:
 *   1. In the browser (to show friendly errors immediately)
 *   2. On the server (the real protection - never trust the browser!)
 */
export const SERVICE_OPTIONS = [
  "Custom software",
  "Website development",
  "E-commerce store",
  "AI or machine learning project",
  "Business automation",
  "Cloud, security or support",
  "Something else",
] as const;

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
  /** Hidden "honeypot" field. Real people never fill it, spam bots do. */
  website: string;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

export type ValidationResult =
  | { ok: true; value: ContactPayload }
  | { ok: false; errors: FieldErrors };

// Removes invisible control characters that can be used to trick systems.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function clean(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_CHARS, "").trim().slice(0, maxLength);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s\-()]{7,18}$/;

export function validateContact(input: unknown): ValidationResult {
  const data = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;

  const value: ContactPayload = {
    name: clean(data.name, 80),
    email: clean(data.email, 120).toLowerCase(),
    phone: clean(data.phone, 20),
    company: clean(data.company, 100),
    service: clean(data.service, 60),
    message: clean(data.message, 2000),
    consent: data.consent === true,
    website: clean(data.website, 100),
  };

  const errors: FieldErrors = {};

  if (value.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_PATTERN.test(value.email)) errors.email = "Please enter a valid email address.";
  if (value.phone && !PHONE_PATTERN.test(value.phone)) errors.phone = "Please enter a valid phone number.";
  if (!(SERVICE_OPTIONS as readonly string[]).includes(value.service)) errors.service = "Please choose what you need.";
  if (value.message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  // DPDP Act: consent must be a clear, active choice by the person.
  if (!value.consent) errors.consent = "Please tick the box so we may contact you about your enquiry.";

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, value };
}
