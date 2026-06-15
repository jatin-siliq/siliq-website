"use client";
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export type Address = { id: string; label: string; firstName: string; lastName: string; email: string; phone: string; address: string; address2?: string; city: string; state: string; pincode: string };
export type User = { email: string; name: string; welcomeOfferUsed: boolean; orders: Order[]; addresses: Address[] };
export type Order = { id: string; date: string; total: number; items: number; status: string };

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  markWelcomeOfferUsed: () => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => Promise<void>;
  saveAddress: (address: Omit<Address, "id">) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);
const SESSION_KEY = "siliq_session";

function proxyFetch(endpoint: string, body?: unknown) {
  return fetch("/api/proxy/", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint, method: "POST", body }),
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // On mount, restore session
  useEffect(() => {
    const email = typeof window !== "undefined" ? localStorage.getItem(SESSION_KEY) : null;
    if (!email) return;
    fetch(`/api/proxy/`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: `/api/customers/${encodeURIComponent(email)}`, method: "GET", body: null }),
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.found && data.customer) {
          const c = data.customer;
          setUser({ email: c.email, name: c.name || "", welcomeOfferUsed: (c.couponsUsed || []).includes("WELCOME10"), orders: c.orderHistory || [], addresses: c.addresses || [] });
        }
      })
      .catch(() => {});
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });
      if (!res.ok) return false;
      const { customer: c } = await res.json();
      localStorage.setItem(SESSION_KEY, email);
      setUser({ email: c.email, name: c.name || "", welcomeOfferUsed: (c.couponsUsed || []).includes("WELCOME10"), orders: c.orderHistory || [], addresses: c.addresses || [] });
      return true;
    } catch { return false; }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "signup", name, email, password }),
      });
      if (!res.ok) return false;
      const { customer: c } = await res.json();
      localStorage.setItem(SESSION_KEY, email);
      setUser({ email: c.email, name: c.name, welcomeOfferUsed: false, orders: [], addresses: [] });
      return true;
    } catch { return false; }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const markWelcomeOfferUsed = useCallback(() => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, welcomeOfferUsed: true } : null);
    proxyFetch(`/api/customers/${encodeURIComponent(user.email)}/used-coupon`, { code: "WELCOME10" }).catch(() => {});
  }, [user]);

  const addOrder = useCallback(async (order: Omit<Order, "id" | "date" | "status">) => {
    if (!user) return;
    const newOrder: Order = { ...order, id: "SILIQ-" + Date.now().toString().slice(-6), date: new Date().toLocaleDateString("en-IN"), status: "Processing" };
    setUser(prev => prev ? { ...prev, orders: [...prev.orders, newOrder] } : null);
  }, [user]);

  const saveAddress = useCallback(async (address: Omit<Address, "id">) => {
    if (!user) return;
    const newAddr: Address = { ...address, id: Date.now().toString() };
    setUser(prev => prev ? { ...prev, addresses: [...prev.addresses, newAddr] } : null);
    proxyFetch(`/api/customers/${encodeURIComponent(user.email)}/address`, newAddr).catch(() => {});
  }, [user]);

  const deleteAddress = useCallback(async (id: string) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, addresses: prev.addresses.filter(a => a.id !== id) } : null);
    fetch(`/api/proxy/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ endpoint: `/api/customers/${encodeURIComponent(user.email)}/address/${id}`, method: "DELETE", body: null }) }).catch(() => {});
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, signup, logout, markWelcomeOfferUsed, addOrder, saveAddress, deleteAddress }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
