import { PageHero } from "@/components/page-hero";
import { Truck, RotateCcw, Shield, Clock, Package } from "lucide-react";

export default function ShippingPage() {
  return (
    <>
      <PageHero
        label="Policies"
        title="Shipping & Returns"
        subtitle="Transparent policies. No surprises."
        image="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=800&fit=crop"
      />

      {/* Quick Summary */}
      <div className="py-12 px-6 bg-[var(--siliq-cream)]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Truck, title: "Free Shipping", text: "Above ₹2,500" },
            { icon: Clock, title: "Dispatch", text: "Within 2 days" },
            { icon: RotateCcw, title: "Easy Returns", text: "7-day window" },
            { icon: Shield, title: "Secure", text: "Insured shipping" },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center">
              <item.icon className="w-6 h-6 text-[var(--siliq-graphite)] mb-2" strokeWidth={1.5} />
              <p className="text-xs font-medium tracking-[0.1em] uppercase">{item.title}</p>
              <p className="text-xs text-[var(--siliq-accent)]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 text-sm text-[var(--siliq-graphite)] leading-relaxed">

            {/* Shipping */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <Package className="w-5 h-5 text-[var(--siliq-black)]" strokeWidth={1.5} />
                <h2 className="font-display text-2xl text-[var(--siliq-black)]">Shipping</h2>
              </div>
              <p className="mb-4">All orders are dispatched within <strong>2 business days</strong> of payment confirmation from our studio in Ghaziabad, UP. Every shipment is insured and trackable.</p>

              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3 mt-6">Domestic Delivery (India)</h3>
              <div className="border border-[var(--siliq-line)] divide-y divide-[var(--siliq-line)]">
                <div className="flex justify-between px-5 py-3.5"><span>Metro cities (Delhi NCR, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune)</span><span className="font-medium whitespace-nowrap">2-3 days</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>Tier 2 cities (Jaipur, Lucknow, Chandigarh, Ahmedabad, Indore, etc.)</span><span className="font-medium whitespace-nowrap">3-5 days</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>Tier 3 & rural areas</span><span className="font-medium whitespace-nowrap">5-7 days</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>North East India (Assam, Meghalaya, Manipur, etc.)</span><span className="font-medium whitespace-nowrap">5-8 days</span></div>
              </div>

              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3 mt-6">International Delivery</h3>
              <div className="border border-[var(--siliq-line)] divide-y divide-[var(--siliq-line)]">
                <div className="flex justify-between px-5 py-3.5"><span>USA, UK, Canada, Australia</span><span className="font-medium whitespace-nowrap">7-10 days</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>UAE, Singapore, Malaysia</span><span className="font-medium whitespace-nowrap">5-7 days</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>Europe (Germany, France, Italy, etc.)</span><span className="font-medium whitespace-nowrap">8-12 days</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>Rest of the world</span><span className="font-medium whitespace-nowrap">10-14 days</span></div>
              </div>

              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3 mt-6">Shipping Charges</h3>
              <div className="border border-[var(--siliq-line)] divide-y divide-[var(--siliq-line)]">
                <div className="flex justify-between px-5 py-3.5"><span>India — orders above ₹2,500</span><span className="font-medium text-green-700">FREE</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>India — orders below ₹2,500</span><span className="font-medium">₹99</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>International — Asia (UAE, Singapore, etc.)</span><span className="font-medium">₹499</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>International — USA, UK, Europe, Australia</span><span className="font-medium">₹799</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>International — Rest of world</span><span className="font-medium">₹999</span></div>
              </div>

              <div className="mt-5 p-4 bg-[var(--siliq-cream)] border border-[var(--siliq-line)]">
                <p className="text-xs"><strong>Note:</strong> International customers are responsible for customs duties, import taxes, and local charges. These vary by country and are not included in our pricing or shipping fees.</p>
              </div>

              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3 mt-6">Tracking</h3>
              <p>Once dispatched, you&apos;ll receive a tracking link via email and WhatsApp. You can also track your order on our <a href="/track-order" className="underline font-medium text-[var(--siliq-black)]">Track Order</a> page.</p>
            </section>

            {/* Returns */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <RotateCcw className="w-5 h-5 text-[var(--siliq-black)]" strokeWidth={1.5} />
                <h2 className="font-display text-2xl text-[var(--siliq-black)]">Returns</h2>
              </div>
              <p className="mb-4">We want you to love your SILIQ piece. If it&apos;s not right, we make returns simple and stress-free.</p>

              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Return Policy</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>7-day return window</strong> from the date of delivery</li>
                <li>Items must be <strong>unworn, undamaged</strong>, and in <strong>original SILIQ packaging</strong></li>
                <li>Authenticity card must be included</li>
                <li>A short <strong>video of the product</strong> in its current condition is required when initiating a return</li>
                <li>We arrange <strong>free pickup</strong> from your address within India</li>
                <li>International returns: shipping cost borne by the customer</li>
              </ul>

              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3 mt-6">How to Return</h3>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Email support@siliq.co with your Order ID and reason for return" },
                  { step: "2", text: "We'll confirm eligibility and schedule a free pickup (within 24 hours)" },
                  { step: "3", text: "Pack the item in its original packaging and hand it to the courier" },
                  { step: "4", text: "Once received and inspected, refund is processed within 5-7 business days" },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <span className="w-6 h-6 bg-[var(--siliq-black)] text-white text-xs flex items-center justify-center shrink-0">{s.step}</span>
                    <p>{s.text}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3 mt-6">Refund Timeline</h3>
              <div className="border border-[var(--siliq-line)] divide-y divide-[var(--siliq-line)]">
                <div className="flex justify-between px-5 py-3.5"><span>UPI / Wallets</span><span className="font-medium">2-3 business days</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>Credit / Debit Card</span><span className="font-medium">5-7 business days</span></div>
                <div className="flex justify-between px-5 py-3.5"><span>Net Banking</span><span className="font-medium">5-7 business days</span></div>
              </div>
              <p className="text-xs text-[var(--siliq-accent)] mt-2">Refund is credited to the original payment method used during purchase.</p>
            </section>

            {/* Non-Returnable */}
            <section>
              <h2 className="font-display text-2xl text-[var(--siliq-black)] mb-4">Non-Returnable Items</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Custom-made or personalised pieces</li>
                <li>Engraved items</li>
                <li>Digital gift cards</li>
                <li>Items that have been worn, resized, or altered</li>
                <li>Items returned without original packaging or authenticity card</li>
                <li>Items returned after the 7-day window</li>
              </ul>
            </section>

            {/* Cancellation */}
            <section>
              <h2 className="font-display text-2xl text-[var(--siliq-black)] mb-4">Order Cancellation</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders can be cancelled within <strong>12 hours</strong> of placement — email support@siliq.co</li>
                <li>After 12 hours, the order enters processing and cannot be cancelled</li>
                <li>Once dispatched, cancellation is not possible — you may return after delivery</li>
                <li>Cancelled order refunds are processed within 3-5 business days</li>
              </ul>
            </section>

            {/* Damaged/Wrong */}
            <section>
              <h2 className="font-display text-2xl text-[var(--siliq-black)] mb-4">Damaged or Wrong Item</h2>
              <p className="mb-3">If you receive a damaged, defective, or incorrect item, we&apos;re here to make it right. To process your claim quickly, we require the following:</p>
              
              <div className="p-5 bg-[var(--siliq-cream)] border border-[var(--siliq-line)] mb-4">
                <p className="text-xs font-medium tracking-[0.1em] uppercase text-[var(--siliq-black)] mb-2">Required — Video Proof</p>
                <p>To ensure fair resolution for all customers, we require an <strong>unboxing video</strong> or a <strong>short video</strong> clearly showing the damage/defect. This helps us verify the issue and process your claim without delays.</p>
                <ul className="list-disc pl-5 space-y-1 mt-3 text-xs">
                  <li>Video should clearly show the product, packaging, and the issue</li>
                  <li>Must be submitted within 48 hours of delivery</li>
                  <li>Send via email (support@siliq.co) or WhatsApp (+91 89548 49236)</li>
                  <li>Photos alone may not be sufficient for damage claims</li>
                </ul>
              </div>

              <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-[var(--siliq-black)] mb-3">Process</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Contact us within <strong>48 hours</strong> of delivery</li>
                <li>Share a <strong>video</strong> of the item showing the damage clearly</li>
                <li>Our team will review within 24 hours</li>
                <li>Once verified, we&apos;ll send a replacement immediately at no cost, or process a full refund — your choice</li>
                <li>No need to return the damaged item in most cases</li>
              </ul>
              <p className="mt-4 text-xs text-[var(--siliq-accent)]">We appreciate your understanding — video proof helps us maintain quality standards and resolve issues faster for everyone.</p>
            </section>

            {/* Contact */}
            <section className="pt-8 border-t border-[var(--siliq-line)]">
              <h2 className="font-display text-2xl text-[var(--siliq-black)] mb-4">Questions?</h2>
              <p>For any shipping or return queries, reach out to us:</p>
              <ul className="list-none space-y-2 mt-3">
                <li><strong>Email:</strong> support@siliq.co</li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/918954849236" className="underline">+91 89548 49236</a></li>
                <li><strong>Response time:</strong> Within 24 hours (Mon-Sat, 10 AM - 7 PM IST)</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
