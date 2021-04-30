// zemach FM base URL

const BASE_URL = 'https://zemachfm.com';

const API_URL = `${BASE_URL}/wp-json/wp/v2`;
const CUSTOM_API_URL = `${BASE_URL}/wp-json/custom/v1`;

/**
 * podcast
 */
const PODCASTS_URL = `${API_URL}/podcast`;
const SETTINGS_URL = `${CUSTOM_API_URL}/settings`;
export { BASE_URL, API_URL, PODCASTS_URL, SETTINGS_URL };
