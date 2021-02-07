import { combineReducers } from 'redux';
import homeReducer from './home/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;
