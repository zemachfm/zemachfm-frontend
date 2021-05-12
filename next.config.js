/* eslint-disable */
const webpacked = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
};

webpacked['i18n'] = {
  locales: ['en', 'am'],
  defaultLocale: 'en',
};
webpacked.images = {
  domains: ['zemachfm.com'],
};
webpacked.target = 'serverless';

module.exports = webpacked;
