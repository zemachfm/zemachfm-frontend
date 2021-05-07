import { IHostRequest } from '../home/types.d';

const hostPageActionTypes = {
  FETCH_HOST: 'hostPage/FETCH_HOST',
  HOST_FETCHED: 'hostPage/HOST_FETCHED',
  HOST_FETCH_FAILED: 'hostPage/HOST_FETCH_FAILED',
};

const fetchHost = (payload: string) => ({
  type: hostPageActionTypes.FETCH_HOST,
  payload,
});

const hostFetched = (payload: IHostRequest) => ({
  type: hostPageActionTypes.HOST_FETCHED,
  payload,
});

const hostFetchFailed = () => ({
  type: hostPageActionTypes.HOST_FETCH_FAILED,
});

export { hostPageActionTypes, fetchHost, hostFetched, hostFetchFailed };
