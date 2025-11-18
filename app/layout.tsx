import type { Metadata } from "next";
import "./globals.scss";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

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
      <body className="font-noto-serif-regular">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <QueryProvider>{children}</QueryProvider>
          </NuqsAdapter>
          <Toaster className="bg-background" theme="system" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
