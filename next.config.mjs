/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static: every language page is prerendered to HTML in out/
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
