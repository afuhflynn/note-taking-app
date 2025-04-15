"use client";

import { NavBar } from "@/components/root/navbar";
import { HeroSection } from "@/components/root/hero-section";
import { Footer } from "@/components/root/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
