"use client";
import { useStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useStore();

  const shipping = cartTotal >= 2500 ? 0 : (cartTotal === 0 ? 0 : 99);
  const total = cartTotal + shipping;

  if (cart.length === 0) {
    return (
      <AuroraBackground variant="light" intensity="subtle" className="bg-white">
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
          <ShoppingBag className="w-16 h-16 text-[var(--siliq-line)] mb-6" strokeWidth={1} />
          <h1 className="font-display text-3xl mb-3">Your bag is empty</h1>
          <p className="text-sm text-[var(--siliq-accent)] mb-8">Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="px-8 py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase">Continue Shopping</Link>
        </div>
      </AuroraBackground>
    );
  }

  return (
    <div className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-light mb-10">Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 divide-y divide-[var(--siliq-line)]">
            {cart.map((item) => (
              <div key={item.product.id + (item.size || "")} className="flex gap-5 py-6">
                <Link href={`/product/${item.product.slug}`} className="w-24 h-32 bg-[var(--siliq-pearl)] shrink-0 overflow-hidden">
                  <Image src={item.product.images[0]} alt={item.product.name} width={96} height={128} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="text-sm font-medium hover:opacity-60">{item.product.name}</h3>
                      </Link>
                      {item.size && <p className="text-xs text-[var(--siliq-accent)] mt-1">Size: {item.size}</p>}
                      <p className="text-xs text-[var(--siliq-graphite)] mt-1">₹{item.product.price.toLocaleString()} each</p>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-[var(--siliq-accent)] hover:text-[var(--siliq-black)]" aria-label="Remove">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-[var(--siliq-line)]">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)} className="w-8 h-8 flex items-center justify-center hover:bg-[var(--siliq-pearl)]"><Minus className="w-3 h-3" /></button>
                      <span className="w-8 h-8 flex items-center justify-center text-xs border-x border-[var(--siliq-line)]">{item.quantity}</span>
                      <button onClick={() => { const max = item.product.stock || 99; if (item.quantity < max) updateQuantity(item.product.id, item.quantity + 1, item.size); }} className={`w-8 h-8 flex items-center justify-center hover:bg-[var(--siliq-pearl)] ${item.quantity >= (item.product.stock || 99) ? "opacity-30 cursor-not-allowed" : ""}`}><Plus className="w-3 h-3" /></button>
                    </div>
                    <p className="text-sm font-medium">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <button onClick={clearCart} className="text-xs text-[var(--siliq-accent)] tracking-wider uppercase hover:text-[var(--siliq-black)]">Clear Bag</button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[var(--siliq-pearl)] p-8 sticky top-24">
              <h2 className="font-display text-xl mb-6">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-[var(--siliq-graphite)]">Subtotal</span><span>₹{cartTotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-[var(--siliq-graphite)]">Shipping</span><span>{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
                <div className="border-t border-[var(--siliq-line)] pt-3 flex justify-between font-medium text-base"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>

              <div className="mt-6 p-4 bg-[var(--siliq-cream)] border border-[var(--siliq-line)] text-center">
                <p className="text-xs text-[var(--siliq-graphite)]">Have a coupon? Apply it at checkout</p>
              </div>

              <Link href="/checkout" className="block w-full mt-6 py-4 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase font-medium hover:bg-[var(--siliq-charcoal)] transition-colors text-center">Proceed to Checkout</Link>
              <Link href="/shop" className="block text-center mt-4 text-xs text-[var(--siliq-accent)] tracking-wider uppercase hover:text-[var(--siliq-black)]">Continue Shopping</Link>

              {shipping === 0 && cartTotal > 0 && <p className="text-[10px] text-green-600 text-center mt-4">✓ You qualify for free shipping!</p>}
              {shipping > 0 && <p className="text-[10px] text-[var(--siliq-accent)] text-center mt-4">Add ₹{(2500 - cartTotal).toLocaleString()} more for free shipping</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
