import { applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper, Context, MakeStore } from 'next-redux-wrapper';
import rootReducer from './reducer';
import rootSaga from './saga';
import { IHomeReducer } from './home/types';

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

interface SagaStore extends Store {
  sagaTask?: Task;
}

const makeStore: MakeStore<IHomeReducer> = (context: Context) => {
  const sagaMiddleware = createSagaMiddleware();
  const store: IHomeReducer = createStore(
    rootReducer,
    bindMiddleware([sagaMiddleware]),
  );
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

const useDispatchType = typeof makeStore.dispatch;

const wrapper = createWrapper<IHomeReducer>(makeStore, { debug: true });
export { makeStore, wrapper };
