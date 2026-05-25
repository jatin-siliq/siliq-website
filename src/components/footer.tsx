import Link from "next/link";
import Image from "next/image";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  return (
    <footer className="bg-[var(--siliq-black)] text-[var(--siliq-platinum)]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-2 md:grid-cols-5 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Image src="/logo/siliq-white.svg" alt="SILIQ" width={100} height={48} className="h-10 w-auto mb-4" />
          <p className="text-xs leading-relaxed text-[var(--siliq-accent)]">Silver 925 — Fine Jewellery<br />Crafted with intention.<br />Made in India.</p>
          <div className="mt-5 space-y-2">
            <a href="https://wa.me/918954849236" target="_blank" rel="noopener noreferrer" className="block text-xs text-[var(--siliq-accent)] hover:text-white transition-colors">WhatsApp: +91 89548 49236</a>
            <a href="mailto:support@siliq.co" className="block text-xs text-[var(--siliq-accent)] hover:text-white transition-colors">support@siliq.co</a>
          </div>
          <div className="flex gap-4 mt-5">
            {[
              { name: "Instagram", href: "https://instagram.com/siliq.co" },
              { name: "Pinterest", href: "https://pinterest.com/siliq" },
              { name: "Facebook", href: "https://facebook.com/siliq" },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`SILIQ on ${s.name}`} className="text-xs text-[var(--siliq-accent)] hover:text-white transition-colors">{s.name}</a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-white mb-4">Shop</h4>
          <ul className="space-y-2.5 text-xs text-[var(--siliq-accent)]">
            {[
              { label: "All Pieces", href: "/shop" },
              { label: "Rings", href: "/shop?category=rings" },
              { label: "Earrings", href: "/shop?category=earrings" },
              { label: "Necklaces", href: "/shop?category=necklaces" },
              { label: "Bracelets", href: "/shop?category=bracelets" },
              { label: "Celestial Collection", href: "/celestial" },
            ].map((l) => (
              <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-white mb-4">Help</h4>
          <ul className="space-y-2.5 text-xs text-[var(--siliq-accent)]">
            {[
              { label: "Contact Us", href: "/contact" },
              { label: "FAQ", href: "/faq" },
              { label: "Shipping & Returns", href: "/shipping" },
              { label: "Size Guide", href: "/size-guide" },
              { label: "Track Order", href: "/track-order" },
              { label: "Care Guide", href: "/care-guide" },
            ].map((l) => (
              <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-white mb-4">Company</h4>
          <ul className="space-y-2.5 text-xs text-[var(--siliq-accent)]">
            {[
              { label: "About SILIQ", href: "/about" },
              { label: "Journal", href: "/journal" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map((l) => (
              <li key={l.label}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-white mb-4">Newsletter</h4>
          <p className="text-xs text-[var(--siliq-accent)] mb-4">10% off your first order + early access to new collections.</p>
          <NewsletterForm variant="minimal" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-[var(--siliq-accent)] tracking-wider">© {new Date().getFullYear()} SILIQ. All rights reserved.</p>

          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            {["Visa", "Mastercard", "UPI", "RuPay"].map((p) => (
              <span key={p} className="text-[9px] tracking-wider uppercase border border-[var(--siliq-accent)]/30 px-2 py-1 text-[var(--siliq-accent)]">{p}</span>
            ))}
          </div>

          <div className="flex gap-4 text-[10px] text-[var(--siliq-accent)] tracking-wider">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/shipping" className="hover:text-white">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
