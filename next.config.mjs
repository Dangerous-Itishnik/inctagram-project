/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com']
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
