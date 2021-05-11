import { call, put, takeLatest } from 'redux-saga/effects'
import { axiosGet } from '../../lib/store/axiosReq';
import { SINGLE_PODCAST } from '../../lib/store/url';
import {
  fetchSinglePodcastFailed,
  fetchSinglePodcstSucceeded,
  singlePodcastActionTypes,
} from './actions';

function* fetchSinglePodcastGenerator({
  type,
  payload,
}: {
  type: string;
  payload: string;
}) {
  try {
    const url = SINGLE_PODCAST(payload);
    const podcast = yield call(axiosGet, url, {});

    yield put(
      fetchSinglePodcstSucceeded({ page: podcast.data, slug: payload }),
    );
  } catch (err) {
    yield put(fetchSinglePodcastFailed(err.message));
  }
}

function* singlePodcastSaga() {
  yield takeLatest(
    singlePodcastActionTypes.FETCH_SINGLE_PODCAST,
    fetchSinglePodcastGenerator,
  );
}
export default singlePodcastSaga;
