/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.vercel.app" },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  rewrites: async () => {
    return [
      {
        source: "/dr-github/:path*",
        destination: `${process.env.BACKEND_HOST}/:path*`,
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
