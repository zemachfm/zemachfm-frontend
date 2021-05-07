import { combineReducers } from 'redux';
import homeReducer from './home/reducer';
import hostPageReducer from './host/reducer';
import singlePodcastReducer from './podcastSingle/reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  host: hostPageReducer,
  singlePodcast: singlePodcastReducer,
});

export type TRootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
