/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes } from './actions';
import { IHomeReducer } from './types.d';

const initialState: IHomeReducer = {
  loading: true,
  episodes: [],
  theme: 'light',
  playlist: [],
  currentPlay: null,
  player: {
    audioPlayer: null,
    currentPlayID: null,
    playerStatus: 0,
  },
  currentSettings: {
    volume: 1,
    autoPlay: false,
    loop: false,
    shuffle: true,
    rate: 1,
  },
};

const homeReducer = produce((draft: IHomeReducer, action) => {
  const { payload } = action;

  switch (action.type) {
    case HYDRATE:
      draft = { ...draft, ...payload.home };
      break;
    case actionTypes.FETCH_EPISODES_SUCCEDDED:
      draft.loading = false;
      draft.episodes = payload;
      draft.playlist = payload;
      break;
    case actionTypes.FETCH_EPISODES_FAILED:
      draft.loading = false;
      break;
    case actionTypes.CHANGE_THEME:
      draft.theme = payload;
      break;
    case actionTypes.SET_PLAYER:
      draft.player.audioPlayer = payload.player;
      draft.currentPlay = payload.item;
      break;
    case actionTypes.PLAYLIST_UPDATE:
      draft.playlist = payload;
      break;
    case actionTypes.RESET_PLAYLIST:
      draft.playlist = payload;
      break;
    case actionTypes.REMOVE_PLAYER:
      draft.player.audioPlayer = null;
      draft.player.currentPlayID = null;
      draft.currentPlay = null;
      break;
    case actionTypes.SET_CURRENT_PLAYER_ID:
      draft.player.currentPlayID = payload;
      break;
    case actionTypes.STORE_PLAYER_STATUS:
      draft.player.playerStatus = payload;
      break;
    default:
      break;
  }
  return draft;
}, initialState);
export default homeReducer;
