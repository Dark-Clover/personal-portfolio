/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600, // Cache images for longer (1 hour)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // Optimize for common device sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // Smaller increments for better size matching
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
    // Enable modern optimizations
    optimizeCss: true, // Optimize CSS
    optimizePackageImports: ['framer-motion', 'lucide-react', 'three', 'gsap'],
    // Improve memory usage
    memoryBasedWorkersCount: true,
    // Improve bundle size
    turbotrace: {
      logLevel: 'error',
    },
    serverComponents: false,
    concurrentFeatures: false,
  },
  // Improve build performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Add compression
  compress: true,
  // Remove powered by header
  poweredByHeader: false,
  // Add React strict mode
  reactStrictMode: true,
  // Reduce bundle size
  swcMinify: true,
  // Optimize output
  output: 'standalone',
}

export default nextConfig
