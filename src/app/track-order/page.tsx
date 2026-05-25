"use client";
import { useState } from "react";
import { Package, CheckCircle2, Truck, Box, MapPin, Clock, AlertCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { motion, AnimatePresence } from "framer-motion";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [tracking, setTracking] = useState<{ status: string; date: string; location: string; active: boolean }[] | null>(null);
  const [orderInfo, setOrderInfo] = useState<{ id: string; status: string; items: number; total: number; placed: string; estimated: string } | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!orderId.trim()) { setError("Please enter your Order ID"); return; }
    if (!email.trim()) { setError("Please enter your email"); return; }
    if (!orderId.toUpperCase().startsWith("SILIQ-")) { setError("Order ID should start with SILIQ- (e.g. SILIQ-123456)"); return; }

    // Simulate tracking result
    setOrderInfo({
      id: orderId.toUpperCase(),
      status: "In Transit",
      items: 2,
      total: 5498,
      placed: "22 May 2026",
      estimated: "26 May 2026",
    });
    setTracking([
      { status: "Order Placed", date: "22 May, 11:30 AM", location: "Online", active: false },
      { status: "Payment Confirmed", date: "22 May, 11:31 AM", location: "Razorpay", active: false },
      { status: "Order Processing", date: "22 May, 2:00 PM", location: "SILIQ Studio, Ghaziabad", active: false },
      { status: "Quality Check Passed", date: "23 May, 10:15 AM", location: "SILIQ Studio, Ghaziabad", active: false },
      { status: "Dispatched", date: "23 May, 4:30 PM", location: "Ghaziabad Courier Hub", active: false },
      { status: "In Transit", date: "24 May, 9:00 AM", location: "On the way to your city", active: true },
    ]);
  };

  const getIcon = (i: number, total: number) => {
    if (i === 0) return Package;
    if (i === 1) return CheckCircle2;
    if (i === total - 1) return Truck;
    if (i === total - 2) return MapPin;
    return Box;
  };

  return (
    <>
      <PageHero
        label="Tracking"
        title="Track Your Order"
        subtitle="Follow your piece from our studio to your door."
        image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=800&fit=crop"
      />
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto">

          {/* Track Form */}
          <div className="border border-[var(--siliq-line)] p-8 mb-12">
            <h2 className="font-display text-2xl font-light mb-6">Enter Order Details</h2>
            <form onSubmit={handleTrack} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Order ID <span className="text-red-500">*</span></label>
                <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="SILIQ-123456" className="w-full px-4 py-3 border border-[var(--siliq-line)] bg-transparent text-sm focus:border-[var(--siliq-black)] outline-none transition-colors" />
                <p className="text-[10px] text-[var(--siliq-accent)] mt-1">Found in your order confirmation email or WhatsApp message</p>
              </div>
              <div>
                <label className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Email Address <span className="text-red-500">*</span></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="The email used when ordering" className="w-full px-4 py-3 border border-[var(--siliq-line)] bg-transparent text-sm focus:border-[var(--siliq-black)] outline-none transition-colors" />
              </div>
              {error && <p className="text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
              <button type="submit" className="w-full py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-charcoal)] transition-colors">Track Order</button>
            </form>
          </div>

          {/* Tracking Result */}
          <AnimatePresence>
            {tracking && orderInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Order Summary */}
                <div className="border border-[var(--siliq-line)] p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-[var(--siliq-accent)] tracking-wider uppercase">Order</p>
                      <p className="text-lg font-medium font-mono">{orderInfo.id}</p>
                    </div>
                    <span className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 tracking-wider uppercase font-medium">{orderInfo.status}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[var(--siliq-line)]">
                    <div>
                      <p className="text-[10px] text-[var(--siliq-accent)] uppercase tracking-wider">Items</p>
                      <p className="text-sm font-medium">{orderInfo.items}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--siliq-accent)] uppercase tracking-wider">Total</p>
                      <p className="text-sm font-medium">₹{orderInfo.total.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--siliq-accent)] uppercase tracking-wider">Placed</p>
                      <p className="text-sm font-medium">{orderInfo.placed}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--siliq-accent)] uppercase tracking-wider">Est. Delivery</p>
                      <p className="text-sm font-medium">{orderInfo.estimated}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border border-[var(--siliq-line)] p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-4 h-4 text-[var(--siliq-accent)]" />
                    <h3 className="text-xs font-medium tracking-[0.15em] uppercase">Shipment Progress</h3>
                  </div>
                  <div className="space-y-0">
                    {tracking.map((t, i) => {
                      const Icon = getIcon(i, tracking.length);
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.3 }}
                          className="flex gap-4"
                        >
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${t.active ? "bg-[var(--siliq-black)] text-white" : "bg-[var(--siliq-pearl)] text-[var(--siliq-graphite)]"}`}>
                              <Icon className="w-4 h-4" strokeWidth={1.5} />
                            </div>
                            {i < tracking.length - 1 && <div className={`w-px h-8 ${t.active ? "bg-[var(--siliq-black)]" : "bg-[var(--siliq-line)]"}`} />}
                          </div>
                          <div className="pb-6">
                            <p className={`text-sm ${t.active ? "font-medium" : ""}`}>{t.status}</p>
                            <p className="text-xs text-[var(--siliq-accent)] mt-0.5">{t.date} · {t.location}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-4 bg-[var(--siliq-cream)] flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[var(--siliq-graphite)]" strokeWidth={1.5} />
                    <div>
                      <p className="text-xs font-medium">Estimated Delivery</p>
                      <p className="text-sm text-[var(--siliq-graphite)]">{orderInfo.estimated} by 7:00 PM</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Help Section */}
          <div className="mt-12 pt-10 border-t border-[var(--siliq-line)]">
            <h3 className="font-display text-xl text-center mb-6">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="mailto:support@siliq.co" className="flex items-center gap-3 p-4 border border-[var(--siliq-line)] hover:border-[var(--siliq-black)] transition-colors">
                <div className="w-10 h-10 bg-[var(--siliq-pearl)] rounded-full flex items-center justify-center"><Package className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs font-medium tracking-wider uppercase">Email Support</p>
                  <p className="text-xs text-[var(--siliq-accent)]">support@siliq.co</p>
                </div>
              </a>
              <a href="https://wa.me/918954849236" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border border-[var(--siliq-line)] hover:border-[var(--siliq-black)] transition-colors">
                <div className="w-10 h-10 bg-[var(--siliq-pearl)] rounded-full flex items-center justify-center"><Truck className="w-4 h-4" /></div>
                <div>
                  <p className="text-xs font-medium tracking-wider uppercase">WhatsApp</p>
                  <p className="text-xs text-[var(--siliq-accent)]">+91 89548 49236</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
