import { Howl } from 'howler';
import { makeAction } from '../../lib/store/makeActions';
import { episode, ThemeTypes } from './types.d';
import * as actionsTypes from './index.d';

const actionTypes = {
  /**
   * episodes
   */
  FETCH_EPISODES: 'FETCH_EPISODES',
  FETCH_EPISODES_FAILED: 'FETCH_EPISODES_FAILED',
  FETCH_EPISODES_SUCCEDDED: 'FETCH_EPISODES_SUCCEDDED',
  CHANGE_THEME: 'CHANGE_THEME',
  /**
   *
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
  payload: actionsTypes.audioId,
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

export {
  actionTypes,
  /**
   * episode actions
   */
  fetchEpisodes,
  fetchEpisodesFailed,
  fetchEpisodesSucceeded,
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
};
