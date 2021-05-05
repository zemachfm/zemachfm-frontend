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
  guests: string;
  guestDescription: string;
}

type indexPageType = {
  locale: 'am' | 'en';
  content: translatedStrings;
};

type hostPageType = {
  locale: 'am' | 'en';
  content: translatedStrings;
  slug: string;
};

export default indexPageType;

export { ISideBarContents, hostPageType };
