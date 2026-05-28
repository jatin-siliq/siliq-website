"use client";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, Search, Menu, X, ChevronDown, User } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth-store";
import { useProducts } from "@/lib/products-provider";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop", mega: [
    { title: "Categories", links: [
      { href: "/shop?category=rings", label: "Rings" },
      { href: "/shop?category=necklaces", label: "Necklaces" },
      { href: "/shop?category=earrings", label: "Earrings" },
      { href: "/shop?category=bracelets", label: "Bracelets" },
      { href: "/shop?category=anklets", label: "Anklets" },
    ]},
    { title: "Collections", links: [
      { href: "/shop", label: "All Pieces" },
      { href: "/shop?tag=new", label: "New Arrivals" },
      { href: "/shop?tag=bestseller", label: "Bestsellers" },
    ]},
  ]},
  { href: "/about", label: "About" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { products } = useProducts();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const { cartCount, wishlist } = useStore();
  const { isLoggedIn } = useAuth();

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const searchResults = useMemo(() => {
    if (!searchQ.trim()) return [];
    const q = searchQ.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQ]);

  const closeSearch = () => { setSearchOpen(false); setSearchQ(""); };

  return (
    <>
      <div className="bg-[var(--siliq-black)] text-white text-center py-2 px-4">
        <p className="text-[10px] tracking-[0.2em] uppercase">Free Shipping on Orders Above ₹2,500 | Use Code WELCOME10 for 10% Off</p>
      </div>

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[var(--siliq-line)]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.span>
            </AnimatePresence>
          </button>

          <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center" aria-label="SILIQ Home">
            <Image src="/logo/siliq-black.svg" alt="SILIQ" width={120} height={56} className="h-10 md:h-12 w-auto" priority />
          </Link>

          <nav className="hidden md:flex items-center gap-7 ml-12" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div key={link.href} className="relative" onMouseEnter={() => link.mega && openMega()} onMouseLeave={() => link.mega && scheduleCloseMega()} onFocus={() => link.mega && openMega()} onBlur={(e) => { if (link.mega && !e.currentTarget.contains(e.relatedTarget)) scheduleCloseMega(); }} onKeyDown={(e) => { if (link.mega && e.key === "Escape") { setMegaOpen(false); (e.currentTarget.querySelector("a") as HTMLElement)?.focus(); } }}>
                <Link href={link.href} className="text-[11px] font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] hover:opacity-60 transition-opacity flex items-center gap-1 py-5" aria-expanded={link.mega ? megaOpen : undefined} aria-haspopup={link.mega ? "true" : undefined}>
                  {link.label}
                  {link.mega && <ChevronDown className="w-3 h-3" />}
                </Link>

                <AnimatePresence>
                  {link.mega && megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute top-full left-0 pt-2 z-50"
                      onMouseEnter={openMega}
                      onMouseLeave={scheduleCloseMega}
                    >
                      <div className="bg-white border border-[var(--siliq-line)] shadow-lg p-8 min-w-[400px] grid grid-cols-2 gap-8">
                        {link.mega.map((col) => (
                          <div key={col.title}>
                            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--siliq-accent)] mb-3">{col.title}</p>
                            <ul className="space-y-2">
                              {col.links.map((l, idx) => (
                                <motion.li
                                  key={l.href}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.05 + idx * 0.03, duration: 0.25 }}
                                >
                                  <Link href={l.href} className="text-sm hover:text-[var(--siliq-accent)] transition-colors">{l.label}</Link>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/account" className="relative hover:opacity-60 transition-opacity" aria-label="Account">
              <User className="w-[18px] h-[18px]" />
              {isLoggedIn && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />}
            </Link>
            <button onClick={() => setSearchOpen(true)} aria-label="Search" className="hover:opacity-60 transition-opacity">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <Link href="/wishlist" className="relative hover:opacity-60 transition-opacity" aria-label="Wishlist">
              <Heart className="w-[18px] h-[18px]" />
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span
                    key="wishlist-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--siliq-black)] text-white text-[9px] rounded-full flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <Link href="/cart" className="relative hover:opacity-60 transition-opacity" aria-label="Cart">
              <ShoppingBag className="w-[18px] h-[18px]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={`cart-${cartCount}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[var(--siliq-black)] text-white text-[9px] rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden border-t border-[var(--siliq-line)] bg-white overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                  >
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="block text-sm tracking-[0.1em] uppercase font-medium">{link.label}</Link>
                    {link.mega && (
                      <div className="ml-4 mt-2 space-y-1">
                        {link.mega.flatMap((col) => col.links).map((l) => (
                          <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="block text-sm text-[var(--siliq-graphite)] py-1">{l.label}</Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="pt-4 border-t border-[var(--siliq-line)] space-y-3"
                >
                  <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="block text-sm tracking-[0.1em] uppercase">Wishlist ({wishlist.length})</Link>
                  <Link href="/cart" onClick={() => setMobileOpen(false)} className="block text-sm tracking-[0.1em] uppercase">Bag ({cartCount})</Link>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            onClick={closeSearch}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="bg-white max-w-2xl mx-auto mt-24 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-[var(--siliq-line)] pb-3">
                <Search className="w-5 h-5 text-[var(--siliq-accent)]" />
                <input type="text" autoFocus value={searchQ} onChange={(e) => setSearchQ(e.target.value)} placeholder="Search for rings, necklaces, earrings..." className="flex-1 text-base outline-none bg-transparent" />
                <button onClick={closeSearch} className="text-xs text-[var(--siliq-accent)] uppercase tracking-wider hover:text-[var(--siliq-black)]">ESC</button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto mt-4">
                {searchQ.trim() === "" && (
                  <div>
                    <p className="text-xs text-[var(--siliq-accent)] tracking-wider uppercase mb-3">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {["Rings", "Necklaces", "Bestsellers", "New Arrivals", "Earrings"].map((t) => (
                        <button key={t} onClick={() => setSearchQ(t)} className="text-xs px-3 py-1.5 border border-[var(--siliq-line)] hover:border-[var(--siliq-black)] transition-colors">{t}</button>
                      ))}
                    </div>
                  </div>
                )}

                {searchQ.trim() !== "" && searchResults.length === 0 && (
                  <p className="text-sm text-[var(--siliq-accent)] py-8 text-center">No results found for &ldquo;{searchQ}&rdquo;</p>
                )}

                {searchResults.length > 0 && (
                  <div>
                    <p className="text-xs text-[var(--siliq-accent)] tracking-wider uppercase mb-3">Products ({searchResults.length})</p>
                    <div className="space-y-2">
                      {searchResults.map((p, idx) => (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04, duration: 0.25 }}
                        >
                          <Link href={`/product/${p.slug}`} onClick={closeSearch} className="flex items-center gap-4 p-2 hover:bg-[var(--siliq-pearl)] transition-colors">
                            <div className="w-14 h-16 bg-[var(--siliq-pearl)] shrink-0 overflow-hidden">
                              <Image src={p.images[0]} alt={p.name} width={56} height={64} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium">{p.name}</p>
                              <p className="text-xs text-[var(--siliq-accent)] capitalize">{p.category}</p>
                            </div>
                            <p className="text-sm font-medium">₹{p.price.toLocaleString()}</p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
