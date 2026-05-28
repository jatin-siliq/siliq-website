"use client";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { ProductCard } from "@/components/product-card";
import { useProducts } from "@/lib/products-provider";
import Link from "next/link";
import Image from "next/image";
import { Star, Sparkles, Moon } from "lucide-react";

const celestialSlugs = ["orbital-resonance", "double-layer-star-flower", "starburst-crystal-blossom", "stellar-beam", "cosmic-pearl-charm-ring"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }),
};

export default function CelestialPage() {
  const { products } = useProducts();
  const celestialProducts = products.filter((p) => celestialSlugs.includes(p.slug));
  return (
    <>
      {/* Hero — Full dark immersive */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#050510] overflow-hidden">
        <div className="absolute inset-0">
          <SparklesCore background="transparent" minSize={0.3} maxSize={1.2} particleDensity={150} className="w-full h-full" particleColor="#E5E4E2" speed={0.5} />
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(192,192,192,0.08)_0%,transparent_70%)]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <Moon className="w-10 h-10 mx-auto mb-6 text-[var(--siliq-silver)]" strokeWidth={1} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xs tracking-[0.5em] uppercase text-[var(--siliq-silver)] mb-6"
          >
            Limited Edition
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-wide"
          >
            The Celestial Collection
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--siliq-silver)] to-transparent mx-auto my-8"
          />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }}
            className="font-display text-lg md:text-xl italic font-light text-[var(--siliq-platinum)] max-w-xl mx-auto"
          >
            Inspired by the night sky. Crafted in sterling silver with celestial motifs that capture the infinite beauty of the cosmos.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.8 }}>
            <a href="#collection" className="inline-block mt-10 px-10 py-4 border border-white/30 text-white text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-[#050510] transition-all duration-500">
              Explore Pieces
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-4 h-4 text-[var(--siliq-silver)]" strokeWidth={1.5} />
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--siliq-silver)]">The Story</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light text-white mb-6">Written in the Stars</h2>
            <p className="text-sm leading-relaxed text-[var(--siliq-platinum)]/80 mb-4">
              Every piece in the Celestial Collection draws from the geometry of constellations, the glow of distant stars, and the quiet elegance of moonlight on silver.
            </p>
            <p className="text-sm leading-relaxed text-[var(--siliq-platinum)]/80">
              Limited to small batches, each design is numbered and comes with a certificate of authenticity.
            </p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="relative aspect-square rounded-lg overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&h=800&fit=crop" alt="Celestial Collection" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Collection Grid */}
      <section id="collection" className="bg-[#0A0A0A] py-24 px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
          <Sparkles className="w-5 h-5 mx-auto mb-4 text-[var(--siliq-silver)]" strokeWidth={1.5} />
          <h2 className="font-display text-3xl md:text-4xl font-light text-white">The Pieces</h2>
          <p className="text-sm text-[var(--siliq-platinum)]/70 mt-3">Limited quantities. Eternal beauty.</p>
        </motion.div>

        <div className="celestial-products max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {celestialProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={i}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#050510] py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <SparklesCore background="transparent" minSize={0.2} maxSize={0.8} particleDensity={50} className="w-full h-full" particleColor="#C0C0C0" speed={0.3} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-light text-white">What Makes It Special</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            {[
              { icon: Star, title: "Numbered Edition", desc: "Each piece is individually numbered with a unique serial engraving." },
              { icon: Moon, title: "Celestial Motifs", desc: "Designs inspired by constellations, lunar phases, and cosmic geometry." },
              { icon: Sparkles, title: "Certificate of Authenticity", desc: "Comes with a signed certificate and premium celestial packaging." },
            ].map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}>
                <f.icon className="w-6 h-6 mx-auto mb-4 text-[var(--siliq-silver)]" strokeWidth={1.2} />
                <h3 className="text-sm font-medium tracking-[0.1em] uppercase text-white mb-2">{f.title}</h3>
                <p className="text-xs text-[var(--siliq-platinum)]/70 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-24 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <p className="text-xs tracking-[0.4em] uppercase text-[var(--siliq-silver)] mb-4">Don&apos;t miss out</p>
          <p className="text-sm text-[var(--siliq-platinum)]/70 max-w-md mx-auto mb-10">Limited quantities available. Each piece is crafted to order and ships within 5–7 days.</p>
          <Link href="/shop" className="inline-block px-12 py-4 bg-white text-[#0A0A0A] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-platinum)] transition-colors">
            Shop the Collection
          </Link>
        </motion.div>
      </section>
    </>
  );
}
