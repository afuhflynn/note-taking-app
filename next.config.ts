import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization for MinIO uploads
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Enable AVIF format for better compression
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 1 year
    minimumCacheTTL: 31536000,
  },

  // Code splitting and bundling optimizations
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      // Enable better tree shaking
      usedExports: true,
    };

    return config;
  },

  // Enable experimental optimizations
  experimental: {
    optimizePackageImports: [
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-form",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "date-fns",
      "lucide-react",
    ],
  },

  // Compress responses
  compress: true,

  // SWR configuration
  swrMinute: 60,

  // Production source maps disabled for smaller bundle
  productionBrowserSourceMaps: false,

  // Incremental Static Regeneration
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
};

export default nextConfig;
