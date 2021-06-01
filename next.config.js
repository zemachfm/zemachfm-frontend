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
  async redirects() {
    return [
      {
        source: '/feed/podcast',
        destination: '/feed/podcast.xml',
        permanent: true,

      },
    ];
  },
};

webpacked['i18n'] = {
  locales: ['en', 'am'],
  defaultLocale: 'en',
};
webpacked.env = {
  host:
    process.env.NODE_ENV === 'production'
      ? 'https://staging.zemachfm.com'
      : 'http://localhost:3000',
};
webpacked.images = {
  domains: ['zemachfm.com'],
};
webpacked.target = 'serverless';

module.exports = webpacked;
