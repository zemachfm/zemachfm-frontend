/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { actionTypes } from './actions';
import { IHomeReducer } from './types.d';

const initialState: IHomeReducer = {
  theme: 'light',
  episodes: {
    loading: true,
    episodes: [],
    paginaton: {
      per_page: 9,
      page: 1,
      total: null,
    },
  },
  player: {
    playlist: [],
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
  },
  settings: {
    name: ' Zemach FM',
    social: {
      facebook: 'https://facebook.com/zeamch-fm',
      twitter: 'https://twitter.com/zemachfm',
      instagram: 'https://instagram.com/zemachfm',
      linkedIn: 'https://linkedin.com/company/zemachfm',
      github: 'https://github.com/zemachfm',
      telegram: 'https://t.me/zemachfm',
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
    story: {
      storyLine: {
        title: 'Our Story',
        description:
          '<p>Hi There we started our podcast from the way back nov 20 2020 was the first time we publish our first podcast , long time right ?</p>\n',
      },
      cards: [
        {
          title: 'Mission',
          description: '<p>descripton</p>\n',
        },
        {
          title: 'Others',
          description: '<p>whi</p>\n',
        },
        {
          title: '',
          description: '',
        },
        {
          title: '',
          description: '',
        },
      ],
      numberOfCards: 4,
    },
  },
  guests: {
    loading: false,
    episodes: [],
    pagination: {
      total: 10,
      page: 1,
      per_page: 4,
    },
  },
  hosts: { data: [], loading: false },
  mobileMenuVisible: false,
};

const homeReducer = produce((draft: IHomeReducer, action) => {
  const { payload } = action;
  const addition =
    draft.episodes.paginaton.page * draft.episodes.paginaton.per_page;

  switch (action.type) {
    case HYDRATE:
      draft = { ...draft, ...payload.home, ...{ player: draft.player } };
      break;
    case actionTypes.FETCH_EPISODES_SUCCEDDED:
      draft.episodes.loading = false;
      draft.episodes.episodes = [...draft.episodes.episodes, ...payload.data];
      draft.player.playlist = [...draft.player.playlist, ...payload.data];
      draft.episodes.paginaton.total = parseInt(payload.pagination, 10);
      break;
    case actionTypes.FETCH_EPISODES_FAILED:
      draft.episodes.loading = false;
      break;
    case actionTypes.ADD_PAGINATION_PAGE:
      if (
        draft.episodes.paginaton.total &&
        addition < draft.episodes.paginaton.total
      ) {
        draft.episodes.paginaton.page += payload;
        draft.episodes.loading = true;
      }
      break;
    case actionTypes.CHANGE_THEME:
      draft.theme = payload;
      break;
    case actionTypes.SET_PLAYER:
      draft.player.player.audioPlayer = payload.player;
      draft.player.currentPlay.item = payload.item;
      draft.player.player.currentPlayID = payload.index;
      draft.player.currentPlay.playlistIndex = payload.playerIndex;
      break;
    case actionTypes.PLAYLIST_UPDATE:
      draft.player.currentPlay.playlistIndex = payload;
      break;
    case actionTypes.REMOVE_PLAYER:
      draft.player.player.audioPlayer = null;
      draft.player.player.currentPlayID = null;
      draft.player.currentPlay.item = null;
      draft.player.player.currentPlayID = null;
      break;
    case actionTypes.SET_CURRENT_PLAYER_ID:
      draft.player.player.currentPlayID = payload;
      break;
    case actionTypes.STORE_PLAYER_STATUS:
      draft.player.player.playerStatus = payload;
      break;
    case actionTypes.CHANGE_PALYER_SETTINGS:
      draft.player.currentSettings[payload.name] = payload.value;
      break;
    case actionTypes.FETCH_SETTINGS_SUCCEEDED:
      draft.settings.social = payload.socialMedia;
      draft.settings.share = payload.sharingNames;
      draft.settings.platforms = payload.platforms;
      draft.settings.name = payload.name;
      draft.settings.story.storyLine = payload.story.storyLine;
      draft.settings.story.cards = payload.story.cards;
      draft.settings.story.numberOfCards = payload.story.numberOfCards;
      break;
    case actionTypes.FETCH_GUESTS:
      draft.guests.loading = true;
      break;
    case actionTypes.FETCH_GUESTS_SUCCEEDED:
      draft.guests.loading = false;
      draft.guests.episodes = [...draft.guests.episodes, ...payload.data];
      draft.player.playlist = [...draft.player.playlist, ...payload.data];
      draft.guests.pagination.total = parseInt(payload.pagination, 10);
      break;
    case actionTypes.FETCH_GUESTS_FAILED:
      draft.guests.loading = false;
      break;
    case actionTypes.FETCH_HOSTS:
      draft.hosts.loading = true;
      break;
    case actionTypes.FETCHING_HOSTS_SUCCEEDED:
      draft.hosts.loading = false;
      draft.hosts.data = payload.data;
      break;
    case actionTypes.FETCHING_HOSTS_FAILED:
      draft.hosts.loading = false;
      break;
    case actionTypes.TOOGLE_MOBILE_MENU:
      draft.mobileMenuVisible = !draft.mobileMenuVisible;
      break;
    default:
      break;
  }
  return draft;
}, initialState);
export default homeReducer;
