import { Hosts } from '../../store/home/types.d';

interface Ihost {
  name: string;
  description: string;
  image: string;
}
export interface HostsProps {
  hosts: Hosts;
  loading: boolean;
}
