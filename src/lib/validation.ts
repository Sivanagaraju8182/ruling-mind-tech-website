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

// =====================================================================
//  CAREERS: job application rules (used by the form AND by /api/careers)
// =====================================================================
export const EXPERIENCE_OPTIONS = ["Fresher (0 years)", "Up to 1 year", "1 to 3 years", "3 to 5 years", "More than 5 years"] as const;

export type ApplicationPayload = {
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  /** Link to resume (Google Drive etc.), portfolio, LinkedIn or GitHub */
  link: string;
  message: string;
  /** Confirms the applicant is 18 or older (DPDP Act: children's data) */
  adult: boolean;
  consent: boolean;
  /** Hidden honeypot field for spam bots */
  website: string;
};

export type ApplicationErrors = Partial<Record<keyof ApplicationPayload, string>>;

export type ApplicationResult = { ok: true; value: ApplicationPayload } | { ok: false; errors: ApplicationErrors };

function isWebLink(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"; // blocks javascript: and other tricks
  } catch {
    return false;
  }
}

export function validateApplication(input: unknown, allowedRoles: readonly string[]): ApplicationResult {
  const data = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;

  const value: ApplicationPayload = {
    name: clean(data.name, 80),
    email: clean(data.email, 120).toLowerCase(),
    phone: clean(data.phone, 20),
    role: clean(data.role, 80),
    experience: clean(data.experience, 40),
    link: clean(data.link, 300),
    message: clean(data.message, 1500),
    adult: data.adult === true,
    consent: data.consent === true,
    website: clean(data.website, 100),
  };

  const errors: ApplicationErrors = {};

  if (value.name.length < 2) errors.name = "Please enter your full name.";
  if (!EMAIL_PATTERN.test(value.email)) errors.email = "Please enter a valid email address.";
  if (!PHONE_PATTERN.test(value.phone)) errors.phone = "Please enter a valid phone number.";
  if (!allowedRoles.includes(value.role)) errors.role = "Please choose a role.";
  if (!(EXPERIENCE_OPTIONS as readonly string[]).includes(value.experience)) errors.experience = "Please choose your experience.";
  if (!isWebLink(value.link)) errors.link = "Please paste a link starting with https:// (resume, portfolio, LinkedIn or GitHub).";
  if (value.message.length < 20) errors.message = "Please tell us a little about yourself (at least 20 characters).";
  if (!value.adult) errors.adult = "You must be 18 years or older to apply.";
  if (!value.consent) errors.consent = "Please tick the box so we may process your application.";

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, value };
}
