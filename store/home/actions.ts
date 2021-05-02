import { Howl } from 'howler';
import { makeAction } from '../../lib/store/makeActions';
import { episode, ThemeTypes, siteSettings, Hosts } from './types.d';
import * as actionsTypes from './index.d';

const actionTypes = {
  /**
   * episodes
   */
  FETCH_EPISODES: 'FETCH_EPISODES',
  FETCH_EPISODES_FAILED: 'FETCH_EPISODES_FAILED',
  FETCH_EPISODES_SUCCEDDED: 'FETCH_EPISODES_SUCCEDDED',
  FETCH_MORE: 'FETCH_MORE',
  ADD_PAGINATION_PAGE: 'ADD_PAGINATION_PAGE',

  /**
   * theme
   */
  CHANGE_THEME: 'CHANGE_THEME',

  /**
   * get settings
   */

  FETCH_SETTINGS: 'FETCH_SETTINGS',
  FETCH_SETTINGS_SUCCEEDED: 'FETCH_SETTINGS_SUCCEEDED',
  FETCH_SETTINGS_FAILED: 'FETCH_SETTINGS_FAILED',

  /**
   * get Guests
   */
  FETCH_GUESTS: 'FETCH_GUESTS',
  FETCH_GUESTS_SUCCEEDED: 'FETCH_GUESTS_SUCCEEDED',
  FETCH_GUESTS_FAILED: 'FETCH_GUESTS_FAILED',

  /**
   * Player tweak
   */
  CHANGE_PLAYER_STATUS: 'CHANGE_PLAYER_STATUS',
  SEEK_PLAYER: 'SEEK_PLAYER',
  STORE_PLAYER_STATUS: 'STORE_PLAYER_STATUS',
  CHANGE_PALYER_SETTINGS: 'CHANGE_PALYER_SETTINGS',

  SET_PLAYER: 'SET_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  SET_CURRENT_PLAYER_ID: 'SET_CURRENT_PLAYER_ID',

  PROCEED_WITH_PLAYING: 'PROCEED_WITH_PLAYING',
  PLAYLIST_UPDATE: 'PLAYLIST_UPDATE',
  RESET_PLAYLIST: 'RESET_PLAYLIST',
  PLAY_CERTAIN_AUDIO: 'PLAY_CERTAIN_AUDIO',

  /**
   * Hosts
   */
  FETCH_HOSTS: 'FETCH_HOSTS',
  FETCHING_HOSTS_SUCCEEDED: 'FETCHING_HOSTS_SUCCEEDED',
  FETCHING_HOSTS_FAILED: 'FETCHING_HOSTS_FAILED',
};

const fetchEpisodes = (): { type: string; payload: null } =>
  makeAction({}, actionTypes.FETCH_EPISODES);

const fetchEpisodesFailed = (
  payload: Error,
): { type: string; payload: Error } =>
  makeAction(payload, actionTypes.FETCH_EPISODES_FAILED);

const fetchEpisodesSucceeded = (
  payload: actionsTypes.EpisodesReturnType,
): { type: string; payload: actionsTypes.EpisodesReturnType } =>
  makeAction(payload, actionTypes.FETCH_EPISODES_SUCCEDDED);

const addPaginationPage = (
  payload: number,
): { payload: number; type: string } => ({
  payload,
  type: actionTypes.ADD_PAGINATION_PAGE,
});

const changeThemeAction = (
  payload: ThemeTypes,
): { type: string; payload: ThemeTypes } =>
  makeAction(payload, actionTypes.CHANGE_THEME);

/**
 * player actions
 */

const changePlayerStatus = function makeActionPlayerStatus(
  payload: actionsTypes.playerStatus,
): actionsTypes.playerStatusActionReturn {
  return { payload, type: actionTypes.CHANGE_PLAYER_STATUS };
};

const storePlayerStatus = function storeStatus(
  payload: Howl,
): {
  type: string;
  payload: number;
} {
  return {
    type: actionTypes.STORE_PLAYER_STATUS,
    payload,
  };
};

const proceedWithPlaying = function makeActionNextSong(payload: {
  type: number;
}): { type: string; payload: { type: number } } {
  return {
    payload,
    type: actionTypes.PROCEED_WITH_PLAYING,
  };
};

