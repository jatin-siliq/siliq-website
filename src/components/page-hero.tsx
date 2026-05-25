"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Image from "next/image";

interface PageHeroProps {
  label?: string;
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  variant?: "light" | "dark";
}

/**
 * PageHero — branded hero section with aurora and optional background image.
 * Used on text-heavy pages (FAQ, Care Guide, Policies, etc.) to create
 * visual interest and consistency across the site.
 */
export function PageHero({ label, title, subtitle, image, imageAlt, variant = "dark" }: PageHeroProps) {
  if (image) {
    return (
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <Image src={image} alt={imageAlt || title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55" />
        <AuroraBackground variant="dark" intensity="subtle" className="absolute inset-0">
          <div className="h-full" />
        </AuroraBackground>
        <div className="relative z-10 text-center px-6 text-white">
          {label && <p className="text-xs tracking-[0.4em] uppercase text-[var(--siliq-platinum)] mb-3">{label}</p>}
          <h1 className="font-display text-4xl md:text-6xl font-light">{title}</h1>
          {subtitle && <p className="font-display text-lg italic text-[var(--siliq-platinum)] mt-3 max-w-md mx-auto">{subtitle}</p>}
        </div>
      </section>
    );
  }

  if (variant === "dark") {
    return (
      <AuroraBackground variant="dark" intensity="normal" className="bg-[var(--siliq-black)]">
        <section className="py-16 md:py-20 text-center px-6">
          {label && <p className="text-xs tracking-[0.4em] uppercase text-[var(--siliq-platinum)] mb-3">{label}</p>}
          <h1 className="font-display text-4xl md:text-6xl font-light text-white">{title}</h1>
          {subtitle && <p className="font-display text-lg italic text-[var(--siliq-platinum)] mt-3 max-w-md mx-auto">{subtitle}</p>}
        </section>
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground variant="light" intensity="subtle" className="bg-[var(--siliq-cream)]">
      <section className="py-16 md:py-20 text-center px-6">
        {label && <p className="text-xs tracking-[0.4em] uppercase text-[var(--siliq-accent)] mb-3">{label}</p>}
        <h1 className="font-display text-4xl md:text-6xl font-light">{title}</h1>
        {subtitle && <p className="font-display text-lg italic text-[var(--siliq-graphite)] mt-3 max-w-md mx-auto">{subtitle}</p>}
        <div className="w-14 h-px bg-[var(--siliq-black)] mx-auto mt-6" />
      </section>
    </AuroraBackground>
  );
}
