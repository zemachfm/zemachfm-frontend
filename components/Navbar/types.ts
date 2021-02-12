import { ThemeTypes } from '../../store/home/types';

export interface INavBarProps {
  theme: ThemeTypes;
  onChangeTheme: (theme: ThemeTypes) => void;
}
