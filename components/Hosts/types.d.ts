interface Ihost {
  name: string;
  description: string;
  image: string;
}
export interface HostsProps {
  hosts: Ihost[];
}
