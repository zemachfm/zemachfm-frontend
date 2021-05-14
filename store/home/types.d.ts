/* eslint-disable camelcase */
import { Howl } from 'howler';

type ThemeTypes = 'light' | 'dark';

interface renderedType {
  rendered: string;
}
// eslint-disable-next-line no-shadow
enum currentPlayerStatus {
  PROGRESS,
  PLAYING,
  PAUSED,
  ERROR,
}

interface audioMeta {
  episode_type: string;
  audio_file: string;
  duration: string;
  filesize: string;
  filesize_raw: string;
  date_recorded: string;
}

interface soundSettings {
  volume: number;
  rate: number;
  autoPlay: boolean;
  loop: boolean;
  shuffle: boolean;
}

interface episode {
  slug: string;
  id: number;
  title: renderedType;
  description: renderedType;
  content: renderedType;
  excerpt: renderedType;
  link: string;
  data: string;
  meta: audioMeta;
  episode_featured_image: string;
  episode_player_image: string;
  small_player: string;
  big_player: string;
  download_link: string;
}

interface playerStore {
  currentPlayID: number;
  audioPlayer: Howl;
  playerStatus: currentPlayerStatus;
}

interface pagination {
  page: number;
  per_page: number;
  total: number;
}

interface ISocialMedias {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedIn: string;
  github: string;
}

interface IFullSocialMedias extends ISocialMedias {
  telegram: string;
}

interface IPost {
  post_date: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_type: string;
  post_name: string;
}

interface platforms {
  spotify: string;
  googlePodcast: string;
  itunes: string;
  soundCloud: string;
  youtube: string;
}

interface siteSettings {
  name: string;
  social: IFullSocialMedias;
  platforms: platforms;
  share: {
    shareDescription: string;
    hashtag: string[];
    shareTitle: string;
    quote: string;
  };
  story: story;
}

interface guests {
  loading: boolean;
  episodes: episode[];
  pagination: pagination;
}

interface story {
  storyLine: {
    title: string;
    description: string;
  };
  cards: {
    title: string;
    description: string;
  }[];
  numberOfCards: number;
}

interface IHostRequest {
  post: IPost;
  img: string;
  socialMedia: ISocialMedias;
}

type Hosts = IHostRequest[];

interface IHomeReducer {
  episodes: {
    paginaton: pagination;
    loading: boolean;
    episodes: episode[];
  };
  player: {
    playlist: episode[];
    currentPlay: {
      item: episode;
      playlistIndex: number;
    };
    player: playerStore;
    currentSettings: soundSettings;
  };
  settings: siteSettings;
  guests: guests;
  theme: ThemeTypes;
  hosts: {
    data: Hosts;
    loading: boolean;
  };
}

export type {
  episode,
  story,
  siteSettings,
  ThemeTypes,
  IHomeReducer,
  soundSettings,
  playerStore,
  Hosts,
  IHostRequest,
  IFullSocialMedias,
  platforms,
  guests,
};
