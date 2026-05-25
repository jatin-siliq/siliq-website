"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Package, Tag, MapPin } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { user, isLoggedIn, login, signup, logout, deleteAddress } = useAuth();
  const { showToast } = useStore();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(form.email, form.password);
    if (!ok) { setError("Invalid email or password"); return; }
    showToast("Welcome back!");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    const ok = signup(form.name, form.email, form.password);
    if (!ok) { setError("An account with this email already exists"); return; }
    showToast("Account created! You've unlocked your 10% welcome offer.");
  };

  // Logged in — show dashboard
  if (isLoggedIn && user) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="min-h-[70vh] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--siliq-accent)] mb-1">My Account</p>
              <h1 className="font-display text-3xl font-light">Hello, {user.name}</h1>
            </div>
            <button onClick={() => { logout(); showToast("Logged out"); }} className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-[var(--siliq-accent)] hover:text-[var(--siliq-black)] transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          {/* Welcome Offer Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="border border-[var(--siliq-line)] p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Tag className="w-4 h-4 text-[var(--siliq-accent)]" />
              <h3 className="text-sm font-medium tracking-[0.1em] uppercase">Welcome Offer — WELCOME10</h3>
            </div>
            {user.welcomeOfferUsed ? (
              <p className="text-sm text-[var(--siliq-accent)]">✓ You&apos;ve already used your one-time 10% welcome discount.</p>
            ) : (
              <p className="text-sm text-green-700">🎉 Your 10% welcome discount is available! Use code <strong>WELCOME10</strong> at checkout.</p>
            )}
          </motion.div>

          {/* Order History */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-4 h-4 text-[var(--siliq-accent)]" />
              <h3 className="text-sm font-medium tracking-[0.1em] uppercase">Order History</h3>
            </div>
            {user.orders.length === 0 ? (
              <div className="border border-[var(--siliq-line)] p-8 text-center">
                <p className="text-sm text-[var(--siliq-accent)] mb-4">No orders yet</p>
                <Link href="/shop" className="text-xs tracking-[0.15em] uppercase font-medium underline">Start Shopping →</Link>
              </div>
            ) : (
              <div className="border border-[var(--siliq-line)] divide-y divide-[var(--siliq-line)]">
                {user.orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-6 py-4">
                    <div>
                      <p className="text-sm font-medium">{order.id}</p>
                      <p className="text-xs text-[var(--siliq-accent)]">{order.date} · {order.items} item{order.items > 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">₹{order.total.toLocaleString()}</p>
                      <p className="text-xs text-[var(--siliq-accent)]">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Saved Addresses */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[var(--siliq-accent)]" />
                <h3 className="text-sm font-medium tracking-[0.1em] uppercase">Saved Addresses</h3>
              </div>
            </div>
            {user.addresses.length === 0 ? (
              <div className="border border-[var(--siliq-line)] p-8 text-center">
                <p className="text-sm text-[var(--siliq-accent)]">No saved addresses. Your address will be saved automatically after your first order.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {user.addresses.map((addr) => (
                  <div key={addr.id} className="border border-[var(--siliq-line)] p-5 flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{addr.firstName} {addr.lastName}</p>
                      <p className="text-xs text-[var(--siliq-graphite)] mt-1">{addr.address}{addr.address2 ? `, ${addr.address2}` : ""}</p>
                      <p className="text-xs text-[var(--siliq-graphite)]">{addr.city}, {addr.state} — {addr.pincode}</p>
                      <p className="text-xs text-[var(--siliq-accent)] mt-1">{addr.phone}</p>
                    </div>
                    <button onClick={() => deleteAddress(addr.id)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Not logged in — show login/signup
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <User className="w-8 h-8 mx-auto mb-4 text-[var(--siliq-accent)]" strokeWidth={1.2} />
          <h1 className="font-display text-3xl font-light">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
          <p className="text-sm text-[var(--siliq-accent)] mt-2">
            {mode === "login" ? "Sign in to your SILIQ account" : "Sign up and get 10% off your first order"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--siliq-line)] mb-8">
          {(["login", "signup"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setMode(tab); setError(""); }}
              className={`flex-1 py-3 text-xs tracking-[0.15em] uppercase transition-colors ${mode === tab ? "text-[var(--siliq-black)] border-b-2 border-[var(--siliq-black)]" : "text-[var(--siliq-accent)]"}`}
            >
              {tab === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
            transition={{ duration: 0.25 }}
            onSubmit={mode === "login" ? handleLogin : handleSignup}
            className="space-y-5"
          >
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-[var(--siliq-line)] bg-transparent text-sm focus:border-[var(--siliq-black)] outline-none transition-colors" placeholder="Your name" />
              </div>
            )}
            <div>
              <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Email</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 border border-[var(--siliq-line)] bg-transparent text-sm focus:border-[var(--siliq-black)] outline-none transition-colors" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Password</label>
              <input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-3 border border-[var(--siliq-line)] bg-transparent text-sm focus:border-[var(--siliq-black)] outline-none transition-colors" placeholder="••••••••" />
            </div>

            {error && <p className="text-xs text-red-600">{error}</p>}

            <button type="submit" className="w-full py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-charcoal)] transition-colors">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </motion.form>
        </AnimatePresence>

        {mode === "signup" && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center text-xs text-[var(--siliq-accent)] mt-6">
            🎁 New accounts get a one-time <strong>10% off</strong> with code WELCOME10
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
