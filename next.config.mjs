/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
  
    return config;
  },
  images: {
    disableStaticImages: true,
    loader: "cloudinary",
    domains: ["res.cloudinary.com", "cdn.sanity.io"],
    formats: ["image/webp", "image/avif"],
    path: "https://res.cloudinary.com/demw3uawq/image/upload/",
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
