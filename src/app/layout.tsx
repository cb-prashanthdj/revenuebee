import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import "cb-sting-react-ts/theme/sting.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chargebee: SaaS for Effective Revenue Growth Management",
  description: "Chargebee: SaaS for Effective Revenue Growth Management",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${inter.variable} ${sora.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
