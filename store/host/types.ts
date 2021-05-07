import { IHostRequest } from '../home/types.d';

interface IHostPageStates {
  gettingHost: boolean;
  host: IHostRequest | null;
}

export default IHostPageStates;
