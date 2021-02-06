import { combineReducers } from 'redux';
import homeReducer from '../pages/home/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;
