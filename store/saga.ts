import homeSaga from './home/saga';

function* rootSaga() {
  yield [homeSaga];
}

export default rootSaga;
