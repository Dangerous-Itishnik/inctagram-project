/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {

  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns:[
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/trainee-instagram-api/**',
        port: '',
        protocol: 'https',
      },
      {
        hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com',
        pathname: '/trainee-instagram-api/Image/**',
        port: '',
        protocol: 'https',
      },
    ]
  },
  reactStrictMode: true,
};
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);


