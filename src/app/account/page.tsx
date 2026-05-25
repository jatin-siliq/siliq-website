"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth-store";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Package, Tag, MapPin, Heart, Shield, Gift } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { user, isLoggedIn, login, signup, logout, deleteAddress } = useAuth();
  const { showToast } = useStore();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(form.email, form.password);
    if (!ok) { setError("Invalid email or password"); return; }
    showToast("Welcome back!");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Name is required"); return; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) { setError("Enter a valid email address"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    const ok = signup(form.name, form.email, form.password);
    if (!ok) { setError("An account with this email already exists"); return; }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, name: form.name }),
      });
    } catch {}
    setShowSuccess(true);
    showToast("Account created! Check your email for your welcome offer.");
  };

  // Success animation after signup
  if (showSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-10 text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }} className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="font-display text-4xl font-light mb-3">Welcome to SILIQ</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-sm text-[var(--siliq-graphite)] mb-6">Your account is ready. We&apos;ve sent a welcome email with your exclusive 10% discount code.</motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="bg-[var(--siliq-pearl)] border border-[var(--siliq-line)] p-4 mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--siliq-accent)] mb-1">Your welcome code</p>
            <p className="text-2xl font-medium tracking-[0.15em]">WELCOME10</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex gap-3 justify-center">
            <Link href="/shop" className="px-8 py-3 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase">Shop Now</Link>
            <button onClick={() => setShowSuccess(false)} className="px-8 py-3 border border-[var(--siliq-line)] text-xs tracking-[0.2em] uppercase">My Account</button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Logged in dashboard
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

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            {[
              { icon: Package, label: "Orders", href: "/track-order" },
              { icon: Heart, label: "Wishlist", href: "/wishlist" },
              { icon: Shield, label: "Care Guide", href: "/care-guide" },
              { icon: Gift, label: "Refer & Earn", href: "/contact" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="border border-[var(--siliq-line)] p-4 text-center hover:border-[var(--siliq-black)] transition-colors">
                <item.icon className="w-5 h-5 mx-auto mb-2 text-[var(--siliq-accent)]" strokeWidth={1.2} />
                <p className="text-[10px] tracking-[0.15em] uppercase">{item.label}</p>
              </Link>
            ))}
          </div>

          {/* Welcome Offer */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="border border-[var(--siliq-line)] p-6 mb-8">
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
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-4 h-4 text-[var(--siliq-accent)]" />
              <h3 className="text-sm font-medium tracking-[0.1em] uppercase">Saved Addresses</h3>
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

          {/* Care Tips */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8 bg-[var(--siliq-pearl)] p-6">
            <h3 className="text-sm font-medium tracking-[0.1em] uppercase mb-3">💎 Care Tips for Your Silver</h3>
            <ul className="space-y-2 text-xs text-[var(--siliq-graphite)]">
              <li>• Store in the SILIQ pouch when not wearing</li>
              <li>• Wipe gently with the polishing cloth after each wear</li>
              <li>• Remove before swimming, showering, or applying perfume</li>
              <li>• <Link href="/care-guide" className="underline">Read full care guide →</Link></li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Login/Signup page
  return (
    <div className="min-h-[70vh] grid lg:grid-cols-2 lg:h-[700px]">
      {/* Left — Image (desktop only) */}
      <div className="hidden lg:block relative overflow-hidden bg-[var(--siliq-pearl)]" key="login-image">
        <img src="https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=1200&fit=crop" alt="SILIQ Silver Jewellery" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <p className="text-white/70 text-xs tracking-[0.2em] uppercase mb-2">Handcrafted in 925 Silver</p>
          <h2 className="text-white font-display text-3xl font-light">Timeless Elegance,<br />Everyday Luxury</h2>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex items-center justify-center py-16 px-6 lg:overflow-y-auto lg:h-[700px]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>
              <User className="w-8 h-8 mx-auto mb-4 text-[var(--siliq-accent)]" strokeWidth={1.2} />
            </motion.div>
            <h1 className="font-display text-3xl font-light">{mode === "login" ? "Welcome Back" : "Create Account"}</h1>
            <p className="text-sm text-[var(--siliq-accent)] mt-2">
              {mode === "login" ? "Sign in to your SILIQ account" : "Sign up and get 10% off your first order"}
            </p>
          </div>

          <div className="flex border-b border-[var(--siliq-line)] mb-8">
            {(["login", "signup"] as const).map((tab) => (
              <button key={tab} onClick={() => { setMode(tab); setError(""); }} className={`flex-1 py-3 text-xs tracking-[0.15em] uppercase transition-colors ${mode === tab ? "text-[var(--siliq-black)] border-b-2 border-[var(--siliq-black)]" : "text-[var(--siliq-accent)]"}`}>
                {tab === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form key={mode} initial={{ opacity: 0, x: mode === "login" ? -10 : 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: mode === "login" ? 10 : -10 }} transition={{ duration: 0.15 }} onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-5">
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Full Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 border border-[var(--siliq-line)] bg-transparent text-sm focus:border-[var(--siliq-black)] outline-none transition-colors" placeholder="Your full name" />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Email Address</label>
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
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center mt-6 space-y-3">
              <p className="text-xs text-[var(--siliq-accent)]">{"🎁 New accounts get "}<strong>10% off</strong>{" with code WELCOME10"}</p>
              <p className="text-[10px] text-[var(--siliq-accent)] leading-relaxed">
                {"By creating an account, you agree to our "}
                <Link href="/terms" className="underline">Terms</Link>
                {" and "}
                <Link href="/privacy" className="underline">Privacy Policy</Link>
                {"."}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
