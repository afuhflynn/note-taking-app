import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes-Dashboard | Notes",
  description: "Take, Edit, Update, Delete Notes | Notes App",
};

export default function NoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-screen h-screen paddingX">{children}</div>;
}
