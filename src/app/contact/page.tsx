"use client";
import { useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Mail, Phone, MapPin, Clock, Globe, ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { QuickMessage } from "@/components/quick-message";
import { CardCanvas, Card } from "@/components/ui/animated-glow-card";

const faqs = [
  { q: "How long does shipping take?", a: "We dispatch within 2 business days. Delivery takes 3-5 days within India, 7-14 days internationally." },
  { q: "Is your silver real 925?", a: "Yes. Every SILIQ piece is solid 925 sterling silver, BIS hallmarked and comes with an authenticity card." },
  { q: "Can I shower or sleep with my jewellery?", a: "Yes — our pieces are rhodium-plated for tarnish resistance. However, avoid prolonged exposure to chlorine, perfume, or harsh chemicals." },
  { q: "How do I track my order?", a: "Once shipped, you'll receive a tracking link via email and WhatsApp. You can also check status on our Track Order page." },
  { q: "Can I return a custom piece?", a: "Custom and engraved pieces are final sale. All other items can be returned within 7 days in original packaging." },
  { q: "Do you offer gift wrapping?", a: "Every order comes in our signature linen pouch and recycled paper box — gift-ready at no extra cost." },
  { q: "How do I use my WELCOME10 code?", a: "Create an account, then enter WELCOME10 at checkout. It's a one-time 10% discount for new customers." },
  { q: "Will my silver tarnish?", a: "All sterling silver can tarnish over time — it's natural. Store in the SILIQ pouch and wipe after wear to keep it bright." },
  { q: "Do you ship internationally?", a: "Yes. We ship worldwide. International orders take 7-14 business days. Customs duties are the buyer's responsibility." },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ firstName: "", email: "", phone: "", subject: "General Inquiry", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useStore();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^\+?[\d\s-]{10,}$/.test(form.phone)) errs.phone = "Enter a valid phone number";
    if (!form.message.trim()) errs.message = "Message is required";
    else if (form.message.trim().split(/\s+/).length < 10) errs.message = "Message must be at least 10 words";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } catch {}
    showToast("Message sent! We'll get back to you within 24 hours.");
    setForm({ firstName: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    setErrors({});
    setSubmitting(false);
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <AuroraBackground variant="dark" intensity="normal" className="bg-[var(--siliq-black)]">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0"><SparklesCore id="contact-sparkles" background="transparent" minSize={0.4} maxSize={1.2} particleDensity={60} className="w-full h-full" particleColor="#C0C0C0" speed={0.8} /></div>
          <div className="relative z-10 text-center px-6">
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--siliq-silver)] mb-4">Get In Touch</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">Contact Us</h1>
          </div>
        </section>
      </AuroraBackground>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-3xl font-light mb-8">Let&apos;s Connect</h2>
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "support@siliq.co", href: "mailto:support@siliq.co" },
                { icon: Phone, label: "WhatsApp", value: "+91 89548 49236", href: "https://wa.me/918954849236" },
                { icon: MapPin, label: "Studio", value: "Vogen International Private Limited, Ghaziabad, India" },
                { icon: Clock, label: "Hours", value: "Mon — Sat, 10:00 — 19:00 IST" },
                { icon: Globe, label: "Instagram", value: "@siliq.co", href: "https://instagram.com/siliq.co" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4">
                  <c.icon className="w-5 h-5 text-[var(--siliq-accent)] mt-0.5 shrink-0" strokeWidth={1.5} />
                  <div>
                    <p className="text-xs font-medium tracking-[0.15em] uppercase mb-1">{c.label}</p>
                    {c.href ? <a href={c.href} className="text-sm text-[var(--siliq-graphite)] hover:text-[var(--siliq-black)]">{c.value}</a> : <p className="text-sm text-[var(--siliq-graphite)]">{c.value}</p>}
                  </div>
                </div>
              ))}
            </div>

            <CardCanvas className="mt-10 w-full">
              <Card className="w-full h-[350px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83923192776!2d77.06889754725782!3d28.52758200617607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30c87cc03f!2sGhaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SILIQ Studio Location"
                />
              </Card>
            </CardCanvas>

            {/* Quick Message — alternative to full form */}
            <div className="mt-8 relative z-20">
              <p className="text-xs text-[var(--siliq-accent)] tracking-wider uppercase mb-3">In a hurry?</p>
              <QuickMessage triggerLabel="Send a Quick Message" placeholder="Quick question? Type it here..." />
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-light mb-8">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Name <span className="text-red-500">*</span></label>
                <input type="text" value={form.firstName} onChange={update("firstName")} placeholder="Your full name" className={`w-full px-4 py-3 border bg-transparent text-sm outline-none transition-colors ${errors.firstName ? "border-red-400 focus:border-red-500" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                {errors.firstName && <p className="text-[11px] text-red-500 mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Email <span className="text-red-500">*</span></label>
                <input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" className={`w-full px-4 py-3 border bg-transparent text-sm outline-none transition-colors ${errors.email ? "border-red-400 focus:border-red-500" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Phone <span className="text-red-500">*</span></label>
                <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+91 XXXXX XXXXX" className={`w-full px-4 py-3 border bg-transparent text-sm outline-none transition-colors ${errors.phone ? "border-red-400 focus:border-red-500" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Subject</label>
                <select value={form.subject} onChange={update("subject")} className="w-full px-4 py-3 border border-[var(--siliq-line)] bg-transparent text-sm focus:border-[var(--siliq-black)] outline-none transition-colors">
                  <option>General Inquiry</option>
                  <option>Order Help</option>
                  <option>Returns & Exchange</option>
                  <option>Bulk / Corporate Orders</option>
                  <option>Press / Collaborations</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Message <span className="text-red-500">*</span> <span className="text-[var(--siliq-accent)] font-normal normal-case">(min 10 words)</span></label>
                <textarea rows={5} value={form.message} onChange={update("message")} placeholder="Tell us how we can help you..." className={`w-full px-4 py-3 border bg-transparent text-sm outline-none transition-colors resize-none ${errors.message ? "border-red-400 focus:border-red-500" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                <p className="text-[10px] text-[var(--siliq-accent)] mt-1 text-right">{form.message.trim().split(/\s+/).filter(Boolean).length} / 10 words</p>
              </div>
              <button type="submit" disabled={submitting} className="w-full py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-charcoal)] transition-colors disabled:opacity-60">{submitting ? "Sending..." : "Send Message"}</button>
              <p className="text-[10px] text-[var(--siliq-accent)] text-center">We typically respond within 24 hours.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[var(--siliq-cream)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-center mb-10">Quick Answers</h2>
          <div className="divide-y divide-[var(--siliq-line)] border-y border-[var(--siliq-line)]">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left">
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-[var(--siliq-graphite)] pb-5 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
