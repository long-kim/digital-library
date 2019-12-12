const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withCSS = require('@zeit/next-css');

module.exports = withPlugins(
  [
    [withSass, { cssModules: true }],
    [
      withOptimizedImages,
      {
        optimizeImagesInDev: true,
      },
    ],
    [
      withCSS,
      {
        webpack: (config, options) => {
          const { isServer, dev } = options;
          config.module.rules.push({
            test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
            use: [
              {
                loader: 'lqip-loader',
                options: {
                  fallback: 'file-loader',
                  base64: !dev,
                  publicPath: '/_next/static/images/',
                  outputPath: `${isServer ? '../' : ''}static/images/`,
                  name: '[name]-[hash].[ext]',
                },
              },
            ],
          });
          config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 100000,
                name: '[name].[ext]',
              },
            },
          });
          return config;
        },
      },
    ],
  ],
  {
    env: {
      APP_NAME: 'Digital Library',
      FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
      FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    },
  },
);

// module.exports = withCSS({
//     webpack: function(config) {
//         config.module.rules.push({
//             test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//             use: {
//                 loader: 'url-loader',
//                 options: {
//                     limit: 100000,
//                     name: '[name].[ext]'
//                 }
//             }
//         })
//         return config
//     }
// })
