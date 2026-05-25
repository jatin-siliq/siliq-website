"use client";
import { SparklesCore } from "@/components/ui/sparkles";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/section-header";
import { MotionSection } from "@/components/motion-section";
import Image from "next/image";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <AuroraBackground variant="dark" intensity="normal" className="bg-[var(--siliq-black)]">
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0"><SparklesCore id="about-sparkles" background="transparent" minSize={0.4} maxSize={1.2} particleDensity={60} className="w-full h-full" particleColor="#C0C0C0" speed={0.8} /></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center px-6"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--siliq-silver)] mb-4">About SILIQ</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">Minimalist Silver<br />for Everyday</h1>
            <p className="font-display text-lg italic text-[var(--siliq-platinum)] mt-4 max-w-lg mx-auto">Designed to be worn daily. Crafted to last forever.</p>
          </motion.div>
        </section>
      </AuroraBackground>

      {/* Vision */}
      <MotionSection>
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/5] bg-[var(--siliq-platinum)] overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=1000&fit=crop" alt="SILIQ minimalist silver" width={800} height={1000} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-medium tracking-[0.4em] uppercase text-[var(--siliq-accent)] mb-3">Who We Are</p>
              <h2 className="font-display text-4xl font-light mb-6">Silver that fits your life</h2>
              <div className="w-14 h-px bg-[var(--siliq-black)] mb-8" />
              <p className="text-sm leading-relaxed text-[var(--siliq-graphite)] mb-4">SILIQ is a minimalist jewellery brand focused on one thing: creating 925 sterling silver pieces you never want to take off. No trends, no excess — just clean lines, quiet elegance, and everyday wearability.</p>
              <p className="text-sm leading-relaxed text-[var(--siliq-graphite)] mb-4">We believe jewellery shouldn&apos;t demand attention. It should complement who you already are — whether you&apos;re at your desk, on a coffee run, or out for the evening.</p>
              <p className="text-sm leading-relaxed text-[var(--siliq-graphite)]">Every piece is BIS hallmarked, hypoallergenic, and designed to be worn 24/7 without worry.</p>
            </div>
          </div>
        </section>
      </MotionSection>

      {/* Philosophy */}
      <MotionSection>
        <section className="py-24 px-6 bg-[var(--siliq-cream)]">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-medium tracking-[0.4em] uppercase text-[var(--siliq-accent)] mb-6">Our Philosophy</p>
            <h2 className="font-display text-3xl md:text-5xl font-light leading-tight mb-8">&ldquo;Less jewellery, better jewellery.<br />Pieces you reach for every single day.&rdquo;</h2>
            <div className="w-14 h-px bg-[var(--siliq-black)] mx-auto mb-8" />
            <p className="text-sm leading-relaxed text-[var(--siliq-graphite)] max-w-2xl mx-auto">We don&apos;t chase seasonal collections or fast fashion cycles. We design slowly, intentionally — creating pieces that work with everything in your wardrobe, every day of the year.</p>
          </div>
        </section>
      </MotionSection>

      {/* What Makes Us Different */}
      <MotionSection>
        <section className="py-24 px-6">
          <SectionHeader label="Why SILIQ" title="What Makes Us Different" />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { title: "Daily Wear First", text: "Every design is tested for comfort, weight, and durability. If you can't sleep in it, we go back to the drawing board." },
              { title: "Pure 925 Silver", text: "No plating over cheap metals. No hollow pieces. Solid 925 sterling silver, hallmarked and certified by BIS." },
              { title: "Minimalist by Design", text: "Clean lines, subtle details, neutral tones. Our pieces are designed to disappear into your style — not overpower it." },
              { title: "Built to Last", text: "Rhodium-plated for tarnish resistance. Reinforced clasps. Comfort-fit bands. Made to survive your real life." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border-l-2 border-[var(--siliq-line)] pl-8"
              >
                <h3 className="text-sm font-medium tracking-[0.15em] uppercase mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </MotionSection>

      {/* Zoom Parallax Gallery */}
      <ZoomParallax images={[
        { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=700&fit=crop", alt: "Silver hoop earrings" },
        { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1200&h=700&fit=crop", alt: "Stacking rings" },
        { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop", alt: "Chain necklace" },
        { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1200&h=700&fit=crop", alt: "Silver cuff bracelet" },
        { src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&h=800&fit=crop", alt: "Minimalist earrings" },
        { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&h=700&fit=crop", alt: "Layered bracelets" },
        { src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1200&h=700&fit=crop", alt: "Pendant necklace" },
      ]} />

      {/* Timeline */}
      <MotionSection>
        <section className="py-24 px-6">
          <SectionHeader label="Journey" title="Our Timeline" />
          <div className="max-w-3xl mx-auto space-y-12">
            {[
              { year: "2022", title: "The Idea", text: "SILIQ started with a simple question: why is it so hard to find quality silver jewellery that's actually designed for daily wear?" },
              { year: "2023", title: "First Collection", text: "We launched 24 minimalist pieces — rings, necklaces, and earrings — all in solid 925 sterling silver. No trends, just timeless design." },
              { year: "2024", title: "Growing Community", text: "10,000+ customers chose SILIQ for their everyday jewellery. We expanded into bracelets, anklets, and layering sets." },
              { year: "2025", title: "Today", text: "A focused brand with a clear mission: minimalist daily-wear silver that lasts. Every piece hallmarked, every customer cared for." },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex gap-8 items-start"
              >
                <div className="text-2xl font-display font-light text-[var(--siliq-accent)] w-16 shrink-0">{item.year}</div>
                <div className="border-l border-[var(--siliq-line)] pl-8">
                  <h3 className="font-display text-xl mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </MotionSection>

      {/* Values */}
      <MotionSection>
        <section className="py-24 px-6 bg-[var(--siliq-cream)]">
          <SectionHeader label="What We Believe" title="Our Values" />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: "◇", title: "Simplicity", text: "Design stripped to its essence. No unnecessary detail, no visual noise — just the beauty of silver in its purest form." },
              { icon: "◯", title: "Durability", text: "Every piece is built for real life. Shower-safe, sleep-safe, gym-safe. Jewellery that keeps up with you." },
              { icon: "◈", title: "Honesty", text: "Solid 925 silver, transparent pricing, no hidden markups. What you see is what you get — always." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="text-sm font-medium tracking-[0.15em] uppercase mb-3">{v.title}</h3>
                <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </MotionSection>

      {/* CTA */}
      <MotionSection>
        <section className="py-24 px-6 text-center">
          <div className="max-w-lg mx-auto">
            <p className="font-display text-3xl font-light mb-6">Ready to find your everyday piece?</p>
            <Link href="/shop" className="inline-block px-10 py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-charcoal)] transition-colors">Shop the Collection</Link>
          </div>
        </section>
      </MotionSection>
    </>
  );
}
