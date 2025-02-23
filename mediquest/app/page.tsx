"use client";

import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Developers from "@/components/Developers";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <Navbar /> */}
      <Hero />
      <Features />
      <Testimonials />
      <Developers />
      <Footer />
    </main>
  );
}