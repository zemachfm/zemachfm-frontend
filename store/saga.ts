import homeSaga from '../pages/home/saga';

function* rootSaga() {
  yield [homeSaga];
}

export default rootSaga;
