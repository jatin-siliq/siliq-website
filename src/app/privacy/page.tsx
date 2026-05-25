import { PageHero } from "@/components/page-hero";

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Legal" title="Privacy Policy" subtitle="Last updated: 24 May 2026" variant="dark" />
      <div className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-10 text-sm text-[var(--siliq-graphite)] leading-relaxed">
            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Who We Are</h2>
              <p>This privacy policy applies to siliq.co, operated by Vogen International Private Limited, Ghaziabad, Uttar Pradesh, India. By using our website, you agree to the collection and use of information as described in this policy.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Information We Collect</h2>
              <p className="mb-3">We collect the following information when you browse, create an account, or make a purchase:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Personal:</strong> Name, email address, phone number</li>
                <li><strong>Shipping:</strong> Delivery address, city, state, pincode</li>
                <li><strong>Payment:</strong> Processed securely by Razorpay — we never store card details on our servers</li>
                <li><strong>Browsing:</strong> Pages visited, device type, browser, IP address (collected via cookies)</li>
                <li><strong>Account:</strong> Login credentials (password stored encrypted)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>To process, fulfill, and deliver your orders</li>
                <li>To communicate order status via email and WhatsApp</li>
                <li>To send promotional emails and offers (only with your explicit consent)</li>
                <li>To improve our website, products, and customer experience</li>
                <li>To prevent fraud, unauthorized access, and ensure security</li>
                <li>To comply with legal obligations under Indian law</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Consent</h2>
              <p>By creating an account or placing an order, you consent to the collection and use of your data as described here. For marketing communications, we obtain separate opt-in consent. You may withdraw consent at any time by emailing support@siliq.co.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Data Sharing</h2>
              <p className="mb-3">We never sell your personal data. We share information only with:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Payment processor:</strong> Razorpay (for secure payment processing)</li>
                <li><strong>Shipping partners:</strong> For order delivery only</li>
                <li><strong>Communication:</strong> WhatsApp Business API (for order updates)</li>
              </ul>
              <p className="mt-3">All third-party partners are bound by data protection agreements and process your data only for the stated purpose.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Data Retention</h2>
              <p>We retain your personal data for as long as your account is active or as needed to provide services. Order records are kept for 7 years for tax and legal compliance. You may request deletion of your account and associated data at any time — we will process this within 30 days, except where retention is required by law.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Cookies</h2>
              <p className="mb-3">We use:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Essential cookies:</strong> Required for site functionality (cart, login sessions)</li>
                <li><strong>Preference cookies:</strong> Remember your settings (wishlist, recently viewed)</li>
              </ul>
              <p className="mt-3">You can disable cookies in your browser settings, but some features may not work correctly.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Your Rights</h2>
              <p className="mb-3">Under the Digital Personal Data Protection Act, 2023 (India), you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Access your personal data we hold</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your data (right to erasure)</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Lodge a complaint with the Data Protection Board of India</li>
              </ul>
              <p className="mt-3">To exercise any of these rights, email support@siliq.co. We will respond within 30 days.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Data Security</h2>
              <p>We implement industry-standard security measures including SSL/TLS encryption for all data transmission, secure payment processing through PCI-DSS compliant partners, encrypted password storage, and regular security reviews. However, no method of transmission over the internet is 100% secure.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Children&apos;s Privacy</h2>
              <p>Our website is not intended for individuals under 18 years of age. We do not knowingly collect personal data from minors. If we become aware that we have collected data from a person under 18, we will delete it immediately.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Third-Party Links</h2>
              <p>Our website may contain links to external sites (Instagram, payment gateways, etc.). We are not responsible for the privacy practices of these third-party websites. We encourage you to read their privacy policies.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Changes to This Policy</h2>
              <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. For significant changes, we will notify registered users via email. Continued use of the website after changes constitutes acceptance.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Governing Law</h2>
              <p>This privacy policy is governed by the laws of India, including the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023. Any disputes shall be subject to the exclusive jurisdiction of courts in Ghaziabad, Uttar Pradesh.</p>
            </section>

            <section>
              <h2 className="font-display text-xl text-[var(--siliq-black)] mb-3">Contact Us</h2>
              <p>For privacy-related questions or to exercise your data rights:</p>
              <ul className="list-none space-y-1 mt-3">
                <li><strong>Email:</strong> support@siliq.co</li>
                <li><strong>WhatsApp:</strong> +91 89548 49236</li>
                <li><strong>Address:</strong> Vogen International Private Limited, Ghaziabad, Uttar Pradesh, India</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
