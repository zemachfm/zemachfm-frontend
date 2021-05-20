import { Hosts } from '../../store/home/types.d';
import { hosts as hostString } from '../../types/index.d';

interface Ihost {
  name: string;
  description: string;
  image: string;
}
export interface HostsProps {
  hosts: Hosts;
  loading: boolean;
  content: hostString;
}
