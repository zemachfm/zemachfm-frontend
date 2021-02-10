import { combineReducers } from 'redux';
import homeReducer from './home/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
});

export type TRootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
