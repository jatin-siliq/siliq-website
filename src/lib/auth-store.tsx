"use client";
import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export type Address = { id: string; label: string; firstName: string; lastName: string; email: string; phone: string; address: string; address2?: string; city: string; state: string; pincode: string };
export type User = { email: string; name: string; welcomeOfferUsed: boolean; orders: Order[]; addresses: Address[] };
export type Order = { id: string; date: string; total: number; items: number; status: string };

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  markWelcomeOfferUsed: () => void;
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => void;
  saveAddress: (address: Omit<Address, "id">) => void;
  deleteAddress: (id: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);
const USERS_KEY = "siliq_users";
const SESSION_KEY = "siliq_session";

function getUsers(): Record<string, { name: string; password: string; welcomeOfferUsed: boolean; orders: Order[]; addresses: Address[] }> {
  if (typeof window === "undefined") return {};
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "{}"); } catch { return {}; }
}

function saveUsers(users: ReturnType<typeof getUsers>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): User | null {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;
  const users = getUsers();
  const u = users[session];
  if (!u) return null;
  return { email: session, name: u.name, welcomeOfferUsed: u.welcomeOfferUsed, orders: u.orders || [], addresses: u.addresses || [] };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(loadSession());
  }, []);

  const login = useCallback((email: string, password: string) => {
    const users = getUsers();
    const u = users[email];
    if (!u || u.password !== password) return false;
    localStorage.setItem(SESSION_KEY, email);
    setUser({ email, name: u.name, welcomeOfferUsed: u.welcomeOfferUsed, orders: u.orders || [], addresses: u.addresses || [] });
    return true;
  }, []);

  const signup = useCallback((name: string, email: string, password: string) => {
    const users = getUsers();
    if (users[email]) return false;
    users[email] = { name, password, welcomeOfferUsed: false, orders: [], addresses: [] };
    saveUsers(users);
    localStorage.setItem(SESSION_KEY, email);
    setUser({ email, name, welcomeOfferUsed: false, orders: [], addresses: [] });
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const markWelcomeOfferUsed = useCallback(() => {
    if (!user) return;
    const users = getUsers();
    if (users[user.email]) {
      users[user.email].welcomeOfferUsed = true;
      saveUsers(users);
      setUser((prev) => prev ? { ...prev, welcomeOfferUsed: true } : null);
    }
  }, [user]);

  const addOrder = useCallback((order: Omit<Order, "id" | "date" | "status">) => {
    if (!user) return;
    const users = getUsers();
    const newOrder: Order = { ...order, id: "SILIQ-" + Date.now().toString().slice(-6), date: new Date().toLocaleDateString("en-IN"), status: "Processing" };
    if (users[user.email]) {
      users[user.email].orders = [...(users[user.email].orders || []), newOrder];
      saveUsers(users);
      setUser((prev) => prev ? { ...prev, orders: [...prev.orders, newOrder] } : null);
    }
  }, [user]);

  const saveAddress = useCallback((address: Omit<Address, "id">) => {
    if (!user) return;
    const users = getUsers();
    const newAddr: Address = { ...address, id: Date.now().toString() };
    if (users[user.email]) {
      users[user.email].addresses = [...(users[user.email].addresses || []), newAddr];
      saveUsers(users);
      setUser((prev) => prev ? { ...prev, addresses: [...prev.addresses, newAddr] } : null);
    }
  }, [user]);

  const deleteAddress = useCallback((id: string) => {
    if (!user) return;
    const users = getUsers();
    if (users[user.email]) {
      users[user.email].addresses = (users[user.email].addresses || []).filter(a => a.id !== id);
      saveUsers(users);
      setUser((prev) => prev ? { ...prev, addresses: prev.addresses.filter(a => a.id !== id) } : null);
    }
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
