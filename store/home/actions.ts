import { Howl } from 'howler';
import { makeAction } from '../../lib/store/makeActions';
import { ThemeTypes } from './types.d';
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
  CHANGE_PLAYER_STATUS_FAILED: 'CHANGE_PLAYER_STATUS_FAILED',
  CHANGE_PLAYER_STATUS_SUCCEEDED: 'CHANGE_PLAYER_STATUS_SUCCEEDED',

  SET_PLAYER: 'SET_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  SET_CURRENT_PLAYER_ID: 'SET_CURRENT_PLAYER_ID',

  PLAY_NEXT_SONG: 'PLAY_NEXT_SONG',
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

const changePlayerStatusSucceeded = function changePlayerStatusSucceded(
  payload: Howl,
): {
  type: string;
  payload: Howl;
} {
  return {
    type: actionTypes.CHANGE_PLAYER_STATUS_SUCCEEDED,
    payload,
  };
};

const palyNextSong = function makeActionNextSong(
  payload: actionsTypes.playerStatus,
): actionsTypes.playerStatusActionReturn {
  return {
    payload,
    type: actionTypes.PLAY_NEXT_SONG,
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

const setPlayer = function setPlayer(
  payload: Howl,
): { type: string; payload: Howl } {
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
  removePlayer,
  changePlayerStatus,
  changePlayerStatusSucceeded,
  palyNextSong,
  playCertainAudio,
  setCurrentPlayerID,
};
