import { takeLatest, put, call } from 'redux-saga/effects';
import { PODCASTS_URL } from '../../lib/store/url';
import { axiosGet } from '../../lib/store/axiosReq';
import {
  fetchEpisodesSucceeded,
  fetchEpisodesFailed,
  actionTypes,
} from './actions';

function* fetchEpisodesGenerator({ payload }: { payload: object }) {
  try {
    const fetchedEpisodes = yield call(axiosGet, PODCASTS_URL, payload);
    const { data: fetchedEpisodesData } = fetchedEpisodes;
    yield put(fetchEpisodesSucceeded(fetchedEpisodesData));
  } catch (err) {
    yield put(fetchEpisodesFailed(err));
  }
}

function* homeSaga() {
  yield takeLatest(actionTypes.FETCH_EPISODES, fetchEpisodesGenerator);
}
export default homeSaga;
