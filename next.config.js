// next.config.js
const withPlugins = require('next-compose-plugins');
const offline = require('next-offline');

const nextConfig = {
  target: process.env.NODE_ENV !== 'production' ? 'server' : 'serverless',
  dontAutoRegisterSw: true,
  generateSw: false,
  devSwSrc: './public/static/sw.js',
  workboxOpts: {
    swSrc: './public/static/sw.js',
    swDest: './public/static/service-worker.js',
  },
  // Exposes Server ENV Vars To Client Using Webpack
  env: {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  },
};

module.exports = withPlugins([[offline]], nextConfig);
