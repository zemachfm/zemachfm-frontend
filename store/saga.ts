import { all } from 'redux-saga/effects';
import homeSaga from './home/saga';
import singlePodcastSaga from './podcastSingle/saga';

function* rootSaga() {
  yield all([homeSaga(), singlePodcastSaga()]);
}

export default rootSaga;
