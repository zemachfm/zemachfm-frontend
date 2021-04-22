/* eslint-disable import/no-extraneous-dependencies */
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducer';
import rootSaga from './saga';
import { IHomeReducer } from './home/types.d';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore: MakeStore<IHomeReducer, AnyAction> = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const wrapper = createWrapper<IHomeReducer>(makeStore, { debug: true });
export { makeStore, wrapper };
