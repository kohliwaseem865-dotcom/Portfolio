"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!emailRegex.test(values.email)) errors.email = "That email doesn't look right.";
  if (!values.message.trim()) errors.message = "Please add a message.";
  else if (values.message.trim().length < 10)
    errors.message = "A little more detail helps (10+ characters).";
  return errors;
}

/**
 * A validated contact form. With no backend to expose, submitting composes a
 * pre-filled email via the user's mail client (mailto) — no API keys anywhere.
 * To wire a real backend later, replace `handleSubmit` with a fetch() to your
 * own API route or form service (keep secrets server-side).
 */
export function ContactForm() {
  const [values, setValues] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof FormState) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name}\n${values.email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const fieldClass = (field: keyof FormState) =>
    cn(
      "w-full rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-ink outline-none ring-1 transition-all duration-200 placeholder:text-ink-faint",
      errors[field] && touched[field]
        ? "ring-red-500/50 focus:ring-red-500/70"
        : "ring-white/10 focus:ring-cyan-glow/50",
    );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={update("name")}
          onBlur={blur("name")}
          placeholder="Your name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name && touched.name)}
          className={fieldClass("name")}
        />
        <FieldError message={touched.name ? errors.name : undefined} />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={update("email")}
          onBlur={blur("email")}
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email && touched.email)}
          className={fieldClass("email")}
        />
        <FieldError message={touched.email ? errors.email : undefined} />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Message
        </label>
        <textarea
          id="message"
          value={values.message}
          onChange={update("message")}
          onBlur={blur("message")}
          placeholder="Tell me about your project or idea…"
          rows={5}
          aria-invalid={Boolean(errors.message && touched.message)}
          className={cn(fieldClass("message"), "resize-none")}
        />
        <FieldError message={touched.message ? errors.message : undefined} />
      </div>

      <button
        type="submit"
        data-cursor="hover"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-cyan-glow px-6 py-3.5 text-sm font-medium text-base-950 transition-shadow duration-300 hover:shadow-glow"
      >
        <Send size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        Send Message
      </button>

      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-emerald-400"
          >
            <CheckCircle2 size={16} />
            Opening your email app — thanks for reaching out!
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.span
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex items-center gap-1.5 text-xs text-red-400"
        >
          <AlertCircle size={13} />
          {message}
        </motion.span>
      ) : null}
    </AnimatePresence>
  );
}
