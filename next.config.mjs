/** @type {import('next').NextConfig} */
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

export default nextConfig;
