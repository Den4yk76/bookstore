/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thewritelife.com",
        port: "",
        pathname: "/wp-content/**",
      },
    ],
  },
};

module.exports = nextConfig;

// https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg
