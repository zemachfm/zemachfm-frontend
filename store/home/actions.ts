import { makeAction } from '../../lib/store/makeActions';
import { ThemeTypes } from './types';

const actionTypes = {
  FETCH_EPISODES: 'FETCH_EPISODES',
  FETCH_EPISODES_FAILED: 'FETCH_EPISODES_FAILED',
  FETCH_EPISODES_SUCCEDDED: 'FETCH_EPISODES_SUCCEDDED',
  CHANGE_THEME: 'CHANGE_THEME',
};

const fetchEpisodes = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES);

const fetchEpisodesFailed = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES_FAILED);

const fetchEpisodesSucceeded = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES_SUCCEDDED);

const changeThemeAction = (payload: ThemeTypes) =>
  makeAction(payload, actionTypes.CHANGE_THEME);

export {
  actionTypes,
  fetchEpisodes,
  fetchEpisodesFailed,
  fetchEpisodesSucceeded,
  changeThemeAction,
};
