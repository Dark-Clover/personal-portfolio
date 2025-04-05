/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // This ensures that assets are correctly referenced when deployed to a subdirectory
  basePath: '',
};

export default nextConfig;