const playCertainAudio = function makeActionPlayCertainAudio(
  payload: string,
): actionsTypes.palyCertainAudioType {
  return {
    payload,
    type: actionTypes.PLAY_CERTAIN_AUDIO,
  };
};

const setPlayer = function setPlayer(payload: {
  player: HTMLUnknownElement;
  item: episode;
  playerIndex: number;
}): {
  type: string;
  payload: {
    player: HTMLUnknownElement;
    item: episode;
    playerIndex: number;
  };
} {
  return {
    payload,
    type: actionTypes.SET_PLAYER,
  };
};

const removePlayer = function removePLayer(): { type: string } {
  return {
    type: actionTypes.REMOVE_PLAYER,
  };
};
const setCurrentPlayerID = (
  payload: string,
): { type: string; payload: string } => ({
  payload,
  type: actionTypes.SET_CURRENT_PLAYER_ID,
});

const updatedPlaylist = (
  payload: number,
): { type: string; payload: number } => ({
  type: actionTypes.PLAYLIST_UPDATE,
  payload,
});

const deletePlaylist = (
  payload: episode[],
): { type: string; payload: episode[] } => ({
  type: actionTypes.PLAYLIST_UPDATE,
  payload,
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const changePlayerSetting = (payload: {
  name: string;
  value: number | string | boolean;
}) => ({
  type: actionTypes.CHANGE_PALYER_SETTINGS,
  payload,
});

const seekPlayer = (payload: number): { type: string; payload: number } => ({
  type: actionTypes.SEEK_PLAYER,
  payload,
});

/**
 * settings for pdocast
 */
const fetchSettings = (): { type: string } => ({
  type: actionTypes.FETCH_SETTINGS,
});

const fetchSettingsFailed = (msg: string): { type: string; msg: string } => ({
  type: actionTypes.FETCH_SETTINGS_FAILED,
  msg,
});

const fetchSettingsSucceeded = (
  settings: siteSettings,
): {
  type: string;
  payload: siteSettings;
} => ({
  type: actionTypes.FETCH_SETTINGS_SUCCEEDED,
  payload: settings,
});

/**
 * get guests
 */

const fetchGuests = (): { type: string } => ({
  type: actionTypes.FETCH_GUESTS,
});

const fetchGuestSucceeded = (payload: {
  data: episode[];
  pagination: number;
}): { type: string; payload: { data: episode[]; pagination: number } } => ({
  type: actionTypes.FETCH_GUESTS_SUCCEEDED,
  payload,
});

const fetchGUestsFailed = (
  payload: string,
): { type: string; payload: string } => ({
  type: actionTypes.FETCH_GUESTS_FAILED,
  payload,
});

/**
 * get hosts
 */

const fetchHosts = (): { type: string } => ({
  type: actionTypes.FETCH_HOSTS,
});

const fetchHostsSucceeded = (payload: {
  data: Hosts;
}): { type: string; payload: { data: Hosts } } => ({
  type: actionTypes.FETCHING_HOSTS_SUCCEEDED,
  payload,
});

const fetchHostsFailed = (
  payload: string,
): { type: string; payload: string } => ({
  type: actionTypes.FETCHING_HOSTS_FAILED,
  payload,
});

export {
  actionTypes,
  /**
   * episode actions
   */
  fetchEpisodes,
  fetchEpisodesFailed,
  fetchEpisodesSucceeded,
  addPaginationPage,
  changeThemeAction,
  /**
   * player actions
   */
  setPlayer,
  changePlayerSetting,
  removePlayer,
  changePlayerStatus,
  storePlayerStatus,
  proceedWithPlaying,
  playCertainAudio,
  setCurrentPlayerID,
  updatedPlaylist,
  deletePlaylist,
  seekPlayer,
  /**
   * settings actions
   */
  fetchSettings,
  fetchSettingsFailed,
  fetchSettingsSucceeded,
  /**
   * get guests
   */
  fetchGuests,
  fetchGuestSucceeded,
  fetchGUestsFailed,
  /**
   * get hosts
   */
  fetchHostsSucceeded,
  fetchHostsFailed,
  fetchHosts,
};
