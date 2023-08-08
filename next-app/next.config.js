/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    locales: ['en', 'de', 'fr'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig