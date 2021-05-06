import { all } from 'redux-saga/effects';
import homeSaga from './home/saga';
import singlePodcastSaga from './podcastSingle/saga';
import hostPageSaga from './host/saga';

function* rootSaga() {
  yield all([homeSaga(), hostPageSaga(), singlePodcastSaga()]);
}

export default rootSaga;
