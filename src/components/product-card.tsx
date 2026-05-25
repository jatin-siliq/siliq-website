"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, X } from "lucide-react";
import { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function ProductCard({ product, autoSlide = false, hideBadges = false }: { product: Product; autoSlide?: boolean; hideBadges?: boolean }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const [activeImg, setActiveImg] = useState(0);
  const [showAdded, setShowAdded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const outOfStock = product.stock !== undefined && product.stock <= 0;

  // Auto-slide for homepage sections (only first 2 images)
  useEffect(() => {
    if (!autoSlide || product.images.length <= 1) return;
    const id = setInterval(() => {
      setActiveImg((prev) => prev === 0 ? 1 : 0);
    }, 6000);
    return () => clearInterval(id);
  }, [autoSlide, product.images.length]);

  const startSlide = useCallback(() => {
    if (autoSlide) return; // don't conflict with auto-slide
    if (product.images.length <= 1) return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;
    intervalRef.current = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % product.images.length);
    }, 1000);
  }, [product.images.length, autoSlide]);

  const stopSlide = useCallback(() => {
    if (autoSlide) return;
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    setActiveImg(0);
  }, [autoSlide]);

  const handleAddToCart = () => {
    if (outOfStock) return;
    addToCart(product);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);
  };

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`} className="block" onMouseEnter={startSlide} onMouseLeave={stopSlide}>
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--siliq-pearl)] mb-3">
          {product.images.map((img, i) => (
            <Image key={i} src={img} alt={product.name} fill className={`object-cover transition-opacity duration-[2000ms] ease-in-out ${i === activeImg ? "opacity-100" : "opacity-0"}`} />
          ))}
          {product.isNew && !outOfStock && !hideBadges && (
            <span className="absolute top-3 left-3 bg-[var(--siliq-black)] text-white text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 z-10">New</span>
          )}
          {outOfStock && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 z-10">Sold Out</span>
          )}
          {discount > 0 && !outOfStock && !hideBadges && (
            <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] tracking-wider uppercase px-2 py-1 z-10">-{discount}%</span>
          )}
          {/* Out of stock overlay */}
          {outOfStock && (
            <div className="absolute inset-0 bg-white/40 z-[5] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-red-600/10 flex items-center justify-center">
                <X className="w-8 h-8 text-red-600" strokeWidth={2.5} />
              </div>
            </div>
          )}
          {/* Image dots */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              {product.images.map((_, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeImg ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Quick actions */}
      <button onClick={() => toggleWishlist(product)} className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Add to wishlist">
        <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-500 text-red-500" : "text-[var(--siliq-graphite)]"}`} />
      </button>

      {/* Add to bag / Out of stock button */}
      <AnimatePresence mode="wait">
        {showAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-[calc(25%+12px)] left-1/2 -translate-x-1/2 z-10 bg-green-700 text-white text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 whitespace-nowrap"
          >
            ✓ Added
          </motion.span>
        ) : outOfStock ? (
          <motion.span
            key="oos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-[calc(25%+12px)] left-1/2 -translate-x-1/2 z-10 bg-red-700 text-white text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
          >
            <X className="w-3 h-3" /> Out of Stock
          </motion.span>
        ) : (
          <button onClick={handleAddToCart} className="absolute bottom-[calc(25%+12px)] left-1/2 -translate-x-1/2 z-10 bg-[var(--siliq-black)] text-white text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap" aria-label="Add to bag">
            <ShoppingBag className="w-3 h-3" /> Add to Bag
          </button>
        )}
      </AnimatePresence>

      <Link href={`/product/${product.slug}`}>
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${product.reviews > 0 && i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
          ))}
          <span className="text-[10px] text-[var(--siliq-accent)] ml-1">({product.reviews})</span>
        </div>
        <h3 className="text-sm font-medium mb-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-[var(--siliq-accent)] line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
