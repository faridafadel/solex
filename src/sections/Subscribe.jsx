import { useState } from "react";
import Button from "./Button";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const msgLen = (s) => s.trim().length;

const inputBase =
  "w-full rounded-2xl border bg-white py-3.5 pl-11 pr-4 font-montserrat text-base text-primary placeholder:text-slate-400 transition outline-none focus:border-coral-blue focus:ring-4 focus:ring-coral-blue/15 min-h-[52px]";
const textareaBase =
  "w-full rounded-2xl border bg-white px-4 py-3.5 font-montserrat text-base text-primary placeholder:text-slate-400 transition outline-none focus:border-coral-blue focus:ring-4 focus:ring-coral-blue/15 resize-y min-h-[160px]";
const inputOk = "border-slate-200 hover:border-slate-300";
const inputErr =
  "border-red-400 focus:border-red-500 focus:ring-red-500/15 hover:border-red-400";

const FieldIcon = ({ children }) => (
  <span
    className="pointer-events-none absolute left-3.5 top-1/2 z-[1] -translate-y-1/2 text-slate-400"
    aria-hidden
  >
    {children}
  </span>
);

const Subscribe = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!values.name.trim()) {
      validationErrors.name = "Please enter your name.";
    }

    if (!values.email.trim()) {
      validationErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!values.message.trim()) {
      validationErrors.message = "Please tell us how we can help.";
    } else if (values.message.trim().length < 10) {
      validationErrors.message = "Message must be at least 10 characters.";
    }

    return validationErrors;
  };

  const submitContact = async (payload) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (!navigator.onLine) {
      throw new Error("You appear to be offline. Please try again.");
    }

    return payload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    setStatus({ type: "", message: "" });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContact(values);
      setValues(initialValues);
      setErrors({});
      setStatus({
        type: "success",
        message: "Thanks! Your message has been sent successfully.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message || "Something went wrong while sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-us" className="max-container">
      <div className="relative overflow-hidden rounded-[36px] border border-[#5a1111]/20 bg-gradient-to-br from-[#1f0608] via-[#2b0a0d] to-[#120305] px-5 py-8 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)] sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#c22626]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-16 h-72 w-72 rounded-full bg-[#7a1616]/20 blur-3xl" />

        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-12 xl:gap-20">
        <div className="flex flex-col justify-center gap-6 lg:max-w-md xl:max-w-lg">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 font-montserrat text-sm font-medium text-white">
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-[#ff8e8e]"
              aria-hidden
            />
            We typically reply within one business day
          </p>
          <div>
            <h3 className="font-palanquin text-4xl font-bold leading-tight text-white lg:text-[52px] lg:leading-[1.08]">
              Contact <span className="text-[#ff8e8e]">Us</span>
            </h3>
            <p className="mt-4 font-montserrat text-lg leading-relaxed text-white/80">
              Have a question about products or orders? Send us a message and
              our team will get back to you.
            </p>
          </div>
          <dl className="hidden gap-6 border-l-2 border-white/25 pl-5 font-montserrat sm:grid sm:grid-cols-1">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/65">
                Orders & shipping
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-white">
                Tracking, exchanges, and delivery questions
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-white/65">
                Product guidance
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-white">
                Sizing, availability, and recommendations
              </dd>
            </div>
          </dl>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <p className="font-montserrat text-xs font-semibold uppercase tracking-wide text-white/70">
                Email support
              </p>
              <a
                href="mailto:support@solex.com"
                className="mt-1 inline-block font-montserrat text-sm font-semibold text-white transition hover:text-[#ffc0c0]"
              >
                support@solex.com
              </a>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-sm backdrop-blur">
              <p className="font-montserrat text-xs font-semibold uppercase tracking-wide text-white/70">
                Support hours
              </p>
              <p className="mt-1 font-montserrat text-sm text-white">
                Mon - Fri, 9:00 - 18:00
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex-1 overflow-hidden rounded-[28px] border border-white/35 bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.85)]">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d14141]/12"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-[#801717]/10"
            aria-hidden
          />

          <form
            onSubmit={handleSubmit}
            noValidate
            className="relative grid gap-8 p-6 sm:p-8 lg:p-10"
          >
            <div className="border-b border-slate-200 pb-6">
              <h4 className="font-palanquin text-2xl font-bold text-primary sm:text-[26px]">
                Send a message
              </h4>
              <p className="mt-2 max-w-xl font-montserrat text-sm leading-relaxed text-slate-gray">
                Share a few details so we can route your note to the right team.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-name"
                  className="font-montserrat text-sm font-semibold text-primary"
                >
                  Name
                </label>
                <div className="relative">
                  <FieldIcon>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </FieldIcon>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                  />
                </div>
                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="font-montserrat text-sm text-red-600"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-email"
                  className="font-montserrat text-sm font-semibold text-primary"
                >
                  Email
                </label>
                <div className="relative">
                  <FieldIcon>
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  </FieldIcon>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                  />
                </div>
                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="font-montserrat text-sm text-red-600"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="font-montserrat text-sm font-semibold text-primary"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={values.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us how we can help…"
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={
                  errors.message ? "contact-message-error" : undefined
                }
                className={`${textareaBase} ${errors.message ? inputErr : inputOk}`}
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                {errors.message ? (
                  <p
                    id="contact-message-error"
                    className="font-montserrat text-sm text-red-600"
                  >
                    {errors.message}
                  </p>
                ) : (
                  <span className="font-montserrat text-xs text-slate-gray">
                    Minimum 10 characters
                  </span>
                )}
                <span
                  className={`font-montserrat text-xs tabular-nums ${
                    msgLen(values.message) >= 10
                      ? "font-medium text-emerald-700"
                      : "text-slate-gray"
                  }`}
                  aria-live="polite"
                >
                  {msgLen(values.message)} / 10+
                </span>
              </div>
            </div>

            {status.message && (
              <div
                role="status"
                className={`rounded-2xl border px-4 py-3 font-montserrat text-sm leading-relaxed ${
                  status.type === "error"
                    ? "border-red-200 bg-red-50 text-red-800"
                    : "border-emerald-200 bg-emerald-50 text-emerald-900"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <Button
                type="submit"
                label={isSubmitting ? "Sending…" : "Send message"}
                disabled={isSubmitting}
                loading={isSubmitting}
                className="w-full sm:w-auto sm:min-w-[220px] shadow-lg shadow-[#8B0000]/25"
              />
              <p className="text-center font-montserrat text-xs leading-relaxed text-slate-gray sm:max-w-[220px] sm:text-left">
                By sending, you agree we may respond via email.
              </p>
            </div>
          </form>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Subscribe;
