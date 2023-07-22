/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
    remotePatterns: [
      {
        
        protocol: 'https',
        hostname: 'eljnfbtxmeteozramfkt.supabase.co',
        // port: '',
        pathname: '**/public/**',
      },
    ],
    }
}

module.exports = nextConfig
