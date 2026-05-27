"use client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ToastContainer } from "@/components/toast";
import { CookieConsent } from "@/components/cookie-consent";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <ToastContainer />
      <CookieConsent />
      <WhatsAppWidget />
    </>
  );
}
