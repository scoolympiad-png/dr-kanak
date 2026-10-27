import type { Metadata } from "next";
import "./globals.css";
import { SiteNavigation } from '@/components/site-client';
import { SiteFooter } from '@/components/website';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  title: {default:'Dr Kanak Ramnani | Paediatrician at Mamta Hospital, Raipur',template:'%s | Dr Kanak Ramnani'},
  description: 'Paediatric care, vaccination and practical parent guidance with Dr Kanak Ramnani at Mamta Super Speciality Hospital, Raipur.',
  robots: {index:false,follow:false},
  icons: {
    icon: [
      {url: "/favicon.ico", sizes: "any"},
      {url: "/favicon-32.png", type: "image/png", sizes: "32x32"},
      {url: "/favicon-48.png", type: "image/png", sizes: "48x48"},
      {url: "/favicon.svg", type: "image/svg+xml"}
    ],
    shortcut: "/favicon.ico",
    apple: [{url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png"}]
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><StructuredData/><a className="skip-link" href="#main-content">Skip to content</a><SiteNavigation/><main id="main-content">{children}</main><SiteFooter/></body>
    </html>
  );
}
