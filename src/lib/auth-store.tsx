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
const USERS_KEY = "siliq_users";
const API = process.env.NEXT_PUBLIC_API_URL || "https://siliq-api.onrender.com";

// Local storage helpers for auth (passwords stay local, data syncs to Render)
function getUsers(): Record<string, { name: string; password: string; welcomeOfferUsed: boolean; orders: Order[]; addresses: Address[] }> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); } catch { return {}; }
}
function saveUsers(users: ReturnType<typeof getUsers>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return;
    const users = getUsers();
    const u = users[email];
    if (u) setUser({ email, name: u.name, welcomeOfferUsed: u.welcomeOfferUsed, orders: u.orders || [], addresses: u.addresses || [] });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const users = getUsers();
    const u = users[email];
    if (!u || u.password !== password) return false;
    localStorage.setItem(SESSION_KEY, email);
    setUser({ email, name: u.name, welcomeOfferUsed: u.welcomeOfferUsed, orders: u.orders || [], addresses: u.addresses || [] });
    return true;
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const users = getUsers();
    if (users[email]) return false;
    users[email] = { name, password, welcomeOfferUsed: false, orders: [], addresses: [] };
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, email);
    setUser({ email, name, welcomeOfferUsed: false, orders: [], addresses: [] });
    // Sync to Render API
    try { await fetch(`${API}/api/customers`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, name }) }); } catch {}
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const markWelcomeOfferUsed = useCallback(() => {
    if (!user) return;
    const users = getUsers();
    if (users[user.email]) { users[user.email].welcomeOfferUsed = true; saveUsers(users); }
    setUser(prev => prev ? { ...prev, welcomeOfferUsed: true } : null);
  }, [user]);

  const addOrder = useCallback(async (order: Omit<Order, "id" | "date" | "status">) => {
    if (!user) return;
    const newOrder: Order = { ...order, id: "SILIQ-" + Date.now().toString().slice(-6), date: new Date().toLocaleDateString("en-IN"), status: "Processing" };
    const users = getUsers();
    if (users[user.email]) { users[user.email].orders = [...(users[user.email].orders || []), newOrder]; saveUsers(users); }
    setUser(prev => prev ? { ...prev, orders: [...prev.orders, newOrder] } : null);
  }, [user]);

  const saveAddress = useCallback(async (address: Omit<Address, "id">) => {
    if (!user) return;
    const newAddr: Address = { ...address, id: Date.now().toString() };
    const users = getUsers();
    if (users[user.email]) { users[user.email].addresses = [...(users[user.email].addresses || []), newAddr]; saveUsers(users); }
    setUser(prev => prev ? { ...prev, addresses: [...prev.addresses, newAddr] } : null);
    // Sync to Render
    try { await fetch(`${API}/api/customers/${user.email}/address`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newAddr) }); } catch {}
  }, [user]);

  const deleteAddress = useCallback(async (id: string) => {
    if (!user) return;
    const users = getUsers();
    if (users[user.email]) { users[user.email].addresses = (users[user.email].addresses || []).filter(a => a.id !== id); saveUsers(users); }
    setUser(prev => prev ? { ...prev, addresses: prev.addresses.filter(a => a.id !== id) } : null);
    try { await fetch(`${API}/api/customers/${user.email}/address/${id}`, { method: "DELETE" }); } catch {}
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
