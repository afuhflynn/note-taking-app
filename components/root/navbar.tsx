"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NotesLogo } from "@/components/ui/logo";

export const NavBar = () => {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NotesLogo className="dark:fill-white transition-opacity hover:opacity-80" />

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="hidden sm:block" prefetch>
              <Button
                variant="ghost"
                size="sm"
                className="text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
              >
                Sign In
              </Button>
            </Link>

            <Link href="/editor" prefetch>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              >
                Try out the editor
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};
