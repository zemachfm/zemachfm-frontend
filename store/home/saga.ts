import { takeLatest } from 'redux-saga/effects';
import { actionTypes } from './actions';

function* fetchEpisodesGenerator({
  payload,
  type,
}: {
  type: string;
  payload: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}) {}

function* homeSaga() {
  yield takeLatest(actionTypes.FETCH_EPISODES, fetchEpisodesGenerator);
}
export default homeSaga;
