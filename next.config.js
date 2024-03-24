/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  basePath: "/paalette",
  output: "export",
  reactStrictMode: false,
}

module.exports = nextConfig
