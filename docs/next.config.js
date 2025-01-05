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
// Add null-loader for binary and xml files
config.module.rules.push({
    oneOf: [
    {
        test: /\.lockb$/,
        use: 'null-loader'
    },
    {
        test: /\.xml$/,
        use: 'null-loader'
    }
    ]
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

// Add rule for public directory files
config.module.rules.push({
    resourceQuery: /public\/.+$/,
    use: 'null-loader'
});

return config;
},
};

module.exports = nextConfig;
