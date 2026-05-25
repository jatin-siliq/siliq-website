"use client";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/product-card";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <AuroraBackground variant="light" intensity="subtle" className="bg-white">
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
          <Heart className="w-16 h-16 text-[var(--siliq-line)] mb-6" strokeWidth={1} />
          <h1 className="font-display text-3xl mb-3">Your wishlist is empty</h1>
          <p className="text-sm text-[var(--siliq-accent)] mb-8">Save pieces you love for later.</p>
          <Link href="/shop" className="px-8 py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase">Explore Collection</Link>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <div className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-light mb-10">Wishlist ({wishlist.length})</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
          {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
