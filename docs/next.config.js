const path = require('path');
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/*/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/*/**',
      },
      {
        protocol: 'https',
        hostname: 'www.apple.com',
        port: '',
        pathname: '/*/**',
      },
    ],
  },
webpack: (config, options) => {
// Make sure bun.lockb is handled by null-loader
config.module.rules.push({
    test: /\.lockb$/,
    use: 'null-loader'
});

// Handle SVG files
config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack']
});

// Handle markdown files
config.module.rules.push({
    test: /\.md$/,
    use: 'raw-loader'
});

// Configure webpack context for blog posts
const blogPath = path.join(__dirname, 'data/blog');
config.plugins.push(
    new webpack.ContextReplacementPlugin(
    /data\/blog/,
    blogPath,
    true,
    /\.md$/
    )
);

return config;
},
};

module.exports = nextConfig;
