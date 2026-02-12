/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/simple-weather-app",
  assetPrefix: "/simple-weather-app/",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
