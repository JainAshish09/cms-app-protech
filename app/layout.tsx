import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Protech Titan",
  description: "Protech Titan",
};

const navItems = [
  { name: 'Home', url: '/' },
  { name: 'What is PRO-TECH?', url: '/about-us' },
  { name: 'Features', url: '/features' },
  { name: 'Products', url: '/products' },
  { name: 'Request a Demo', url: '/request-demo' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></Script>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
