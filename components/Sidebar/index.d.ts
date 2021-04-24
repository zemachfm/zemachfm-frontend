import { ISideBarContents } from '../../types/index.d';

interface SmallDeviceMenuProps {
  toogleMenu: () => void;
}

interface SideBarProps {
  sideBarContents: ISideBarContents;
}

export { SmallDeviceMenuProps, SideBarProps };
