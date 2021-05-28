import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet } from '../../lib/store/axiosReq';
import { GET_HOST_URL } from '../../lib/store/url';
import { IHostRequest } from '../home/types.d';
import { hostFetched, hostFetchFailed, hostPageActionTypes } from './actions';

function* fetchSingleHostSaga({
  type,
  payload,
}: {
  type: string;
  payload: string;
}) {
  try {
    const url = `${GET_HOST_URL}?name=${encodeURIComponent(payload)}`;
    const response = yield call(axiosGet, url, {});
    const host: IHostRequest = response.data;

    if (typeof host === 'object' && host.post) {
      yield put(hostFetched(host));
    } else {
      yield put(hostFetched(null));
    }
  } catch (error) {
    yield put(hostFetchFailed());
  }
}

function* hostPageSaga() {
  yield takeLatest(hostPageActionTypes.FETCH_HOST, fetchSingleHostSaga);
}

export default hostPageSaga;
