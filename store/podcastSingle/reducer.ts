/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { singlePodcastActionTypes } from './actions';
import singlePodcastDataTypes from './types.d';

const initialState: singlePodcastDataTypes = {
  loading: false,
};

const singlePodcastReducer = produce(
  (draft: singlePodcastDataTypes, action) => {
    const { payload } = action;
    switch (action.type) {
      case HYDRATE:
        draft = { ...draft, ...payload.singlePodcast };
        break;
      case singlePodcastActionTypes.FETCH_SINGLE_PODCAST:
        draft.loading = true;
        break;
      case singlePodcastActionTypes.FETCH_SINGLE_PODCAST_SUCCEEDED:
        draft.loading = false;
        draft[payload.slug] = payload.page;
        break;
      default:
    }
    return draft;
  },
  initialState,
);

export default singlePodcastReducer;
