"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NotesLogo } from "@/components/ui/logo";
import { ThemeToggle } from "../theme-toggle";

export const NavBar = () => {
  return (
    <motion.header
      className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between w-[100%]"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-[100%] py-3 flex items-center justify-between paddingX">
        <NotesLogo className="dark:fill-white" />
        <ThemeToggle />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link href="/auth/sign-in">
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="sm">Get Started</Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
