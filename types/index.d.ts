import { ReactElement } from 'react';

interface ISideBarContents {
  episodes: string;
  hosts: string;
  guests: string;
  story: string;
  contact: string;
}

interface footer {
  subtitle: string;
  recentEpisodes: string;
  platforms: string;
  copyright: string;
}

interface hosts {
  title: string;
  subtitle: string;
}

interface contactUsStringType {
  title: string;
  subtitle: string;
  additional: string;
  nameIntro: string;
  name: string;
  emailIntro: string;
  email: string;
  messageIntro: string;
  message: string;
  sentButton: string;
  sending: string;
  sent: string;
}

interface translatedStrings {
  appName: string;
  episodes: string;
  episodesDescription: string;
  more: string;
  sidebar: ISideBarContents;
  guests: string;
  guestDescription: string;
  contactUs: contactUsStringType;
  footer: footer;
  hosts: hosts;
}

type indexPageType = {
  locale: 'am' | 'en';
  content: translatedStrings;
  Footer: () => ReactElement;
};

type hostPageType = {
  locale: 'am' | 'en';
  content: translatedStrings;
  name: string;
  Footer: () => ReactElement;
};

export default indexPageType;

export {
  ISideBarContents,
  contactUsStringType,
  hostPageType,
  translatedStrings,
  hosts,
};
