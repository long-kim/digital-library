const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

module.exports = withPlugins(
  [[withSass, { cssModules: true }], [withOptimizedImages]],
  {
    env: {
      APP_NAME: 'Digital Library',
      FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    },
  },
);
