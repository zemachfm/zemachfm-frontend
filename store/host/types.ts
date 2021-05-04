import { IHostRequest } from '../home/types.d';

interface IHostPageStates {
  gettingHost: boolean;
  host?: IHostRequest;
}

export default IHostPageStates;
