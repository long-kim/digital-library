const withSass = require('@zeit/next-sass');
const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');
const withCSS = require('@zeit/next-css')

module.exports = withPlugins(
    [
        [withSass, { cssModules: true }],
        [withOptimizedImages]
    ], {
        env: {
            APP_NAME: 'Digital Library',
            FIREBASE_PRIVATE_KEY_ID: process.env.FIREBASE_PRIVATE_KEY_ID,
            FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
        },
    },
);

module.exports = withCSS({
    webpack: function(config) {
        config.module.rules.push({
            test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000,
                    name: '[name].[ext]'
                }
            }
        })
        return config
    }
})