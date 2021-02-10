/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes } from './actions';
import { IHomeReducer } from './types';

const initialState: IHomeReducer = {
  loading: true,
  theme: 'light',
};
const homeReducer = produce((draft: IHomeReducer, action) => {
  switch (action.type) {
    case HYDRATE:
      break;
    case actionTypes.FETCH_EPISODES_SUCCEDDED:
      break;
    case actionTypes.CHANGE_THEME:
      draft.theme = action.payload;
      break;
    default:
      break;
  }
  return draft;
}, initialState);
export default homeReducer;
