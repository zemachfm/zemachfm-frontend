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
  settings: {
    name: ' Zemach FM',
    social: {
      facebook: 'https://facebook.com/zeamch-fm',
      twitter: 'https://twitter.com/zemachfm',
      instagram: 'https://instagram.com/zemachfm',
      linkedIn: 'https://linkedin.com/company/zemachfm',
      github: 'https://github.com/zemachfm',
      telegram: 'https://t.me/zemachfm'
    },
    platforms: {
      spotify: '',
      googlePodcast: '',
      itunes: '',
      soundCloud: '',
      youtube: '',
    },
    share: {
      shareDescription: ' Checkout Zemach FM Podcast',
      hashtag: ['zemachfm', 'techpodcastethiopia', 'techpodcast'],
      shareTitle: 'Zemach fm Podcast',
      quote: 'checkout This Podcast,Zeamch Fm',
    },
  },
};

const homeReducer = produce((draft: IHomeReducer, action) => {
  const { payload } = action;
  const addition = draft.paginaton.page * draft.paginaton.per_page;

  switch (action.type) {
    case HYDRATE:
      draft = { ...draft, ...payload.home };
      break;
    case actionTypes.FETCH_EPISODES_SUCCEDDED:
      draft.loading = false;
      draft.episodes = [...draft.episodes, ...payload.data];
      draft.playlist = [...draft.playlist, ...payload.data];
      draft.paginaton.total = parseInt(payload.pagination, 10);
      break;
    case actionTypes.FETCH_EPISODES_FAILED:
      draft.loading = false;
      break;
    case actionTypes.ADD_PAGINATION_PAGE:
      if (draft.paginaton.total && addition < draft.paginaton.total) {
        draft.paginaton.page += payload;
        draft.loading = true;
      }
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
    case actionTypes.FETCH_SETTINGS_SUCCEEDED:
      draft.settings.social = payload.socialMedia;
      draft.settings.share = payload.sharingNames;
      draft.settings.platforms = payload.platforms;
      draft.settings.name = payload.name;
      break;
    default:
      break;
  }
  return draft;
}, initialState);
export default homeReducer;
