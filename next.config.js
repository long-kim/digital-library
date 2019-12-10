const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  target: "serverless",
  env: {
    FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
  },
});
