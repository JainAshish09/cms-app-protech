// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto", // ✅ Exposed for use in Tailwind
});

export const metadata: Metadata = {
  title: "Protech Titan",
  description: "Protech Titan",
};

const navItems = [
  { name: "Home", url: "/" },
  { name: "What is PRO-TECH?", url: "/about" },
  { name: "Features", url: "/features" },
  { name: "Products", url: "/products" },
  { name: "Request a Demo", url: "/request-demo" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <body className={`${inter.className} ${notoSans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
