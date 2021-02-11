import { produce } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes } from './actions';

const initialState = {
  loading: true,
  episodes: [],
};

interface initial {
  loading: boolean;
  episodes: object;
}

const homeReducer = produce((draft: initial, action) => {
  const { payload } = action;
  switch (action.type) {
    case HYDRATE:
      break;
    case actionTypes.FETCH_EPISODES_SUCCEDDED:
      draft.loading = false;
      draft.episodes = payload;
      break;
    case actionTypes.FETCH_EPISODES_FAILED:
      draft.loading = false;
      break;
    default:
      break;
  }
  return draft;
}, initialState);
export default homeReducer;
