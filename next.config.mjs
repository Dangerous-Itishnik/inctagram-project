/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {

  images: {
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/trainee-instagram-api/**',
      },
      {
        protocol: 'https',
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        port: '',
        pathname: '/trainee-instagram-api/Image/**',
      },
    ]
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  reactStrictMode: true,
};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);


