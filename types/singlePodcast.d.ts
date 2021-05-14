import { ReactElement } from 'react';
import { translatedStrings } from './index.d';

type singlePodcastType = {
  locale: 'am' | 'en';
  content: translatedStrings;
  slug: string;
  Footer: () => ReactElement;
};

export default singlePodcastType;
