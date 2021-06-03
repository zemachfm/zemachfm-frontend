import { ReactNode } from 'react';
import { ISideBarContents } from '../../types/index.d';

interface SmallDeviceMenuProps {
  toogleMenu: () => void;
  handleRouteChange: (link: string, isMobile?: boolean) => void;
  links: ISideBarLink[];
}

interface ISideBarLink {
  active: boolean;
  label: string;
  route: string;
  icon: ReactNode;
}
interface SideBarProps {
  links: ISideBarLink[];
  handleRouteChange: (link: string) => void;
  translatedStrings: ISideBarContents;
}

export { SmallDeviceMenuProps, SideBarProps, ISideBarLink };
