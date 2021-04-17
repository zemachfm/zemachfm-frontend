interface translatedStrings {
  appName: string;
  episodes: string;
  episodesDescription: string;
}

type indexPageType = {
  locale: 'am' | 'en';
  content: translatedStrings;
};

export default indexPageType;
