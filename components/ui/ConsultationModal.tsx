"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Calendar, CheckCircle2, Sparkles } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  projectName = "",
}: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "Full-Stack Web Application",
    message: projectName ? `Hi Joshua, I'm interested in discussing a project similar to ${projectName}.` : "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-ink/85 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full rounded-3xl border border-emerald-glow/40 bg-ink-soft p-6 sm:p-10 shadow-2xl space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-ink text-cream-dim transition-colors hover:border-emerald-glow hover:text-cream"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-glow/30 bg-emerald-deep/20 px-3 py-1 font-mono text-xs uppercase tracking-wider text-emerald-glow">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Consultation &amp; Project Inquiry</span>
                </div>
                <h3 className="display text-2xl sm:text-3xl text-cream">
                  {projectName ? `Discuss ${projectName}` : "Schedule a Consultation"}
                </h3>
                <p className="text-xs sm:text-sm text-cream-dim leading-relaxed">
                  Fill out this quick form and I&apos;ll get back to you within 24 hours with project scope estimates and technical recommendations.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block font-mono text-xs uppercase text-cream-dim mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maria Santos"
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-xs sm:text-sm text-cream focus:border-emerald-glow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-cream-dim mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="maria@company.com"
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-xs sm:text-sm text-cream focus:border-emerald-glow focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-cream-dim mb-1">
                    Service Needed
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-xs sm:text-sm text-cream focus:border-emerald-glow focus:outline-none"
                  >
                    <option>Full-Stack Web Application</option>
                    <option>Custom Management System / Desktop App</option>
                    <option>UI/UX Design &amp; Wireframing</option>
                    <option>Full-Time / Associate Hire Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase text-cream-dim mb-1">
                    Project Details / Message
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me a bit about your goals, timeline, or requirements..."
                    className="w-full rounded-xl border border-line bg-ink px-4 py-2.5 text-xs sm:text-sm text-cream focus:border-emerald-glow focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-emerald-glow px-6 py-3 font-mono text-xs font-bold text-ink uppercase tracking-wider transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send className="h-4 w-4" />
                <span>Send Inquiry</span>
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-glow/20 text-emerald-glow">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h4 className="display text-2xl text-cream">Inquiry Received!</h4>
              <p className="text-xs sm:text-sm text-cream-dim max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, <span className="text-cream font-semibold">{formData.name}</span>! I&apos;ve received your request for <span className="text-emerald-glow">{formData.serviceType}</span> and will reply to <span className="text-cream font-semibold">{formData.email}</span> shortly.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
