import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll, ScrollProgress, PageTransition } from "@/components/motion";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = { title: { default: "TDS Properties", template: "%s | TDS Properties" }, description: "Exceptional real estate in Ahmedabad and Gandhinagar.", metadataBase: new URL("https://tdsproperties.in") };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${body.variable}`}><body><a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-3" href="#main">Skip to content</a><SmoothScroll><ScrollProgress /><PageTransition>{children}</PageTransition></SmoothScroll></body></html>;
}
