"use client";
import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { Product } from "@/lib/data";

type CartItem = { product: Product; quantity: number; size?: string };
type Toast = { id: number; message: string; type: "success" | "error" | "info" };

type StoreContextType = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, qty: number, size?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: number) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);
const CART_KEY = "siliq_cart";
const WISHLIST_KEY = "siliq_wishlist";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISHLIST_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => { if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist)); }, [wishlist, hydrated]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToCart = useCallback((product: Product, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      const maxStock = product.stock || 99;
      if (existing) {
        if (existing.quantity >= maxStock) return prev;
        return prev.map((i) => i.product.id === product.id && i.size === size ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1, size }];
    });
    showToast(`${product.name} added to bag`);
  }, [showToast]);

  const removeFromCart = useCallback((productId: string, size?: string) => {
    setCart((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number, size?: string) => {
    if (qty <= 0) return removeFromCart(productId, size);
    setCart((prev) => prev.map((i) => i.product.id === productId && i.size === size ? { ...i, quantity: qty } : i));
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        showToast(`${product.name} removed from wishlist`, "info");
        return prev.filter((p) => p.id !== product.id);
      }
      showToast(`${product.name} added to wishlist`);
      return [...prev, product];
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId: string) => wishlist.some((p) => p.id === productId), [wishlist]);

  return (
    <StoreContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, toggleWishlist, isInWishlist, toasts, showToast, removeToast }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
