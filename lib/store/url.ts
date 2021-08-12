// zemach FM base URL
const SITE_URL = 'https://zemachfm.com';
const BASE_URL = 'https://api.zemachfm.com';

const API_URL = `${BASE_URL}/wp-json/wp/v2`;
const CUSTOM_API_URL = `${BASE_URL}/wp-json/custom/v1`;

/**
 * podcast
 */
const RSS_URL = `${BASE_URL}/feed/podcast`;
const PODCASTS_URL = `${API_URL}/podcast`;
const GUESTS_URL = `${PODCASTS_URL}?tags=82`;
const SETTINGS_URL = `${CUSTOM_API_URL}/settings`;
const GET_HOST_URL = `${CUSTOM_API_URL}/host`;
const HOSTS_URL = `${CUSTOM_API_URL}/hosts`;
const SINGLE_PODCAST = (slug: string): string =>
  `${API_URL}/podcast?slug=${slug};`;

const OUR_WORKS_URL = `${CUSTOM_API_URL}/works`;

const CONTACT_US = `${CUSTOM_API_URL}/contact`;
export {
  SITE_URL,
  BASE_URL,
  API_URL,
  RSS_URL,
  PODCASTS_URL,
  SETTINGS_URL,
  GET_HOST_URL,
  GUESTS_URL,
  HOSTS_URL,
  SINGLE_PODCAST,
  CONTACT_US,
  OUR_WORKS_URL,
};
