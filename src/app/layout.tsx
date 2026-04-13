import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/app/Providers";

export const metadata: Metadata = {
  title: "WORLD FORUM — Knowledge Without Borders",
  description:
    "WORLD FORUM is a cinematic global knowledge and lifestyle platform: Knowledge, Languages, Stories, Community, Marketplace, and Payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Bebas+Neue&family=Lora:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400;1,600&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Noto+Sans+SC:wght@300;400;700&family=Noto+Serif+SC:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--midnight)] text-[var(--white-soft)]">
        <Providers>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
