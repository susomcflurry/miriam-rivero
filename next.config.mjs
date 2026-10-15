/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static: every language page is prerendered to HTML in out/
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // app/global-not-found.jsx: one 404 for the three root layouts
  experimental: { globalNotFound: true },
};

export default nextConfig;
