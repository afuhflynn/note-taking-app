import { NavBar } from "@/components/root/navbar";
import { HeroSection } from "@/components/root/hero-section";
import { Footer } from "@/components/root/footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session) {
    redirect("/notes");
  }
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <NavBar />

      {/* Hero Section */}
      <HeroSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
