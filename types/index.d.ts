interface ISideBarContents {
  episodes: string;
  hosts: string;
  guests: string;
  story: string;
  contact: string;
}
interface translatedStrings {
  appName: string;
  episodes: string;
  episodesDescription: string;
  more: string;
  sidebar: ISideBarContents;
}

type indexPageType = {
  locale: 'am' | 'en';
  content: translatedStrings;
};

export default indexPageType;

export { ISideBarContents };
