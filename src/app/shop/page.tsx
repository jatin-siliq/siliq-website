"use client";
import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { categories } from "@/lib/data";
import { useProducts } from "@/lib/products-provider";
import { ProductCard } from "@/components/product-card";
import { SectionHeader } from "@/components/section-header";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products } = useProducts();

  const category = searchParams.get("category") || "all";
  const tag = searchParams.get("tag") || "";
  const [sort, setSort] = useState("featured");

  const updateCategory = (newCategory: string) => {
    const params = new URLSearchParams();
    if (newCategory !== "all") params.set("category", newCategory);
    if (tag) params.set("tag", tag);
    const qs = params.toString();
    router.replace(`/shop${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const filtered = (() => {
    let list = category === "all" ? products : products.filter((p) => p.category === category);
    if (tag === "new") list = list.filter((p) => p.isNew);
    else if (tag === "bestseller") list = list.filter((p) => p.isBestseller);

    switch (sort) {
      case "price-low": return [...list].sort((a, b) => a.price - b.price);
      case "price-high": return [...list].sort((a, b) => b.price - a.price);
      case "newest": return [...list].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "rating": return [...list].sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  })();

  const activeCategoryLabel = categories.find((c) => c.slug === category)?.name || "All";
  const pageTitle = tag === "new" ? "New Arrivals" : tag === "bestseller" ? "Bestsellers" : activeCategoryLabel === "All" ? "All Pieces" : activeCategoryLabel;

  return (
    <>
      <AuroraBackground variant="light" intensity="subtle" className="bg-[var(--siliq-cream)]">
        <section className="py-16 px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageTitle}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <SectionHeader label="Collection" title={pageTitle} />
              <p className="text-center text-sm text-[var(--siliq-accent)] -mt-8 max-w-md mx-auto">
                {tag === "new" && "Our latest pieces, freshly added to the collection."}
                {tag === "bestseller" && "The pieces our customers love most — tried, tested, and treasured."}
                {!tag && "Discover our complete collection of 925 sterling silver jewellery."}
              </p>
            </motion.div>
          </AnimatePresence>
        </section>
      </AuroraBackground>

      <section className="py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--siliq-line)]">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => updateCategory(c.slug)}
                  className={`relative px-4 py-2 text-xs tracking-[0.1em] uppercase border transition-colors ${category === c.slug ? "text-white border-[var(--siliq-black)]" : "border-[var(--siliq-line)] hover:border-[var(--siliq-black)]"}`}
                >
                  {category === c.slug && (
                    <motion.span
                      layoutId="active-category"
                      className="absolute inset-0 bg-[var(--siliq-black)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{c.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[var(--siliq-accent)]" />
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-xs tracking-wider uppercase bg-transparent border border-[var(--siliq-line)] px-3 py-2 outline-none">
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {tag && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-xs tracking-wider uppercase text-[var(--siliq-accent)]">Active filter:</span>
              <button onClick={() => { router.replace(category === "all" ? "/shop" : `/shop?category=${category}`, { scroll: false }); }} className="text-xs tracking-wider uppercase border border-[var(--siliq-black)] px-3 py-1 hover:bg-[var(--siliq-black)] hover:text-white transition-colors">
                {tag === "new" ? "New Arrivals" : "Bestsellers"} ✕
              </button>
            </div>
          )}

          <p className="text-xs text-[var(--siliq-accent)] mb-6">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${tag}-${sort}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10"
            >
              {filtered.map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-[var(--siliq-accent)]">Coming Soon</p>
              <button onClick={() => { updateCategory("all"); router.replace("/shop", { scroll: false }); }} className="mt-4 text-xs tracking-wider uppercase underline">View All</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-sm text-[var(--siliq-accent)]">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
