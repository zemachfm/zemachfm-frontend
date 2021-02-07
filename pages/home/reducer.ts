import { produce } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes } from './actions';

const initialState = {
  loading: true,
};
const homeReducer = produce((draft, action) => {
  switch (action.type) {
    case HYDRATE:
      break;
    case actionTypes.FETCH_EPISODES_SUCCEDDED:
      break;
    default:
      break;
  }
  return draft;
}, initialState);
export default homeReducer;
