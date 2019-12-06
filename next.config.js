const withSass = require('@zeit/next-sass');
require('dotenv').config();

module.exports = withSass({
    cssModules: true,
    // Environment variables
});
