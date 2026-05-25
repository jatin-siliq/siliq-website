"use client";

import { MenuItem, MenuContainer } from "@/components/ui/fluid-menu";
import { Menu as MenuIcon, X, Home, ShoppingBag, Heart, Search, Diamond } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/lib/store";

export function FluidQuickMenu() {
  const router = useRouter();
  const { cartCount, wishlist } = useStore();
  const [searchOpen, setSearchOpen] = useState(false);

  const go = (path: string) => router.push(path);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <MenuContainer expandDirection="up">
          {/* Trigger - first item */}
          <MenuItem
            icon={
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-100 scale-100 rotate-0 [div[data-expanded=true]_&]:opacity-0 [div[data-expanded=true]_&]:scale-0 [div[data-expanded=true]_&]:rotate-180">
                  <MenuIcon size={24} strokeWidth={1.5} className="text-[var(--siliq-black)] dark:text-white" />
                </div>
                <div className="absolute inset-0 transition-all duration-300 ease-in-out origin-center opacity-0 scale-0 -rotate-180 [div[data-expanded=true]_&]:opacity-100 [div[data-expanded=true]_&]:scale-100 [div[data-expanded=true]_&]:rotate-0">
                  <X size={24} strokeWidth={1.5} className="text-[var(--siliq-black)] dark:text-white" />
                </div>
              </div>
            }
          />
          <MenuItem
            onClick={() => go("/cart")}
            icon={
              <div className="relative">
                <ShoppingBag size={22} strokeWidth={1.5} className="text-[var(--siliq-black)]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--siliq-black)] text-white text-[9px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            }
          />
          <MenuItem
            onClick={() => go("/wishlist")}
            icon={
              <div className="relative">
                <Heart size={22} strokeWidth={1.5} className="text-[var(--siliq-black)]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[var(--siliq-black)] text-white text-[9px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
            }
          />
          <MenuItem onClick={() => setSearchOpen(true)} icon={<Search size={22} strokeWidth={1.5} className="text-[var(--siliq-black)]" />} />
          <MenuItem onClick={() => go("/shop")} icon={<Diamond size={22} strokeWidth={1.5} className="text-[var(--siliq-black)]" />} />
          <MenuItem onClick={() => go("/")} icon={<Home size={22} strokeWidth={1.5} className="text-[var(--siliq-black)]" />} />
        </MenuContainer>
      </div>

      {/* Quick search overlay triggered from fluid menu */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="bg-white max-w-2xl mx-auto mt-24 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[var(--siliq-line)] pb-3">
              <Search className="w-5 h-5 text-[var(--siliq-accent)]" />
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchOpen(false);
                    router.push(`/shop?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
                  }
                }}
                className="flex-1 text-base outline-none bg-transparent"
              />
              <button onClick={() => setSearchOpen(false)} className="text-xs text-[var(--siliq-accent)] uppercase tracking-wider hover:text-[var(--siliq-black)]">
                ESC
              </button>
            </div>
            <p className="text-xs text-[var(--siliq-accent)] mt-3">Press Enter to search the shop</p>
          </div>
        </div>
      )}
    </>
  );
}
