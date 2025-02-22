import type { Metadata } from "next";
import { Geist, Geist_Mono , Inter} from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', 'arial'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'MediQuest - AI-Powered Healthcare Solutions',
  description: 'Decode Your Symptoms, Discover the Right Cure, and Stay Informed! Your go-to source for medicine info, accurate diagnoses, and expert health insights.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
