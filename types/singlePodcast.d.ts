import { translatedStrings } from './index.d';

type singlePodcastType = {
  locale: 'am' | 'en';
  content: translatedStrings;
  slug: string;
};

export default singlePodcastType;
