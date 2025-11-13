import type { Metadata } from "next";
import "./globals.scss";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";

export const metadata: Metadata = {
  title: "Notes App",
  description: "A modern note-taking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
          <Toaster className="bg-background" theme="dark" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
