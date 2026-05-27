import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth-store";
import { Analytics } from "@/components/analytics";
import { LayoutShell } from "@/components/layout-shell";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "SILIQ — Silver 925 Fine Jewellery", template: "%s | SILIQ" },
  description: "Crafted with intention. Worn with meaning. 925 Sterling Silver jewellery designed to be timeless, ethical, and deeply personal. Shop rings, necklaces, earrings & more.",
  metadataBase: new URL("https://siliq.co"),
  keywords: ["silver jewellery", "925 sterling silver", "fine jewellery India", "silver rings", "silver necklaces", "silver earrings", "handcrafted jewellery"],
  authors: [{ name: "SILIQ" }],
  creator: "SILIQ",
  publisher: "SILIQ",
  openGraph: {
    title: "SILIQ — Silver 925 Fine Jewellery",
    description: "Crafted with intention. Worn with meaning. 925 Sterling Silver jewellery designed to be timeless, ethical, and deeply personal.",
    url: "https://siliq.co",
    siteName: "SILIQ",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SILIQ — Silver 925 Fine Jewellery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SILIQ — Silver 925 Fine Jewellery",
    description: "Crafted with intention. Worn with meaning. 925 Sterling Silver jewellery.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "https://siliq.co" },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-screen flex flex-col font-sans bg-white text-[#0A0A0A]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--siliq-black)] focus:text-white focus:text-sm">
          Skip to content
        </a>
        <StoreProvider>
          <AuthProvider>
            <LayoutShell>{children}</LayoutShell>
          </AuthProvider>
        </StoreProvider>
        <Analytics />
      </body>
    </html>
  );
}
