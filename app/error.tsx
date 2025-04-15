"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          className="max-w-md w-full mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
            <div className="relative">
              <motion.div
                className="h-32 w-32 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Badge variant="destructive" className="mb-4">
              Error Occurred
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Something went wrong
            </h1>
            <p className="text-muted-foreground mb-8">
              We apologize for the inconvenience. An unexpected error has
              occurred.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button onClick={reset} className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" asChild className="gap-2">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Go to Home
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {error.digest && (
            <motion.div
              className="mt-8 p-4 bg-muted rounded-md text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-sm font-mono mb-1">Error ID: {error.digest}</p>
              <p className="text-xs text-muted-foreground">
                If the problem persists, please contact support with this error
                ID.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
