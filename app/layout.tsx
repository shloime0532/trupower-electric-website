import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trupower-electric-website.vercel.app"),
  title: "TruPower Electric | Licensed Electricians in Lakewood, NJ",
  description:
    "TruPower Electric provides expert electrical services in Lakewood, NJ and surrounding areas. Panel upgrades, residential wiring, generator installation, EV chargers, and more. NJ Licensed #34EB01826800. Call (732) 606-5099.",
  openGraph: {
    title: "TruPower Electric | Licensed Electricians in Lakewood, NJ",
    description:
      "Expert electrical services in Lakewood, NJ. Panel upgrades, wiring, generators, EV chargers. Licensed & insured. Call (732) 606-5099.",
    images: ["/og-image.png"],
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
