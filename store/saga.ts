import { all } from 'redux-saga/effects';
import homeSaga from './home/saga';
import hostPageSaga from './host/saga';

function* rootSaga() {
  yield all([homeSaga(), hostPageSaga()]);
}

export default rootSaga;
