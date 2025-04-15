import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Notes",
  description: "Authentication | Notes App",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full font-noto-serif-regular">{children}</div>
  );
}
