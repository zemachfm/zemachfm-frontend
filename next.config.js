/* eslint-disable */
const webpacked = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (!isServer) {
      config.resolve.fallback.fs = false;
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
  localeDetection: true,
};
webpacked.env = {
  host:
    process.env.NODE_ENV === 'production'
      ? 'https://zemachfm.com'
      : 'http://localhost:3000',
};
webpacked.images = {
  domains: ['zemachfm.com', 'api.zemachfm.com'],
};

webpacked.eslint = {
  ignoreDuringBuilds: true,
};

module.exports = webpacked;
