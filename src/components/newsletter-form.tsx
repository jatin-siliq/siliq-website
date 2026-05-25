"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";

type Variant = "light" | "dark" | "minimal";

export function NewsletterForm({ variant = "dark" }: { variant?: Variant }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/newsletter`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).catch(() => {});
    showToast("Welcome to SILIQ Circle! Check your email for 10% off.");
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="flex border-b border-[var(--siliq-accent)]">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="flex-1 bg-transparent text-white text-xs py-2 outline-none placeholder:text-[var(--siliq-accent)]" />
        <button type="submit" className="text-[10px] tracking-[0.15em] uppercase text-white pl-2 py-2 hover:opacity-60">{submitted ? "✓" : "→"}</button>
      </form>
    );
  }

  const isDark = variant === "dark";
  return (
    <form onSubmit={handleSubmit} className={`flex max-w-sm mx-auto border-b ${isDark ? "border-[var(--siliq-platinum)]" : "border-[var(--siliq-line)]"}`}>
      <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className={`flex-1 bg-transparent text-sm py-3 outline-none ${isDark ? "text-white placeholder:text-[var(--siliq-accent)]" : "text-[var(--siliq-black)] placeholder:text-[var(--siliq-accent)]"}`} />
      <button type="submit" className={`text-xs tracking-[0.2em] uppercase pl-3 py-3 transition-colors ${isDark ? "text-white hover:text-[var(--siliq-platinum)]" : "text-[var(--siliq-black)] hover:opacity-60"}`}>
        {submitted ? "Subscribed ✓" : "Subscribe →"}
      </button>
    </form>
  );
}
