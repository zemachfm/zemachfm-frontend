import { Hosts } from '../../store/home/types.d';
import { IHostsString } from '../../types/index.d';

interface Ihost {
  name: string;
  description: string;
  image: string;
}
export interface HostsProps {
  hosts?: Hosts;
  loading: boolean;
  sectionContent?: IHostsString;
}
