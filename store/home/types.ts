type ThemeTypes = 'light' | 'dark';

interface IHomeReducer {
  loading: boolean;
  theme: ThemeTypes;
}

export type { ThemeTypes, IHomeReducer };
