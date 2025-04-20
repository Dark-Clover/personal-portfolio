/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds
  },
  // Build optimizations
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    // Disable features that might cause performance issues
    serverComponents: false,
    concurrentFeatures: false,
  },
  // Improve build performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add compression
  compress: true,
  // Add powered by header
  poweredByHeader: false,
  // Add React strict mode
  reactStrictMode: true,
  // Reduce bundle size
  swcMinify: true,
}

export default nextConfig
