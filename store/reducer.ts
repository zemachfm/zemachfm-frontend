import { combineReducers } from 'redux';
import homeReducer from './home/reducer';
import hostPageReducer from './host/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  host: hostPageReducer,
});

export type TRootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
