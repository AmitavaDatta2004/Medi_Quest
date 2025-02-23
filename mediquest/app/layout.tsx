import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Clerk setup
import { ClerkProvider } from "@clerk/nextjs";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MediQuest - AI-Powered Healthcare Solutions",
  description:
    "Decode Your Symptoms, Discover the Right Cure, and Stay Informed! Your go-to source for medicine info, accurate diagnoses, and expert health insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
          <Navbar/>
            {children}
            </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
