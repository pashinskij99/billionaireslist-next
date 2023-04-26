/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  // trailingSlash: true,
  images: {
    loader: 'akamai',
    path: '/',
    domains: ['billionaireslist.com', 'secure.gravatar.com', 'upload.wikimedia.org'],
  },
  poweredByHeader: false,
  env: {
    API_URL: process.env.API_URL,
    BASE_URL: process.env.BASE_URL
  },
  webpack: (config, { isServer }) => {
    config.resolve.fallback = { fs: false };

    if(isServer) {
      require("./server-scripts/sitemap-generator");
    }

    return config;
  },
}

module.exports = nextConfig
