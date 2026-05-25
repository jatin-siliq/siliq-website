"use client";
import { useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { journalPosts } from "@/lib/journal-data";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Styling", "Care Tips", "Silver Knowledge"] as const;

export default function JournalPage() {
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? journalPosts : journalPosts.filter((p) => p.category === active);

  return (
    <>
      <AuroraBackground variant="dark" intensity="normal" className="bg-[var(--siliq-black)]">
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0"><SparklesCore id="journal-sparkles" background="transparent" minSize={0.4} maxSize={1.2} particleDensity={60} className="w-full h-full" particleColor="#C0C0C0" speed={0.8} /></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center px-6"
          >
            <p className="text-sm tracking-[0.3em] uppercase text-[var(--siliq-silver)] mb-4">The SILIQ Journal</p>
            <h1 className="font-display text-5xl md:text-7xl font-light text-white">Journal</h1>
            <p className="font-display text-lg italic text-[var(--siliq-platinum)] mt-4">Styling tips, care guides, and silver knowledge.</p>
          </motion.div>
        </section>
      </AuroraBackground>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex flex-wrap gap-2 mb-12 justify-center"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-4 py-2 text-xs tracking-[0.1em] uppercase border transition-colors ${active === cat ? "text-white border-[var(--siliq-black)]" : "border-[var(--siliq-line)] hover:border-[var(--siliq-black)]"}`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="active-journal-cat"
                    className="absolute inset-0 bg-[var(--siliq-black)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-16"
          >
            <Link href={`/journal/${filtered[0]?.slug}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 group">
              <div className="aspect-[16/10] overflow-hidden bg-[var(--siliq-platinum)]">
                <Image src={filtered[0]?.image || ""} alt={filtered[0]?.title || ""} width={800} height={500} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.2em] uppercase bg-[var(--siliq-black)] text-white px-2.5 py-1">{filtered[0]?.category}</span>
                  <span className="text-xs text-[var(--siliq-accent)]">{filtered[0]?.date} · {filtered[0]?.readTime}</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-light mb-4 group-hover:opacity-70 transition-opacity">{filtered[0]?.title}</h2>
                <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed">{filtered[0]?.excerpt}</p>
                <span className="mt-6 text-xs tracking-[0.15em] uppercase font-medium">Read More →</span>
              </div>
            </Link>
          </motion.article>

          {/* Posts Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.slice(1).map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                >
                  <Link href={`/journal/${post.slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden bg-[var(--siliq-platinum)] mb-4">
                      <Image src={post.image} alt={post.title} width={800} height={500} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--siliq-accent)]">{post.category}</span>
                      <span className="text-[10px] text-[var(--siliq-accent)]">·</span>
                      <span className="text-[10px] text-[var(--siliq-accent)]">{post.readTime}</span>
                    </div>
                    <h3 className="font-display text-xl font-light mb-2 group-hover:opacity-70 transition-opacity">{post.title}</h3>
                    <p className="text-xs text-[var(--siliq-graphite)] leading-relaxed">{post.excerpt}</p>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Newsletter CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 bg-[var(--siliq-cream)] text-center"
      >
        <div className="max-w-lg mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--siliq-accent)] mb-3">Stay Updated</p>
          <h2 className="font-display text-3xl font-light mb-4">New posts every week</h2>
          <p className="text-sm text-[var(--siliq-graphite)] mb-6">Styling inspiration, care tips, and behind-the-scenes — straight to your inbox.</p>
          <Link href="/shop" className="inline-block px-8 py-3 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-charcoal)] transition-colors">Shop the Collection</Link>
        </div>
      </motion.section>
    </>
  );
}
