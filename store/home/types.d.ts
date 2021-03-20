/* eslint-disable camelcase */
import { Howl } from 'howler';

type ThemeTypes = 'light' | 'dark';

interface episode {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  meta: {
    audio_file: string;
    duration: string;
    filesize: string;
    date_recorded: string;
    episode_type: string;
  };
  episode_featured_image: string;
}

interface singlePlay {
  url: string;
}

interface IHomeReducer {
  loading: boolean;
  theme: ThemeTypes;
  episodes: episode[];
  playlist: singlePlay[];
  currentPlay: singlePlay;
  player: Howl;
}

export type { episode, ThemeTypes, IHomeReducer };
