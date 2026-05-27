"use client";
import { useEffect, useState, useRef } from "react";
import { Product, products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STORAGE_KEY = "siliq_recently_viewed";
const MAX_ITEMS = 12;

function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

function addToRecentlyViewed(productId: string) {
  const ids = getRecentlyViewed().filter((id) => id !== productId);
  ids.unshift(productId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.slice(0, MAX_ITEMS)));
}

export function useTrackRecentlyViewed(productId: string) {
  useEffect(() => { addToRecentlyViewed(productId); }, [productId]);
}

export function RecentlyViewed({ currentProductId }: { currentProductId: string }) {
  const [items, setItems] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const ids = getRecentlyViewed().filter((id) => id !== currentProductId);
    const viewed = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];
    setItems(viewed);
  }, [currentProductId]);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", updateScrollState);
    return () => { el?.removeEventListener("scroll", updateScrollState); };
  }, [items]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h3 className="font-display text-2xl">Recently Viewed</h3>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-9 h-9 rounded-full border border-[var(--siliq-line)] flex items-center justify-center disabled:opacity-30 hover:bg-[var(--siliq-pearl)] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-9 h-9 rounded-full border border-[var(--siliq-line)] flex items-center justify-center disabled:opacity-30 hover:bg-[var(--siliq-pearl)] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((product, i) => (
            <RecentlyViewedCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentlyViewedCard({ product, index }: { product: Product; index: number }) {
  const controls = useAnimationControls();

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="flex-shrink-0 w-[200px] group"
    >
      <Link href={`/product/${product.slug}`}>
        <motion.div
          className="relative aspect-square rounded-lg overflow-hidden bg-[var(--siliq-pearl)] mb-3"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onHoverStart={() => controls.start({ scale: 1.08, rotate: 1 })}
          onHoverEnd={() => controls.start({ scale: 1, rotate: 0 })}
        >
          <motion.div animate={controls} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="200px"
            />
          </motion.div>
        </motion.div>
        <p className="text-xs tracking-wide truncate text-[var(--siliq-black)]">{product.name}</p>
        <p className="text-xs text-[var(--siliq-accent)] mt-0.5">₹{product.price.toLocaleString("en-IN")}</p>
      </Link>
    </motion.div>
  );
}
