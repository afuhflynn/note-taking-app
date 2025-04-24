"use client";

import { NavBar } from "@/components/root/navbar";
import { HeroSection } from "@/components/root/hero-section";
import { Footer } from "@/components/root/footer";
import { useEffect } from "react";
import { useUserStore } from "@/store/user.store";
import { redirect } from "next/navigation";

export default function HomePage() {
  const { getUserProfile, user } = useUserStore();
  useEffect(() => {
    getUserProfile();
  }, []);

  // Redirect if a valid user object exists
  useEffect(() => {
    if (user && user.email) {
      redirect("/notes");
    }
  }, []);
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
