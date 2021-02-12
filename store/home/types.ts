type ThemeTypes = 'light' | 'dark';

interface IHomeReducer {
  loading: boolean;
  theme: ThemeTypes;
  episodes: object;
}

export type { ThemeTypes, IHomeReducer };
