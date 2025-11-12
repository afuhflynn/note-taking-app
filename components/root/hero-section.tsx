"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="min-h-screen flex items-center py-20 px-6 md:px-12 lg:px-20 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/20 dark:from-blue-950/10 dark:via-transparent dark:to-purple-950/10 -z-10" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Turn ideas into organized notes
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={fadeInUp} className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Capture ideas,
                <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  organize life
                </span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
                A powerful note-taking app that helps you stay organized and
                productive. Create, edit, and access your notes from anywhere.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Link href="/sign-up" prefetch>
                <Button
                  size="lg"
                  className="gap-2 text-base px-8 h-12 bg-blue-600 hover:bg-blue-700"
                >
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/sign-in" prefetch>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base px-8 h-12"
                >
                  Sign In
                </Button>
              </Link>
            </motion.div>

            {/* Features List */}
            <motion.div variants={fadeInUp} className="pt-4">
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                {["Cloud sync", "Smart search", "Dark mode"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white dark:bg-neutral-900">
              <Image
                src="/preview.jpg"
                alt="Notes App Screenshot"
                width={800}
                height={600}
                className="object-cover w-full"
                priority
              />

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/10 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-4 -left-4 bg-white dark:bg-neutral-900 rounded-xl shadow-lg px-4 py-3 border border-neutral-200 dark:border-neutral-800"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Real-time sync active
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
