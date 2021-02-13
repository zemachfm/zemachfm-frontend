type ThemeTypes = 'light' | 'dark';

interface IHomeReducer {
  loading: boolean;
  theme: ThemeTypes;
  episodes: {
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
  }[];
}

export type { ThemeTypes, IHomeReducer };
