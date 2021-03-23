import { ThemeTypes } from '../../store/home/types.d';

export interface INavBarProps {
  theme: ThemeTypes;
  appName?: string;
  locale?: 'am' | 'en';
  onChangeTheme: (theme: ThemeTypes) => void;
  toogleMobileMenu: () => void;
}
