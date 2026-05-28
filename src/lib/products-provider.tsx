"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { products as staticProducts, Product, categories, collections } from "@/lib/data";

type ProductsCtx = { products: Product[]; loading: boolean };
const ProductsContext = createContext<ProductsCtx>({ products: staticProducts, loading: false });

const API = process.env.NEXT_PUBLIC_API_URL || "https://siliq-product-manager-og.onrender.com";

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/products`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.products?.length) setProducts(data.products); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return <ProductsContext.Provider value={{ products, loading }}>{children}</ProductsContext.Provider>;
}

export function useProducts() { return useContext(ProductsContext); }

// Re-export for backward compatibility
export { categories, collections };
export type { Product };
