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
  id: number;
  title: renderedType;
  description: renderedType;
  content: renderedType;
  excerpt: renderedType;
  data: string;
  meta: audioMeta;
  episode_featured_image: string;
  episode_player_image: string;
  small_player: string;
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

interface IHomeReducer {
  loading: boolean;
  theme: ThemeTypes;
  episodes: episode[];
  playlist: episode[];
  currentPlay: {
    item: episode;
    playlistIndex: number;
  };
  player: playerStore;
  currentSettings: soundSettings;
  paginaton: pagination;
}

export type { episode, ThemeTypes, IHomeReducer, soundSettings, playerStore };
