import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect business/auth pages to enterprise subdomain
      // Only redirect if accessed from www.breezyhive.com or breezyhive.com
      {
        source: '/business/register',
        has: [
          {
            type: 'host',
            value: '(www\\.)?breezyhive\\.com',
          },
        ],
        destination: 'https://enterprise.breezyhive.com/business/register',
        permanent: false,
      },
      {
        source: '/business/login',
        has: [
          {
            type: 'host',
            value: '(www\\.)?breezyhive\\.com',
          },
        ],
        destination: 'https://enterprise.breezyhive.com/business/login',
        permanent: false,
      },
      {
        source: '/business',
        has: [
          {
            type: 'host',
            value: '(www\\.)?breezyhive\\.com',
          },
        ],
        destination: 'https://enterprise.breezyhive.com/business',
        permanent: false,
      },
      {
        source: '/dashboard',
        has: [
          {
            type: 'host',
            value: '(www\\.)?breezyhive\\.com',
          },
        ],
        destination: 'https://enterprise.breezyhive.com/dashboard',
        permanent: false,
      },
      {
        source: '/dashboard/:path*',
        has: [
          {
            type: 'host',
            value: '(www\\.)?breezyhive\\.com',
          },
        ],
        destination: 'https://enterprise.breezyhive.com/dashboard/:path*',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
