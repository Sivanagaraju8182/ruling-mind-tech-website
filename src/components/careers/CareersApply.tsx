"use client";

/**
 * CareersApply.tsx  -  "Open positions" list + "Apply" form on the Careers page.
 *
 * They live in ONE component because they share one piece of memory:
 * when a visitor clicks "Apply for this role", the form below pre-selects that role.
 *
 * DPDP Act: the form asks only what we need, has an age confirmation (18+),
 * and a clear, un-ticked consent box that states the purpose and retention period.
 */
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Briefcase, CheckCircle2, Clock, Loader2, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Ornament from "@/components/ui/Ornament";
import { roleOptions, roles } from "@/lib/careers";
import { EXPERIENCE_OPTIONS, validateApplication, type ApplicationErrors } from "@/lib/validation";
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

export default function CareersApply() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  function applyFor(title: string) {
    setSelectedRole(title);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      role: selectedRole,
      experience: String(data.get("experience") ?? ""),
      link: String(data.get("link") ?? ""),
      message: String(data.get("message") ?? ""),
      adult: data.get("adult") === "on",
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""), // honeypot
    };

    const result = validateApplication(payload, roleOptions);
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });
      const body = (await response.json().catch(() => ({}))) as { message?: string; errors?: ApplicationErrors };
      if (!response.ok) {
        if (body.errors) setErrors(body.errors);
        setServerMessage(body.message ?? "Something went wrong. Please try again in a moment.");
        setStatus("error");
        return;
      }
      form.reset();
      setSelectedRole("");
      setStatus("success");
    } catch {
      setServerMessage("We could not reach the server. Please check your internet connection and try again.");
      setStatus("error");
    }
  }

  return (
    <>
      {/* ---------------- OPEN POSITIONS ---------------- */}
      <section id="open-roles" className="lattice-light scroll-mt-20 bg-jade-100 py-24 text-ink-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">Open positions</h2>
            <Ornament className="mt-6 justify-center" />
            <p className="mt-6 text-lg leading-relaxed text-ink-800/80">
              Do not see a perfect match? Choose &quot;General application&quot; in the form below. We read every application and keep talented people in mind for future roles.
            </p>
          </div>

          <ul className="mt-16 grid gap-6 lg:grid-cols-2">
            {roles.map((role) => (
              <li key={role.slug} id={role.slug} className="crest scroll-mt-24 flex flex-col border border-ink-800/20 bg-white p-8">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-800/75">
                  <span className="bg-ink-800 px-3 py-1 font-medium text-gold-300">{role.type}</span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gold-600" aria-hidden="true" />
                    {role.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold-600" aria-hidden="true" />
                    {role.experience}
                  </span>
                </div>
                <h3 className="mt-5 text-3xl font-semibold">{role.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-800/80">{role.summary}</p>

                <h4 className="mt-6 text-lg font-semibold">What you will do</h4>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-ink-800/85">
                  {role.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Skills">
                  {role.skills.map((skill) => (
                    <li key={skill} className="border border-ink-800/25 px-3 py-1 text-sm text-ink-800">
                      {skill}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-2">
                  <Button variant="dark" onClick={() => applyFor(role.title)}>
                    Apply for this role
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- APPLICATION FORM ---------------- */}
      <section id="apply" className="lattice relative scroll-mt-20 overflow-hidden bg-ink-950 py-24">
        <div className="pointer-events-none absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-plum-700/30 blur-[130px]" />
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-semibold leading-tight text-jade-50 sm:text-5xl">Apply now</h2>
            <Ornament className="mt-6 justify-center" />
            <p className="mt-6 text-lg leading-relaxed text-jade-100/75">Takes about five minutes. Share a link to your resume or portfolio and tell us a little about yourself.</p>
          </div>

          {status === "success" ? (
            <div role="status" className="crest mt-12 border border-gold-500/40 bg-ink-800/70 p-10 text-center">
              <CheckCircle2 className="mx-auto h-14 w-14 text-gold-400" aria-hidden="true" />
              <h3 className="mt-5 text-3xl font-semibold text-jade-50">Application received</h3>
              <p className="mx-auto mt-3 max-w-md leading-relaxed text-jade-100/80">Thank you for your interest in Ruling Mind Tech. Our team will review your application and get back to you by email.</p>
              <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
                Submit another application
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="crest relative mt-12 border border-gold-500/25 bg-ink-800/70 p-7 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="text-sm font-medium text-jade-100">
                    Full name
                  </label>
                  <input id="c-name" name="name" type="text" autoComplete="name" maxLength={80} aria-invalid={!!errors.name} aria-describedby="c-name-error" className={fieldClass} />
                  <FieldError id="c-name-error" message={errors.name} />
                </div>
                <div>
                  <label htmlFor="c-email" className="text-sm font-medium text-jade-100">
                    Email address
                  </label>
                  <input id="c-email" name="email" type="email" autoComplete="email" maxLength={120} aria-invalid={!!errors.email} aria-describedby="c-email-error" className={fieldClass} />
                  <FieldError id="c-email-error" message={errors.email} />
                </div>
                <div>
                  <label htmlFor="c-phone" className="text-sm font-medium text-jade-100">
                    Phone number
                  </label>
                  <input id="c-phone" name="phone" type="tel" autoComplete="tel" maxLength={20} aria-invalid={!!errors.phone} aria-describedby="c-phone-error" className={fieldClass} />
                  <FieldError id="c-phone-error" message={errors.phone} />
                </div>
                <div>
                  <label htmlFor="c-experience" className="text-sm font-medium text-jade-100">
                    Experience
                  </label>
                  <select id="c-experience" name="experience" defaultValue="" aria-invalid={!!errors.experience} aria-describedby="c-experience-error" className={cn(fieldClass, "appearance-none")}>
                    <option value="" disabled>
                      Choose your experience
                    </option>
                    {EXPERIENCE_OPTIONS.map((option) => (
                      <option key={option} value={option} className="bg-ink-900">
                        {option}
                      </option>
                    ))}
                  </select>
                  <FieldError id="c-experience-error" message={errors.experience} />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="c-role" className="text-sm font-medium text-jade-100">
                  Role you are applying for
                </label>
                <select
                  id="c-role"
                  value={selectedRole}
                  onChange={(event) => setSelectedRole(event.target.value)}
                  aria-invalid={!!errors.role}
                  aria-describedby="c-role-error"
                  className={cn(fieldClass, "appearance-none")}
                >
                  <option value="" disabled>
                    Choose a role
                  </option>
                  {roleOptions.map((option) => (
                    <option key={option} value={option} className="bg-ink-900">
                      {option}
                    </option>
                  ))}
                </select>
                <FieldError id="c-role-error" message={errors.role} />
              </div>

              <div className="mt-6">
                <label htmlFor="c-link" className="text-sm font-medium text-jade-100">
                  Link to your resume or portfolio
                </label>
                <input
                  id="c-link"
                  name="link"
                  type="url"
                  inputMode="url"
                  maxLength={300}
                  placeholder="https://drive.google.com/... or LinkedIn / GitHub link"
                  aria-invalid={!!errors.link}
                  aria-describedby="c-link-error c-link-help"
                  className={fieldClass}
                />
                <p id="c-link-help" className="mt-2 text-sm text-jade-100/55">
                  Upload your resume to Google Drive, set sharing to &quot;Anyone with the link can view&quot;, and paste the link here.
                </p>
                <FieldError id="c-link-error" message={errors.link} />
              </div>

              <div className="mt-6">
                <label htmlFor="c-message" className="text-sm font-medium text-jade-100">
                  Tell us about yourself and why you want to join us
                </label>
                <textarea id="c-message" name="message" rows={5} maxLength={1500} aria-invalid={!!errors.message} aria-describedby="c-message-error" className={fieldClass} />
                <FieldError id="c-message-error" message={errors.message} />
              </div>

              {/* Honeypot for spam bots */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="c-website">Leave this field empty</label>
                <input id="c-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-jade-100/85">
                    <input type="checkbox" name="adult" aria-describedby="c-adult-error" className="mt-1 h-5 w-5 shrink-0 accent-[#C9A24B]" />
                    <span>I confirm that I am 18 years of age or older.</span>
                  </label>
                  <FieldError id="c-adult-error" message={errors.adult} />
                </div>
                <div>
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-jade-100/85">
                    <input type="checkbox" name="consent" aria-describedby="c-consent-error" className="mt-1 h-5 w-5 shrink-0 accent-[#C9A24B]" />
                    <span>
                      I agree that Ruling Mind Tech may use the details above only to assess my application and contact me about this and future suitable roles. My application will be kept for up to 12
                      months unless I ask for earlier deletion, and I can withdraw this consent at any time. See the{" "}
                      <Link href="/privacy-policy" className="text-gold-300 underline underline-offset-4">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                  <FieldError id="c-consent-error" message={errors.consent} />
                </div>
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
                  <>
                    <Briefcase className="h-4 w-4" aria-hidden="true" /> Submit application
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
