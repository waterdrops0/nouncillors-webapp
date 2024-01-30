/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
    // Add the specified modules to the externals array
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // Return the modified config
    return config;
  },
};

module.exports = nextConfig;