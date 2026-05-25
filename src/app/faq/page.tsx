"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { title: "Shipping & Delivery", items: [
    { q: "How long does shipping take?", a: "We dispatch all orders within 2 business days of payment confirmation. Within India, delivery takes 3-5 business days via our courier partners. International orders take 7-14 business days depending on the destination." },
    { q: "Do you ship internationally?", a: "Yes, we ship worldwide. International customers are responsible for customs duties, import taxes, and any local charges levied by their country. These are not included in our pricing." },
    { q: "Is shipping free?", a: "Shipping is free on all orders above ₹2,500 within India. Orders below ₹2,500 have a flat ₹99 shipping fee. International shipping is calculated at checkout based on weight and destination." },
    { q: "How do I track my order?", a: "Once your order is dispatched, you'll receive a tracking link via email and WhatsApp. You can also check your order status on our Track Order page using your order ID." },
    { q: "What if my order is delayed?", a: "Delays can occasionally happen due to weather, holidays, or courier issues. If your order hasn't arrived within the expected timeframe, email support@siliq.co with your order number and we'll investigate immediately." },
    { q: "Do you offer express shipping?", a: "Currently we don't offer express shipping as a separate option. However, most metro city orders arrive within 2-3 days of dispatch." },
  ]},
  { title: "Returns & Refunds", items: [
    { q: "What is your return policy?", a: "We accept returns within 7 days of delivery. Items must be unworn, undamaged, in their original SILIQ packaging, and accompanied by the order number. Custom, engraved, or personalised pieces are final sale and cannot be returned." },
    { q: "How do I initiate a return?", a: "Email support@siliq.co with your order number, reason for return, and a short video showing the product in its current condition. We'll arrange a free pickup from your address within India. Once we receive and inspect the item, your refund will be processed." },
    { q: "When will I receive my refund?", a: "Refunds are processed within 7-10 business days of receiving your returned item. The amount is credited to your original payment method (UPI, card, etc.). Bank processing may take an additional 2-3 days." },
    { q: "What if I receive a damaged item?", a: "Contact us within 48 hours with a short video clearly showing the damage. Video proof is required for all damage claims. Once verified (within 24 hours), we'll send a replacement at no cost or process a full refund — your choice." },
    { q: "Are shipping charges refundable?", a: "Shipping charges are non-refundable unless the return is due to our error (wrong item sent, defective product, etc.)." },
  ]},
  { title: "Product & Quality", items: [
    { q: "Is your silver real 925?", a: "Yes. Every SILIQ piece is crafted from solid 925 sterling silver (92.5% pure silver, 7.5% copper alloy). Each piece is BIS hallmarked by the Bureau of Indian Standards and comes with an authenticity card." },
    { q: "Will my silver tarnish?", a: "All sterling silver tarnishes over time — it's a natural chemical reaction with sulphur in the air. This is actually proof of authenticity. Our pieces are rhodium-plated to slow tarnishing significantly. Regular wear and proper storage keep them bright for years." },
    { q: "How do I care for my jewellery?", a: "Store in the SILIQ pouch when not worn. Put jewellery on last (after perfume, lotion, sunscreen). Remove before swimming or showering. Wipe with the included polishing cloth after each wear. Avoid contact with chlorine, bleach, and harsh chemicals." },
    { q: "Are your pieces hypoallergenic?", a: "Yes. 925 sterling silver is naturally hypoallergenic and safe for sensitive skin. Our rhodium plating adds an extra layer of protection. If you have a known metal allergy, please consult your dermatologist." },
    { q: "What does BIS hallmark mean?", a: "BIS (Bureau of Indian Standards) hallmark is a government certification that guarantees the purity of silver. It's the Indian equivalent of a quality stamp — it means the silver has been independently tested and verified as 92.5% pure." },
    { q: "Do your pieces come with packaging?", a: "Every order arrives in our signature linen pouch inside a recycled paper box — gift-ready at no extra cost. We also include a silver polishing cloth and authenticity card." },
  ]},
  { title: "Orders & Payment", items: [
    { q: "What payment methods do you accept?", a: "We accept UPI (PhonePe, Google Pay, Paytm), credit/debit cards (Visa, Mastercard, RuPay, Amex), net banking, and wallets. All payments are processed securely through Razorpay with 256-bit SSL encryption." },
    { q: "Is it safe to pay online?", a: "Absolutely. We use Razorpay, a PCI-DSS Level 1 compliant payment gateway trusted by 8 million+ businesses. We never see or store your card details — they go directly to Razorpay's secure servers." },
    { q: "Can I cancel my order?", a: "Orders can be cancelled within 12 hours of placement by emailing support@siliq.co. After 12 hours, the order enters processing and cannot be cancelled — but you can return it after delivery." },
    { q: "I didn't receive an order confirmation. What do I do?", a: "Check your spam/junk folder first. If you still can't find it, email support@siliq.co with your name and payment details — we'll confirm your order status within a few hours." },
    { q: "Do you offer EMI or pay-later options?", a: "EMI options are available on credit cards through Razorpay at checkout (for orders above ₹3,000). No-cost EMI is available on select bank cards." },
    { q: "How do I use a coupon code?", a: "Enter your coupon code in the 'Coupon code' field at checkout and click Apply. The discount will be reflected in your order total. Coupons cannot be combined and are single-use unless stated otherwise." },
  ]},
  { title: "Sizing & Fit", items: [
    { q: "How do I find my ring size?", a: "Visit our Size Guide page for detailed instructions. You can measure an existing ring that fits, use a string/paper strip method, or WhatsApp us for guidance. When in doubt, order a half size up — it's easier to size down." },
    { q: "What if my ring doesn't fit?", a: "We offer free size exchanges within 7 days of delivery. Email support@siliq.co with your order number and the size you need. We'll send the correct size once we receive the original." },
    { q: "What necklace length should I choose?", a: "16 inches sits at the collarbone (choker length). 18 inches is the most popular — sits just below the collarbone. 20-22 inches falls at the chest. Check our Size Guide for a visual reference." },
    { q: "Are your bracelets adjustable?", a: "Most of our bracelets come with a 1-1.5 inch extender chain for adjustability. Cuff bracelets are gently adjustable by hand. Check individual product descriptions for specific sizing." },
  ]},
  { title: "Account & Offers", items: [
    { q: "How do I create an account?", a: "Click the account icon in the top navigation bar and select 'Sign Up'. Enter your name, email, and a password. You'll immediately unlock your one-time 10% welcome discount (code: WELCOME10)." },
    { q: "How does the WELCOME10 code work?", a: "WELCOME10 gives 10% off your first order. It's a one-time use code available to new account holders. Create an account, then enter WELCOME10 at checkout. Once used, it cannot be applied again." },
    { q: "Do you have a loyalty program?", a: "We're working on it! For now, sign up for our newsletter to get early access to sales, new launches, and exclusive subscriber-only discounts." },
    { q: "How do I unsubscribe from emails?", a: "Click 'Unsubscribe' at the bottom of any marketing email. You'll still receive order-related emails (confirmations, shipping updates) as those are transactional." },
  ]},
];

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <PageHero
        label="Help"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about shopping with SILIQ."
        image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&h=800&fit=crop"
      />
      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-2xl mb-5">{section.title}</h2>
                <div className="divide-y divide-[var(--siliq-line)] border-y border-[var(--siliq-line)]">
                  {section.items.map((faq) => {
                    const key = `${section.title}-${faq.q}`;
                    return (
                      <div key={key}>
                        <button onClick={() => setOpen(open === key ? null : key)} className="w-full flex items-center justify-between py-5 text-left">
                          <span className="text-sm font-medium pr-4">{faq.q}</span>
                          <motion.div animate={{ rotate: open === key ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-4 h-4 shrink-0 text-[var(--siliq-accent)]" />
                          </motion.div>
                        </button>
                        <AnimatePresence initial={false}>
                          {open === key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-[var(--siliq-graphite)] pb-5 leading-relaxed">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center border-t border-[var(--siliq-line)] pt-12">
            <p className="font-display text-xl mb-3">Still have questions?</p>
            <p className="text-sm text-[var(--siliq-accent)] mb-6">We&apos;re here to help. Reach out anytime.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="mailto:support@siliq.co" className="px-8 py-3 bg-[var(--siliq-black)] text-white text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-charcoal)] transition-colors">Email Us</a>
              <a href="https://wa.me/918954849236" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-[var(--siliq-black)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--siliq-black)] hover:text-white transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
