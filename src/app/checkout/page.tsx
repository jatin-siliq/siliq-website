"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth-store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, CheckCircle2 } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, showToast } = useStore();
  const { user, isLoggedIn, markWelcomeOfferUsed, addOrder, saveAddress } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", address2: "", city: "", state: "", pincode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shippingCost = cartTotal >= 2500 ? 0 : (cartTotal === 0 ? 0 : 99);
  const discountAmount = discount;
  const total = cartTotal - discountAmount + shippingCost;

  const applyCoupon = async () => {
    setCouponError("");
    const code = coupon.toUpperCase();
    // WELCOME10 special handling for logged-in users
    if (code === "WELCOME10") {
      if (!isLoggedIn) { setCouponError("Please login to use this coupon"); return; }
      if (user?.welcomeOfferUsed) { setCouponError("You've already used your welcome offer"); return; }
    }
    // Try validating against manager API (runs locally)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/validate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, orderTotal: cartTotal }),
      });
      const data = await res.json();
      if (data.valid) {
        setDiscount(data.discount);
        showToast(`Coupon applied! ₹${data.discount} off`);
        return;
      }
      setCouponError(data.message || "Invalid coupon code");
    } catch {
      // Fallback: if manager not running, only WELCOME10 works
      if (code === "WELCOME10" && isLoggedIn && !user?.welcomeOfferUsed) {
        setDiscount(Math.round(cartTotal * 0.1));
        showToast("10% welcome discount applied!");
      } else {
        setCouponError("Invalid coupon code");
      }
    }
  };

  const placeOrder = async () => {
    setPlacing(true);
    const id = "SILIQ-" + Date.now().toString().slice(-6);

    // Load Razorpay script if not loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);
      await new Promise((r) => { script.onload = r; });
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      amount: total * 100, // Razorpay takes amount in paise
      currency: "INR",
      name: "SILIQ",
      description: `Order ${id} — ${cart.reduce((s, i) => s + i.quantity, 0)} item(s)`,
      image: "/logo/siliq-black.png",
      prefill: {
        name: `${shipping.firstName} ${shipping.lastName}`,
        email: shipping.email,
        contact: shipping.phone,
      },
      theme: { color: "#0A0A0A" },
      handler: async (response: { razorpay_payment_id: string }) => {
        // Payment successful
        setOrderId(id);
        if (discount > 0 && coupon.toUpperCase() === "WELCOME10") markWelcomeOfferUsed();
        if (isLoggedIn) {
          addOrder({ total, items: cart.reduce((s, i) => s + i.quantity, 0) });
          // Save address for future use
          saveAddress({ label: "Home", firstName: shipping.firstName, lastName: shipping.lastName, email: shipping.email, phone: shipping.phone, address: shipping.address, address2: shipping.address2, city: shipping.city, state: shipping.state, pincode: shipping.pincode });
        }
        // Send order to manager (if running)
        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id, total, items: cart.reduce((s, i) => s + i.quantity, 0),
              paymentId: response.razorpay_payment_id,
              customer: { name: `${shipping.firstName} ${shipping.lastName}`, email: shipping.email, phone: shipping.phone },
              shipping, coupon: discount > 0 ? coupon.toUpperCase() : null,
            }),
          });
          if (discount > 0) await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/coupons/use/${coupon.toUpperCase()}`, { method: "POST" });
        } catch {}
        setStep(3);
        clearCart();
        showToast("Payment successful! Order confirmed.");
        setPlacing(false);
      },
      modal: {
        ondismiss: () => { setPlacing(false); },
      },
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rzp = new ((window as any).Razorpay)(options);
    rzp.open();
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h1 className="font-display text-3xl mb-3">Your bag is empty</h1>
        <p className="text-sm text-[var(--siliq-accent)] mb-8">Add items before checking out.</p>
        <Link href="/shop" className="px-8 py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase">Shop Now</Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <AuroraBackground variant="light" intensity="normal" className="bg-white">
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mb-6" strokeWidth={1.2} />
          <h1 className="font-display text-4xl font-light mb-3">Order Confirmed</h1>
          <p className="text-sm text-[var(--siliq-graphite)] mb-2">Thank you for your order!</p>
          <p className="text-xs tracking-wider uppercase text-[var(--siliq-accent)] mb-8">Order ID: <span className="text-[var(--siliq-black)] font-medium">{orderId}</span></p>
          <p className="text-sm text-[var(--siliq-graphite)] max-w-md mb-8">We&apos;ve sent a confirmation email to <strong>{shipping.email || "your email"}</strong>. Your pieces are being prepared with care.</p>
          <div className="flex gap-3">
            <Link href="/shop" className="px-6 py-3 border border-[var(--siliq-black)] text-xs tracking-[0.2em] uppercase">Continue Shopping</Link>
            <button onClick={() => router.push("/")} className="px-6 py-3 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase">Back Home</button>
          </div>
        </div>
      </AuroraBackground>
    );
  }

  const validateShipping = () => {
    const e: Record<string, string> = {};
    if (!shipping.firstName.trim()) e.firstName = "Name is required";
    if (!shipping.lastName.trim()) e.lastName = "Last name is required";
    if (!shipping.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) e.email = "Enter a valid email";
    if (!shipping.phone.trim()) e.phone = "Phone is required";
    else if (!/^\+?[\d\s-]{10,}$/.test(shipping.phone)) e.phone = "Enter a valid 10-digit number";
    if (!shipping.address.trim()) e.address = "Address is required";
    else if (shipping.address.trim().length < 15) e.address = "Enter full address (house no, street, area)";
    if (!shipping.city.trim()) e.city = "City is required";
    if (!shipping.state.trim()) e.state = "Select your state";
    if (!shipping.pincode.trim()) e.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(shipping.pincode.trim())) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-light mb-3">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-2 text-xs tracking-wider uppercase mb-10">
          <span className={step >= 1 ? "text-[var(--siliq-black)] font-medium" : "text-[var(--siliq-accent)]"}>1. Shipping</span>
          <span className="text-[var(--siliq-accent)]">→</span>
          <span className={step >= 2 ? "text-[var(--siliq-black)] font-medium" : "text-[var(--siliq-accent)]"}>2. Payment</span>
          <span className="text-[var(--siliq-accent)]">→</span>
          <span className="text-[var(--siliq-accent)]">3. Confirmation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div>
                <h2 className="font-display text-2xl mb-6">Shipping Address</h2>
                
                {/* Saved address selector */}
                {isLoggedIn && user?.addresses && user.addresses.length > 0 && (
                  <div className="mb-6 p-4 bg-[var(--siliq-cream)] border border-[var(--siliq-line)]">
                    <p className="text-xs font-medium tracking-[0.1em] uppercase mb-3">Use Saved Address</p>
                    <div className="space-y-2">
                      {user.addresses.map((addr) => (
                        <button key={addr.id} onClick={() => setShipping({ firstName: addr.firstName, lastName: addr.lastName, email: addr.email, phone: addr.phone, address: addr.address, address2: addr.address2 || "", city: addr.city, state: addr.state, pincode: addr.pincode })} className="w-full text-left p-3 border border-[var(--siliq-line)] bg-white hover:border-[var(--siliq-black)] transition-colors text-xs">
                          <span className="font-medium">{addr.firstName} {addr.lastName}</span> — {addr.address}, {addr.city}, {addr.state} {addr.pincode}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="checkout-firstName" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">First Name <span className="text-red-500">*</span></label>
                    <input id="checkout-firstName" type="text" value={shipping.firstName} onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })} placeholder="First name" className={`w-full px-4 py-3 border bg-white text-sm outline-none transition-colors ${errors.firstName ? "border-red-400" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                    {errors.firstName && <p className="text-[10px] text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-lastName" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Last Name <span className="text-red-500">*</span></label>
                    <input id="checkout-lastName" type="text" value={shipping.lastName} onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })} placeholder="Last name" className={`w-full px-4 py-3 border bg-white text-sm outline-none transition-colors ${errors.lastName ? "border-red-400" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                    {errors.lastName && <p className="text-[10px] text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-email" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Email <span className="text-red-500">*</span></label>
                    <input id="checkout-email" type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} placeholder="you@email.com" className={`w-full px-4 py-3 border bg-white text-sm outline-none transition-colors ${errors.email ? "border-red-400" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-phone" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Phone <span className="text-red-500">*</span></label>
                    <input id="checkout-phone" type="tel" value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className={`w-full px-4 py-3 border bg-white text-sm outline-none transition-colors ${errors.phone ? "border-red-400" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="checkout-address" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Address <span className="text-red-500">*</span></label>
                    <input id="checkout-address" type="text" value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} placeholder="House/Flat No, Street, Area, Landmark" className={`w-full px-4 py-3 border bg-white text-sm outline-none transition-colors ${errors.address ? "border-red-400" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                    {errors.address && <p className="text-[10px] text-red-500 mt-1">{errors.address}</p>}
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="checkout-address2" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Address Line 2 <span className="text-[var(--siliq-accent)] font-normal normal-case">(optional)</span></label>
                    <input id="checkout-address2" type="text" value={shipping.address2 || ""} onChange={(e) => setShipping({ ...shipping, address2: e.target.value })} placeholder="Apartment, floor, nearby landmark (optional)" className="w-full px-4 py-3 border border-[var(--siliq-line)] bg-white text-sm outline-none transition-colors focus:border-[var(--siliq-black)]" />
                  </div>
                  <div>
                    <label htmlFor="checkout-city" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">City <span className="text-red-500">*</span></label>
                    <input id="checkout-city" type="text" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} placeholder="City" className={`w-full px-4 py-3 border bg-white text-sm outline-none transition-colors ${errors.city ? "border-red-400" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                    {errors.city && <p className="text-[10px] text-red-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-state" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">State <span className="text-red-500">*</span></label>
                    <select id="checkout-state" value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className={`w-full px-4 py-3 border bg-white text-sm outline-none transition-colors appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238b8680%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center] ${errors.state ? "border-red-400" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`}>
                      <option value="">Select State</option>
                      {["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir","Ladakh","Chandigarh","Puducherry"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="text-[10px] text-red-500 mt-1">{errors.state}</p>}
                  </div>
                  <div>
                    <label htmlFor="checkout-pincode" className="block text-xs font-medium tracking-[0.1em] uppercase mb-2">Pincode <span className="text-red-500">*</span></label>
                    <input id="checkout-pincode" type="text" value={shipping.pincode} onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} placeholder="6-digit pincode" maxLength={6} className={`w-full px-4 py-3 border bg-white text-sm outline-none transition-colors ${errors.pincode ? "border-red-400" : "border-[var(--siliq-line)] focus:border-[var(--siliq-black)]"}`} />
                    {errors.pincode && <p className="text-[10px] text-red-500 mt-1">{errors.pincode}</p>}
                  </div>
                </div>
                <button onClick={() => { if (validateShipping()) setStep(2); }} className="mt-8 px-10 py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-charcoal)] transition-colors">Continue to Payment</button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-2xl mb-6">Review & Pay</h2>
                
                <div className="border border-[var(--siliq-line)] p-5 mb-6">
                  <p className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--siliq-accent)] mb-3">Shipping To</p>
                  <p className="text-sm font-medium">{shipping.firstName} {shipping.lastName}</p>
                  <p className="text-sm text-[var(--siliq-graphite)]">{shipping.address}{shipping.address2 ? `, ${shipping.address2}` : ""}</p>
                  <p className="text-sm text-[var(--siliq-graphite)]">{shipping.city}, {shipping.state} — {shipping.pincode}</p>
                  <p className="text-sm text-[var(--siliq-graphite)]">{shipping.phone} · {shipping.email}</p>
                  <button onClick={() => setStep(1)} className="text-xs text-[var(--siliq-accent)] underline mt-3">Edit Address</button>
                </div>

                <div className="border border-[var(--siliq-line)] p-5 mb-6">
                  <p className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--siliq-accent)] mb-3">Payment</p>
                  <p className="text-sm text-[var(--siliq-graphite)]">You&apos;ll be redirected to Razorpay&apos;s secure payment page where you can pay via UPI, Card, Net Banking, or Wallet.</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-[var(--siliq-accent)]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-bit SSL encrypted · PCI-DSS compliant</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-4 border border-[var(--siliq-line)] text-xs tracking-[0.2em] uppercase">Back</button>
                  <button onClick={placeOrder} disabled={placing} className="flex-1 px-10 py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-charcoal)] transition-colors disabled:opacity-60">
                    {placing ? "Opening Payment..." : `Pay ₹${total.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[var(--siliq-pearl)] p-6 sticky top-24">
              <h3 className="font-display text-xl mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id + (item.size || "")} className="flex gap-3">
                    <div className="w-14 h-16 bg-white shrink-0 overflow-hidden">
                      <Image src={item.product.images[0]} alt={item.product.name} width={56} height={64} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-medium">{item.product.name}</p>
                      {item.size && <p className="text-[var(--siliq-accent)]">Size: {item.size}</p>}
                      <p className="text-[var(--siliq-accent)]">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-xs font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm pt-4 border-t border-[var(--siliq-line)]">
                {/* Coupon */}
                <div className="pb-3">
                  <div className="flex gap-2">
                    <input type="text" value={coupon} onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }} placeholder="Coupon code" className="flex-1 px-3 py-2 border border-[var(--siliq-line)] text-xs bg-white outline-none" disabled={discount > 0} />
                    <button onClick={applyCoupon} disabled={!coupon || discount > 0} className="px-3 py-2 bg-[var(--siliq-black)] text-white text-[10px] tracking-wider uppercase disabled:opacity-40">{discount > 0 ? "Applied" : "Apply"}</button>
                  </div>
                  {couponError && <p className="text-[10px] text-red-600 mt-1">{couponError}</p>}
                  {!isLoggedIn && <p className="text-[10px] text-[var(--siliq-accent)] mt-1"><Link href="/account" className="underline">Login</Link> to use welcome offer</p>}
                </div>
                <div className="flex justify-between"><span className="text-[var(--siliq-graphite)]">Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-green-700"><span>Discount (10%)</span><span>-₹{discountAmount.toLocaleString()}</span></div>}
                <div className="flex justify-between"><span className="text-[var(--siliq-graphite)]">Shipping</span><span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span></div>
                <div className="flex justify-between font-medium pt-2 border-t border-[var(--siliq-line)]"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Checkout page complete
