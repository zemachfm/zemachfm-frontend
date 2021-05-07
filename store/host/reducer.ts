/* eslint-disable no-param-reassign */
import produce from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { hostPageActionTypes } from './actions';
import IHostPageStates from './types';

const intialState: IHostPageStates = {
  gettingHost: false,
  host: null,
};

const hostPageReducer = produce((draft: IHostPageStates, action) => {
  const { payload } = action;

  switch (action?.type) {
    case HYDRATE:
      draft = { ...draft, ...payload.host };
      break;
    case hostPageActionTypes.FETCH_HOST:
      draft.gettingHost = true;
      break;
    case hostPageActionTypes.HOST_FETCHED:
      draft.host = payload;
      break;
    case hostPageActionTypes.HOST_FETCH_FAILED:
      draft.gettingHost = false;
      break;
    default:
      break;
  }

  return draft;
}, intialState);

export default hostPageReducer;
