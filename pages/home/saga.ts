import { takeLatest } from 'redux-saga/effects';
import { actionTypes } from './actions';

function* fetchEpisodesGenerator({ payload }) {}

function* homeSaga() {
  yield takeLatest(actionTypes.FETCH_EPISODES, fetchEpisodesGenerator);
}
export default homeSaga;
