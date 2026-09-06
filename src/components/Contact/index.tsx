"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialRow } from "@/components/ui/SocialRow";
import { ContactForm } from "./ContactForm";
import { site } from "@/data/site";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — invitation */}
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="06 — Contact"
              title="Let's build something great"
              description="Have an idea, a project, or just want to say hi? I'm always open to interesting problems and good conversations."
            />

            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex items-center gap-3 text-ink transition-colors hover:text-cyan-glow"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
                  <Mail size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-ink-faint">Email</span>
                  <span className="text-sm">{site.email}</span>
                </span>
              </a>

              <div className="inline-flex items-center gap-3 text-ink-muted">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
                  <MapPin size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs uppercase tracking-wide text-ink-faint">Location</span>
                  <span className="text-sm">{site.location}</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-wide text-ink-faint">Find me on</span>
              <SocialRow variant="detailed" />
            </div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="gradient-ring rounded-3xl glass p-6 sm:p-8"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
