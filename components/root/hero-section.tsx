"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cloud, Edit3, Sparkles, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export const HeroSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const float = {
    initial: { y: 0 },
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };
  const staggerBadges = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2,
      },
    },
  };

  const badgeAnimation = {
    initial: { opacity: 0, scale: 0.8, x: -20 },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  };
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-500/5 dark:to-transparent -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 dark:opacity-20 -z-10"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 dark:opacity-20 -z-10"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <div className="container px-4 md:px-6 relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 w-fit"
            >
              <Sparkles className="mr-1 h-3 w-3" /> Turn Ideas into memos
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                variants={item}
                className="text-4xl font-bold tracking-tighter text-center sm:text-left sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Capture ideas,{" "}
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
                  organize life
                </span>
              </motion.h1>

              <motion.p
                variants={item}
                className="max-w-[600px] text-muted-foreground text-lg md:text-xl"
              >
                A powerful note-taking app that helps you stay organized and
                productive. Create, edit, and access your notes from anywhere.
              </motion.p>
            </div>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/sign-up">
                  <Button
                    size="lg"
                    className="gap-2 text-base w-full md:w-auto"
                  >
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/auth/sign-in">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-base w-full md:w-auto"
                  >
                    Sign In <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerBadges}
              initial="initial"
              animate="animate"
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              <motion.div variants={badgeAnimation}>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 px-3 py-1 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                >
                  <Cloud className="h-3.5 w-3.5" />
                  <span>Cloud sync</span>
                </Badge>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial="initial"
            animate="animate"
            variants={{ float }}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
            >
              <Image
                src="/preview.jpg"
                alt="Notes App Screenshot"
                width={800}
                height={600}
                className="object-cover group-hover:scale-[1.1]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 border border-neutral-200 dark:border-neutral-700"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-sm font-medium">Real-time sync</p>
              </div>
            </motion.div>

            {/* Additional floating elements */}
            <motion.div
              className="absolute top-1/2 -right-12 bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-3 border border-neutral-200 dark:border-neutral-700"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Badge variant="secondary" className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                <span>Smart tagging</span>
              </Badge>
            </motion.div>

            <motion.div
              className="absolute top-10 left-10 bg-white dark:bg-neutral-800 rounded-full shadow-lg p-2 border border-neutral-200 dark:border-neutral-700"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.6,
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <Edit3 className="h-5 w-5 text-blue-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
