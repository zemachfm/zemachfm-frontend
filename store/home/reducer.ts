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
  paginaton: {
    per_page: 9,
    page: 1,
    total: null,
  },
  currentPlay: {
    item: null,
    playlistIndex: 0,
  },
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
      draft.episodes = [...draft.episodes, ...payload.data];
      draft.playlist = [...draft.playlist, ...payload.data];
      draft.paginaton.total = payload.pagination;
      break;
    case actionTypes.FETCH_EPISODES_FAILED:
      draft.loading = false;
      break;
    case actionTypes.ADD_PAGINATION_PAGE:
      draft.paginaton.page += payload;
      break;
    case actionTypes.CHANGE_THEME:
      draft.theme = payload;
      break;
    case actionTypes.SET_PLAYER:
      draft.player.audioPlayer = payload.player;
      draft.currentPlay.item = payload.item;
      draft.player.currentPlayID = payload.index;
      draft.currentPlay.playlistIndex = payload.playerIndex;
      break;
    case actionTypes.PLAYLIST_UPDATE:
      draft.currentPlay.playlistIndex = payload;
      break;
    case actionTypes.REMOVE_PLAYER:
      draft.player.audioPlayer = null;
      draft.player.currentPlayID = null;
      draft.currentPlay.item = null;
      draft.player.currentPlayID = null;
      break;
    case actionTypes.SET_CURRENT_PLAYER_ID:
      draft.player.currentPlayID = payload;
      break;
    case actionTypes.STORE_PLAYER_STATUS:
      draft.player.playerStatus = payload;
      break;
    case actionTypes.CHANGE_PALYER_SETTINGS:
      draft.currentSettings[payload.name] = payload.value;
      break;
    default:
      break;
  }
  return draft;
}, initialState);
export default homeReducer;
