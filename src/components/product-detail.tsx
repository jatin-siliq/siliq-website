"use client";
import { useState } from "react";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Truck, RotateCcw, Shield, Minus, Plus, Share2 } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { motion, AnimatePresence } from "framer-motion";

export function ProductDetail({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "care" | "shipping">("description");

  if (!product) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-3xl mb-4">Product Not Found</h1>
        <Link href="/shop" className="text-xs tracking-wider uppercase underline">Back to Shop</Link>
      </div>
    </div>
  );

  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) return;
    for (let i = 0; i < qty; i++) addToCart(product, selectedSize);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <nav className="text-xs text-[var(--siliq-accent)] mb-8 tracking-wider">
          <Link href="/" className="hover:text-[var(--siliq-black)]">Home</Link> / <Link href="/shop" className="hover:text-[var(--siliq-black)]">Shop</Link> / <span className="text-[var(--siliq-black)]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="flex gap-3">
            {/* Thumbnails on side */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[500px]">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`w-14 h-16 overflow-hidden border-2 rounded-md transition-all duration-300 flex-shrink-0 ${i === selectedImage ? "border-[var(--siliq-black)] scale-105" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <Image src={img} alt="" width={56} height={64} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            {/* Main Image */}
            <div
              className="flex-1 aspect-[3/4] overflow-hidden bg-[var(--siliq-pearl)] relative group rounded-lg"
              onTouchStart={(e) => { (e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX); }}
              onTouchEnd={(e) => {
                const diff = Number((e.currentTarget as HTMLElement).dataset.touchX || 0) - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) {
                  if (diff > 0 && selectedImage < product.images.length - 1) setSelectedImage(selectedImage + 1);
                  if (diff < 0 && selectedImage > 0) setSelectedImage(selectedImage - 1);
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={product.images[selectedImage]} alt={product.name} width={600} height={750} className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105" />
                </motion.div>
              </AnimatePresence>
              {/* Arrows */}
              {selectedImage > 0 && (
                <button onClick={() => setSelectedImage(selectedImage - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white" aria-label="Previous">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
              )}
              {selectedImage < product.images.length - 1 && (
                <button onClick={() => setSelectedImage(selectedImage + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white" aria-label="Next">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
              {/* Dots (mobile) */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 md:hidden">
                {product.images.map((_, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === selectedImage ? "bg-[var(--siliq-black)] w-3" : "bg-[var(--siliq-black)]/30"}`} />
                ))}
              </div>
            </div>
          </div>

          <div>
            {product.isNew && <span className="text-[10px] tracking-[0.2em] uppercase bg-[var(--siliq-black)] text-white px-2.5 py-1 mb-4 inline-block">New Arrival</span>}
            <h1 className="font-display text-3xl md:text-4xl font-light mt-2">{product.name}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${product.reviews > 0 && i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-xs text-[var(--siliq-accent)]">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-2xl font-medium">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[var(--siliq-accent)] line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm text-green-600 font-medium">{discount}% OFF</span>
                </>
              )}
            </div>
            <p className="text-xs text-[var(--siliq-accent)] mt-1">Inclusive of all taxes</p>
            <p className="text-sm text-[var(--siliq-graphite)] leading-relaxed mt-6">{product.description}</p>

            {product.sizes && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium tracking-[0.1em] uppercase">Select Size</p>
                  <Link href="/size-guide" className="text-xs text-[var(--siliq-accent)] underline">Size Guide</Link>
                </div>
                <div className="flex gap-2">
                  {product.sizes.map((s) => (
                    <button key={s} onClick={() => setSelectedSize(s)} className={`w-10 h-10 text-sm border transition-colors ${selectedSize === s ? "bg-[var(--siliq-black)] text-white border-[var(--siliq-black)]" : "border-[var(--siliq-line)] hover:border-[var(--siliq-black)]"}`}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6">
              <p className="text-xs font-medium tracking-[0.1em] uppercase mb-3">Quantity</p>
              <div className="flex items-center border border-[var(--siliq-line)] w-fit">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-[var(--siliq-pearl)]"><Minus className="w-3 h-3" /></button>
                <span className="w-10 h-10 flex items-center justify-center text-sm border-x border-[var(--siliq-line)]">{qty}</span>
                <button onClick={() => { const max = product.stock || 99; if (qty < max) setQty(qty + 1); }} className={`w-10 h-10 flex items-center justify-center hover:bg-[var(--siliq-pearl)] ${qty >= (product.stock || 99) ? "opacity-30 cursor-not-allowed" : ""}`}><Plus className="w-3 h-3" /></button>
              </div>
              {product.stock && qty >= product.stock && <p className="text-xs text-[var(--siliq-accent)] mt-2">Maximum available quantity selected</p>}
            </div>

            <div className="flex gap-3 mt-8">
              {product.stock !== undefined && product.stock <= 0 ? (
                <button disabled className="flex-1 py-4 bg-red-700 text-white text-xs tracking-[0.2em] uppercase font-medium opacity-90 cursor-not-allowed flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Out of Stock
                </button>
              ) : (
                <>
                  <button onClick={handleAddToCart} className="flex-1 py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-charcoal)] transition-colors disabled:opacity-50" disabled={!!product.sizes && !selectedSize}>Add to Bag</button>
                  <button onClick={() => { handleAddToCart(); window.location.href = "/checkout"; }} className="flex-1 py-4 border-2 border-[var(--siliq-black)] text-[var(--siliq-black)] text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-black)] hover:text-white transition-colors disabled:opacity-50" disabled={!!product.sizes && !selectedSize}>Buy Now</button>
                </>
              )}
              <button onClick={() => toggleWishlist(product)} className={`w-14 h-14 flex items-center justify-center border transition-colors ${wishlisted ? "bg-red-50 border-red-200" : "border-[var(--siliq-line)] hover:border-[var(--siliq-black)]"}`} aria-label="Wishlist">
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </button>
              <button onClick={() => { if (navigator.share) navigator.share({ title: product.name, text: product.description, url: window.location.href }); else navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied!")); }} className="w-14 h-14 flex items-center justify-center border border-[var(--siliq-line)] hover:border-[var(--siliq-black)] transition-colors" aria-label="Share">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[var(--siliq-line)]">
              {[{ icon: Truck, text: "Free Shipping" }, { icon: RotateCcw, text: "7-Day Returns" }, { icon: Shield, text: "BIS Hallmarked" }].map((b) => (
                <div key={b.text} className="flex items-center gap-2">
                  <b.icon className="w-4 h-4 text-[var(--siliq-accent)]" strokeWidth={1.5} />
                  <span className="text-[11px] text-[var(--siliq-accent)]">{b.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-[var(--siliq-line)]">
              <div className="flex gap-6 border-b border-[var(--siliq-line)]">
                {(["description", "care", "shipping"] as const).map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`py-4 text-xs tracking-[0.15em] uppercase transition-colors ${tab === t ? "text-[var(--siliq-black)] border-b-2 border-[var(--siliq-black)]" : "text-[var(--siliq-accent)]"}`}>
                    {t === "description" ? "Details" : t === "care" ? "Care" : "Shipping"}
                  </button>
                ))}
              </div>
              <div className="py-6 text-sm text-[var(--siliq-graphite)] leading-relaxed">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {tab === "description" && (
                      <div className="space-y-5">
                        {product.specs && Object.values(product.specs).some(v => v) && (
                          <div>
                            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Product Specifications</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                              {([
                                ["Material", product.specs.material],
                                ["Weight", product.specs.weight],
                                ["Finish", product.specs.finish],
                                ["Plating", product.specs.plating],
                                ["Stone", product.specs.stone],
                                ["Stone Setting", product.specs.stoneSetting],
                                ["Chain Length", product.specs.chainLength],
                                ["Pendant Size", product.specs.pendantSize],
                                ["Ring Width", product.specs.ringWidth],
                                ["Earring Type", product.specs.earringType],
                                ["Closure", product.specs.closure],
                                ["Clasp Type", product.specs.claspType],
                                ["Bracelet Length", product.specs.braceletLength],
                                ["Country of Origin", product.specs.countryOfOrigin],
                              ] as [string, string | undefined][]).filter(([, v]) => v).map(([label, value]) => (
                                <div key={label} className="flex justify-between border-b border-[var(--siliq-line)] pb-2">
                                  <span className="text-xs text-[var(--siliq-accent)]">{label}</span>
                                  <span className="text-xs font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {product.details.filter(d => !d.startsWith("SKU:")).length > 0 && (
                          <div>
                            <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Highlights</h4>
                            <ul className="space-y-1.5">
                              {product.details.filter(d => !d.startsWith("SKU:")).map((d, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />
                                  <span className="text-xs">{d}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <div>
                          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">What&apos;s Included</h4>
                          <ul className="space-y-1.5 text-xs text-[var(--siliq-graphite)]">
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Premium SILIQ packaging box</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Authenticity certificate</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Silver polishing cloth</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Care instruction card</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    {tab === "care" && (
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Daily Care</h4>
                          <ul className="space-y-1.5 text-xs text-[var(--siliq-graphite)]">
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Remove before showering, swimming, or exercising</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Apply perfume and lotion before wearing jewellery</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Wipe gently with the included polishing cloth</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Storage</h4>
                          <ul className="space-y-1.5 text-xs text-[var(--siliq-graphite)]">
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Store in the SILIQ pouch or box when not worn</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Keep away from direct sunlight and humidity</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Store pieces separately to avoid scratching</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Lifetime Support</h4>
                          <p className="text-xs text-[var(--siliq-graphite)]">Need re-polishing or repair? <a href="https://wa.me/918954849236" className="underline">WhatsApp us</a> — we offer lifetime care for all SILIQ pieces.</p>
                        </div>
                      </div>
                    )}
                    {tab === "shipping" && (
                      <div className="space-y-5">
                        <div>
                          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Delivery</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between border-b border-[var(--siliq-line)] pb-2">
                              <span className="text-xs text-[var(--siliq-accent)]">Dispatch</span>
                              <span className="text-xs font-medium">Within 2 business days</span>
                            </div>
                            <div className="flex justify-between border-b border-[var(--siliq-line)] pb-2">
                              <span className="text-xs text-[var(--siliq-accent)]">Delivery (India)</span>
                              <span className="text-xs font-medium">3–5 business days</span>
                            </div>
                            <div className="flex justify-between border-b border-[var(--siliq-line)] pb-2">
                              <span className="text-xs text-[var(--siliq-accent)]">Free Shipping</span>
                              <span className="text-xs font-medium">Orders above ₹2,500</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Returns & Exchange</h4>
                          <ul className="space-y-1.5 text-xs text-[var(--siliq-graphite)]">
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />7-day easy returns from delivery date</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Product must be unworn with tags intact</li>
                            <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[var(--siliq-black)]" />Refund processed within 5–7 business days</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-16 px-6 bg-[var(--siliq-pearl)]">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-display text-2xl text-center mb-10">You May Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
