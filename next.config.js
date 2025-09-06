/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  // 性能优化配置
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // 启用静态优化
  output: 'standalone',
};

module.exports = nextConfig;