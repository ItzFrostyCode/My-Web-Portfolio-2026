"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { socials } from "@/content/socials";

export function Contact() {
  const contactInfo = [
    {
      label: "WRITE TO",
      value: "itzjoshuawayman@gmail.com",
      href: "mailto:itzjoshuawayman@gmail.com",
    },
    {
      label: "GITHUB",
      value: "@ItzFrostyCode",
      href: "https://github.com/ItzFrostyCode",
    },
    {
      label: "FACEBOOK",
      value: "joshua.a.arabejo",
      href: "https://www.facebook.com/joshua.a.arabejo",
    },
    {
      label: "YOUTUBE",
      value: "@joshuaarabejodrums5441",
      href: "https://www.youtube.com/@joshuaarabejodrums5441",
    },
    {
      label: "INSTAGRAM",
      value: "@itzjosh.04",
      href: "https://www.instagram.com/itzjosh.04/",
    },
    {
      label: "LOCATION",
      value: "Davao City, PH",
      href: "#",
    },
    {
      label: "CURRENT STATUS",
      value: "Open to opportunities",
      href: "#",
    },
  ];

  return (
    <>
      <section id="contact" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-44">
          {/* Contact Layout - Two Column */}
          <motion.div
            className="grid gap-12 lg:grid-cols-2 lg:gap-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            {/* Left: Message */}
            <div className="flex flex-col justify-center">
              <p className="eyebrow mb-4">LET'S CONNECT</p>
              <h3 className="display leading-[1.05]! text-4xl text-cream sm:text-6xl lg:text-7xl">
                Got a project in mind or an opportunity to share? Let&apos;s talk!
              </h3>
              <p className="mt-6 max-w-md text-base text-cream-dim sm:text-lg leading-relaxed">
                Whether you need a full-stack web application, custom desktop management software, or just want to discuss code and ideas, I&apos;m always happy to connect and collaborate!
              </p>

              <div className="mt-8 flex items-center gap-2 font-mono text-xs text-emerald-glow">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-glow opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-glow" />
                </span>
                <span>Fast Email Response (Usually within 24 hours)</span>
              </div>
            </div>

            {/* Right: Contact Info Table */}
            <div className="space-y-4 border-l border-line pl-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center justify-between border-b border-line/30 py-4 transition-colors hover:border-line"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
                >
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
                      {item.label}
                    </p>
                    <p className="mt-1 text-cream transition-colors group-hover:text-emerald-glow">
                      {item.value}
                    </p>
                  </div>
                  <ExternalLink
                    size={18}
                    className="flex-shrink-0 text-cream-dim transition-all group-hover:text-emerald-glow group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
          <p className="font-mono text-xs uppercase tracking-widest text-cream-dim">
            © {new Date().getFullYear()} Joshua Wayman A. Arabejo · ItzFrostyCode · v3
          </p>
          <nav aria-label="Social links">
            <ul className="flex flex-wrap gap-6">
              {socials.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="font-mono text-xs uppercase tracking-widest text-cream-dim transition-colors hover:text-emerald-glow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
