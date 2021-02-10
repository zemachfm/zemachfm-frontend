/* eslint-disable */
const webpacked = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

webpacked.target = 'serverless';

module.exports = webpacked;
