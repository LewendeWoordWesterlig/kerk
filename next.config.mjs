/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ Ignore lint errors during Vercel build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
