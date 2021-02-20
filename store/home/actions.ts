import { makeAction } from '../../lib/store/makeActions';
import { ThemeTypes } from './types';
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
  PLAY_NEXT_SONG: 'PLAY_NEXT_SONG',
  PLAY_CERTAIN_AUDIO: 'PLAY_CERTAIN_AUDIO',
};

const fetchEpisodes = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES);

const fetchEpisodesFailed = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES_FAILED);

const fetchEpisodesSucceeded = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES_SUCCEDDED);

const changeThemeAction = (payload: ThemeTypes) =>
  makeAction(payload, actionTypes.CHANGE_THEME);

/**
 * player actions
 */

const changePlayerStatus = function makeActionPlayerStatus(
  payload: actionsTypes.playerStatus,
): actionsTypes.playerStatusActionReturn {
  return { payload, type: actionTypes.CHANGE_PLAYER_STATUS };
};

const palyNextSong = function makeActionNextSong(
  payload: actionsTypes.playerStatus,
): actionsTypes.playerStatusActionReturn {
  return {
    payload,
    type: actionTypes.PLAY_NEXT_SONG,
  };
};

const playCertainAudio = function makeActionPlayCertainAudio(payload) {
  return {
    payload,
    type: actionTypes.PLAY_CERTAIN_AUDIO,
  };
};

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
  changePlayerStatus,
  palyNextSong,
  playCertainAudio,
};
