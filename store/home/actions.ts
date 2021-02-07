import { makeAction } from '../../lib/store/makeActions';

const actionTypes = {
  FETCH_EPISODES: 'FETCH_EPISODES',
  FETCH_EPISODES_FAILED: 'FETCH_EPISODES_FAILED',
  FETCH_EPISODES_SUCCEDDED: 'FETCH_EPISODES_SUCCEDDED',
};

const fetchEpisodes = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES);

const fetchEpisodesFailed = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES_FAILED);

const fetchEpisodesSucceeded = payload =>
  makeAction(payload, actionTypes.FETCH_EPISODES_SUCCEDDED);

export {
  actionTypes,
  fetchEpisodes,
  fetchEpisodesFailed,
  fetchEpisodesSucceeded,
};
