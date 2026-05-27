"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ToastContainer } from "@/components/toast";
import { CookieConsent } from "@/components/cookie-consent";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-1">{children}</main>;
  }

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
