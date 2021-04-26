interface translatedStrings {
  appName: string;
  episodes: string;
  episodesDescription: string;
  more: string;
}

type indexPageType = {
  locale: 'am' | 'en';
  content: translatedStrings;
};

export default indexPageType;
