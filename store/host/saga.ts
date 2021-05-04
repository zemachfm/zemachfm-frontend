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
    const url = `${GET_HOST_URL}?name=${payload}`;
    const host: IHostRequest = yield call(axiosGet, url, {});

    yield put(hostFetched(host));
  } catch (error) {
    yield put(hostFetchFailed());
  }
}

function* hostPageSaga() {
  yield takeLatest(hostPageActionTypes.FETCH_HOST, fetchSingleHostSaga);
}

export default hostPageSaga;
