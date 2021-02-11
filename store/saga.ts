import { all } from 'redux-saga/effects';
import homeSaga from './home/saga';

function* rootSaga() {
  yield all([homeSaga()]);
}

export default rootSaga;
