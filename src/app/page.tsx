"use client";
import { SparklesCore } from "@/components/ui/sparkles";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SectionHeader } from "@/components/section-header";
import { ProductCard } from "@/components/product-card";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { MotionSection } from "@/components/motion-section";
import { ImageGallery } from "@/components/ui/image-gallery";
import { products, collections } from "@/lib/data";
import { useProducts } from "@/lib/products-provider";
import Link from "next/link";
import Image from "next/image";
import { Diamond, Truck, RotateCcw, Heart, Shield, Gift } from "lucide-react";
import { NewsletterForm } from "@/components/newsletter-form";
import { motion } from "framer-motion";

export default function Home() {
  const { products } = useProducts();
  const bestsellers = products.filter((p) => p.isBestseller);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[var(--siliq-black)] overflow-hidden">
        <div className="absolute inset-0">
          <SparklesCore id="hero-sparkles" background="transparent" minSize={0.4} maxSize={1.4} particleDensity={100} className="w-full h-full" particleColor="#C0C0C0" speed={1} />
        </div>

        {/* Subtle radial vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,10,10,0.6)_100%)] pointer-events-none" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm tracking-[0.3em] uppercase text-[var(--siliq-silver)] mb-8"
          >
            Silver 925 — Fine Jewellery
          </motion.p>

          {/* Logo: layered entrance + continuous gentle float + soft glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block"
          >
            {/* Soft halo glow behind logo */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(229,228,226,0.25)_0%,transparent_60%)] blur-2xl scale-150" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/logo/siliq-white.svg"
                alt="SILIQ"
                width={800}
                height={400}
                priority
                className="h-56 sm:h-64 md:h-80 lg:h-[26rem] xl:h-[30rem] w-auto mx-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
              />
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="font-display text-xl md:text-2xl italic font-light text-[var(--siliq-platinum)] mt-8 max-w-lg mx-auto"
          >
            Crafted with intention. Worn with meaning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Link href="/shop" className="px-10 py-4 bg-white text-[var(--siliq-black)] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-platinum)] transition-colors">Shop Collection</Link>
            <Link href="/shop?tag=new" className="px-10 py-4 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--siliq-black)] transition-all">New Arrivals</Link>
          </motion.div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-[var(--siliq-cream)] py-3 overflow-hidden border-y border-[var(--siliq-line)]">
        <div className="animate-marquee whitespace-nowrap flex gap-12 text-xs tracking-[0.2em] uppercase text-[var(--siliq-accent)]">
          {Array.from({ length: 3 }).map((_, r) => (
            <span key={r} className="flex gap-12">
              <span>✦ Free Shipping Above ₹2,500</span>
              <span>✦ 925 Hallmarked Silver</span>
              <span>✦ 7-Day Easy Returns</span>
            </span>
          ))}
        </div>
      </div>

      {/* USP Bar */}
      <MotionSection>
        <section className="py-12 px-6 bg-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {[
              { icon: Diamond, title: "925 Silver", text: "BIS Hallmarked" },
              { icon: Truck, title: "Free Shipping", text: "Above ₹2,500" },
              { icon: RotateCcw, title: "Easy Returns", text: "7 Days" },
              { icon: Heart, title: "Lifetime Care", text: "Expert Support" },
              { icon: Shield, title: "Certified", text: "Authenticity Card" },
              { icon: Gift, title: "Gift Ready", text: "Premium Packaging" },
            ].map((f) => (
              <div key={f.title} className="py-3">
                <f.icon className="w-5 h-5 mx-auto mb-2 text-[var(--siliq-graphite)]" strokeWidth={1.5} />
                <p className="text-[11px] font-medium tracking-[0.1em] uppercase">{f.title}</p>
                <p className="text-[11px] text-[var(--siliq-accent)]">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </MotionSection>

      {/* Collections */}
      <AuroraBackground variant="light" intensity="subtle" className="bg-[var(--siliq-pearl)]">
        <section className="py-20 px-6">
          <SectionHeader label="Explore" title="Shop by Category" />
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {collections.map((c) => (
              <Link href={`/shop?category=${c.slug}`} key={c.name} className="group relative aspect-[3/4] overflow-hidden bg-[var(--siliq-platinum)]">
                <Image src={c.img} alt={c.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 flex flex-col items-center justify-end p-5">
                  <h3 className="font-display text-xl text-white font-light tracking-wide">{c.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </AuroraBackground>

      {/* Bestsellers */}
      <AuroraBackground variant="light" intensity="subtle" className="bg-white">
        <section className="py-20">
          <div className="px-6"><SectionHeader label="Most Loved" title="Bestsellers" /></div>
          {/* Mobile: auto-scroll + touch-swipeable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 w-max px-6 will-change-transform backface-hidden" style={{ animation: "scroll-slider 40s linear infinite" }}>
              {[...bestsellers.slice(0, 8), ...bestsellers.slice(0, 8)].map((p, i) => (
                <div key={`bs-m-${i}`} className="w-[220px] flex-shrink-0">
                  <ProductCard product={p} autoSlide hideBadges />
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: auto-scroll */}
          <div className="hidden md:block overflow-hidden" style={{ mask: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)", WebkitMask: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)" }}>
            <div className="flex gap-6 w-max px-6 will-change-transform backface-hidden" style={{ animation: "scroll-slider 60s linear infinite" }}>
              {[...bestsellers.slice(0, 8), ...bestsellers.slice(0, 8)].map((p, i) => (
                <div key={`bs-${i}`} className="w-[280px] flex-shrink-0">
                  <ProductCard product={p} autoSlide hideBadges />
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="inline-block px-8 py-3 border border-[var(--siliq-black)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-black)] hover:text-white transition-all">View All</Link>
          </div>
        </section>
      </AuroraBackground>

      {/* Lookbook Gallery */}
      <section className="bg-white">
        <ImageGallery
          title="Lived In, Loved Always"
          subtitle="Minimalist silver pieces designed for everyday wear."
          images={[
            { src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop", alt: "Silver hoops" },
            { src: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&h=800&fit=crop", alt: "Stacking rings" },
            { src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop", alt: "Chain necklace" },
            { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=800&fit=crop", alt: "Silver cuff" },
            { src: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&h=800&fit=crop", alt: "Minimalist earrings" },
            { src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&h=800&fit=crop", alt: "Layered bracelets" },
          ]}
        />
      </section>

      {/* Banner */}
      <MotionSection>
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&h=800&fit=crop" alt="SILIQ Collection" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center text-white px-6">
            <p className="text-xs tracking-[0.3em] uppercase text-white/80 mb-3">Limited Edition</p>
            <h2 className="font-display text-4xl md:text-5xl font-light mb-4">The Celestial Collection</h2>
            <p className="text-sm text-white/80 mb-6 max-w-md mx-auto">Inspired by the night sky. Crafted in sterling silver with celestial motifs.</p>
            <Link href="/celestial" className="px-8 py-3 bg-white text-[var(--siliq-black)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-platinum)] transition-colors">Explore Now</Link>
          </div>
        </section>
      </MotionSection>

      {/* New Arrivals */}
      <AuroraBackground variant="light" intensity="subtle" className="bg-[var(--siliq-cream)]">
        <section className="py-20">
          <div className="px-6"><SectionHeader label="Just Arrived" title="New This Season" /></div>
          {/* Mobile: auto-scroll + touch-swipeable */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 w-max px-6 will-change-transform backface-hidden" style={{ animation: "scroll-slider 45s linear infinite" }}>
              {[...newArrivals.slice(0, 8), ...newArrivals.slice(0, 8)].map((p, i) => (
                <div key={`na-m-${i}`} className="w-[220px] flex-shrink-0">
                  <ProductCard product={p} autoSlide hideBadges />
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: auto-scroll */}
          <div className="hidden md:block overflow-hidden" style={{ mask: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)", WebkitMask: "linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)" }}>
            <div className="flex gap-6 w-max px-6 will-change-transform backface-hidden" style={{ animation: "scroll-slider 65s linear infinite" }}>
              {[...newArrivals.slice(0, 8), ...newArrivals.slice(0, 8)].map((p, i) => (
                <div key={`na-${i}`} className="w-[280px] flex-shrink-0">
                  <ProductCard product={p} autoSlide hideBadges />
                </div>
              ))}
            </div>
          </div>
        </section>
      </AuroraBackground>

      {/* Testimonials */}
      <AuroraBackground variant="light" intensity="subtle" className="bg-white">
        <section className="py-20 px-6">
          <SectionHeader label="Reviews" title="What Our Customers Say" />
          <TestimonialSlider />
        </section>
      </AuroraBackground>

      {/* Instagram Feed */}
      <AuroraBackground variant="light" intensity="subtle" className="bg-[var(--siliq-pearl)]">
        <section className="py-20 px-6">
          <SectionHeader label="@siliq.co" title="Follow Us on Instagram" />
          <div className="max-w-7xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-2">
            {[
              "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1515562141589-67f0d569b6f5?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop",
              "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop",
            ].map((img, i) => (
              <a key={i} href="https://instagram.com/siliq.co" target="_blank" rel="noopener noreferrer" className="aspect-square overflow-hidden group">
                <Image src={img} alt="Instagram" width={300} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </section>
      </AuroraBackground>

      {/* Newsletter */}
      <AuroraBackground variant="dark" intensity="normal" className="bg-[var(--siliq-black)] text-white">
        <section className="py-20 px-6 text-center">
          <div className="max-w-lg mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-[var(--siliq-platinum)] mb-3">Stay Connected</p>
            <h2 className="font-display text-3xl md:text-4xl font-light mb-4">Join the SILIQ Circle</h2>
            <div className="w-14 h-px bg-white mx-auto my-6" />
            <p className="text-sm text-[var(--siliq-platinum)] mb-8">Get 10% off your first order + early access to new collections and exclusive offers.</p>
            <NewsletterForm variant="dark" />
            <p className="text-[10px] text-[var(--siliq-accent)] mt-3">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </section>
      </AuroraBackground>
    </>
  );
}
