/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    API_VERSION1: process.env.API_VERSION1,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXT_FRONT_URL: process.env.NEXT_FRONT_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "difcdevstorage.blob.core.windows.net",
        port: "",
        pathname: "/contentimages/**",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
