"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { products as staticProducts, Product, categories, collections } from "@/lib/data";

type ProductsCtx = { products: Product[]; loading: boolean };
const ProductsContext = createContext<ProductsCtx>({ products: staticProducts, loading: false });

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = () => fetch("/api/proxy/", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: "/api/products", method: "GET", body: null }),
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.products?.length) setProducts(data.products); })
      .catch(() => {})
      .finally(() => setLoading(false));
    load();
    const timer = setTimeout(load, 5000);
    return () => clearTimeout(timer);
  }, []);

  return <ProductsContext.Provider value={{ products, loading }}>{children}</ProductsContext.Provider>;
}

export function useProducts() { return useContext(ProductsContext); }

// Re-export for backward compatibility
export { categories, collections };
export type { Product };
