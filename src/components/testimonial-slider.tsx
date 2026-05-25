"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";

export function TestimonialSlider() {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  const t = testimonials[idx];

  return (
    <div className="relative max-w-2xl mx-auto text-center px-12">
      <div className="flex justify-center gap-1 mb-4">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="font-display text-xl md:text-2xl italic font-light text-[var(--siliq-graphite)] leading-relaxed mb-6">
        &ldquo;{t.text}&rdquo;
      </p>
      <p className="text-sm font-medium">{t.name}</p>
      <p className="text-xs text-[var(--siliq-accent)]">{t.location}</p>

      <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[var(--siliq-line)] hover:border-[var(--siliq-black)] transition-colors" aria-label="Previous">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-[var(--siliq-line)] hover:border-[var(--siliq-black)] transition-colors" aria-label="Next">
        <ChevronRight className="w-4 h-4" />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-[var(--siliq-black)]" : "bg-[var(--siliq-line)]"}`} aria-label={`Testimonial ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
