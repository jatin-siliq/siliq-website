"use client";
import { useState, useEffect } from "react";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("siliq_cookies_accepted")) setShow(true);
  }, []);

  if (!show) return null;

  const accept = () => { localStorage.setItem("siliq_cookies_accepted", "true"); setShow(false); };
  const decline = () => { localStorage.setItem("siliq_cookies_accepted", "declined"); setShow(false); };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-[var(--siliq-line)] shadow-lg p-4 md:p-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--siliq-accent)] leading-relaxed">
          We use cookies to enhance your experience. By continuing to browse, you agree to our{" "}
          <a href="/privacy" className="underline text-[var(--siliq-black)]">Privacy Policy</a>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button onClick={accept} className="px-6 py-2.5 bg-[var(--siliq-black)] text-white text-xs tracking-[0.1em] uppercase hover:bg-[var(--siliq-charcoal)] transition-colors">
            Accept
          </button>
          <button onClick={decline} className="px-6 py-2.5 border border-[var(--siliq-line)] text-xs tracking-[0.1em] uppercase hover:border-[var(--siliq-black)] transition-colors">
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
