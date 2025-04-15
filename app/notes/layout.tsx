import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit, Take, Update | Notes App",
  description: "Edit, Take, Update, Delete Notes | Notes App",
};

export default function NoteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full font-noto-serif-regular">{children}</div>
  );
}
