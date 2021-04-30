import { Howl } from 'howler';
import { eventChannel } from 'redux-saga';
import {
  takeLatest,
  put,
  call,
  take,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { GUESTS_URL, PODCASTS_URL, SETTINGS_URL } from '../../lib/store/url';
import { axiosGet } from '../../lib/store/axiosReq';
import {
  fetchEpisodesSucceeded,
  fetchEpisodesFailed,
  actionTypes,
  changePlayerStatus,
  setPlayer,
  setCurrentPlayerID,
  removePlayer,
  storePlayerStatus,
  playCertainAudio,
  updatedPlaylist,
  fetchSettingsSucceeded,
  fetchSettingsFailed,
  fetchGuestSucceeded,
  fetchGUestsFailed,
} from './actions';
import { EpisodesReturnType } from './index.d';
import { episode } from './types.d';

const getPlayer = state => state.home.player.player;
const getPlaylist = state => state.home.player.playlist;
const getPlayerSettings = state => state.home.player.currentSettings;
const getCurrentPlay = state => state.home.player.currentPlay;
const getPagination = state => state.home.episodes.paginaton;
const getGuestsPagination = state => state.home.guests.paginaton;
const getEpisodes = state => state.home.episodes.episodes;

function playerListen(player: Howl) {
  return eventChannel(emitter => {
    player.once('load', () => {
      emitter('LOAD');
    });
    player.once('play', () => {
      emitter('ON_PLAY');
    });
    player.once('pause', () => {
      emitter('ON_PAUSE');
    });

    player.onplayerror = () => {
      emitter('ERROR');
    };
    player.once('end', () => {
      emitter('END');
    });
    player.onunlock = () => {
      emitter('UNLOCK');
    };
    return () => {
      player.stop();
    };
  });
}

function* fetchEpisodesGenerator({
  type,
  payload,
}: {
  type: string;
  payload: null;
}) {
  try {
    const pagination = yield select(getPagination);
    const episodes = yield select(getEpisodes);
    if (pagination.total && pagination.total <= episodes.length) {
      return;
    }
    const fetchedEpisodes = yield call(axiosGet, PODCASTS_URL, {
      ...pagination,
    });
    const { data: fetchedEpisodesData, headers } = fetchedEpisodes;
    yield put(
      fetchEpisodesSucceeded({
        data: fetchedEpisodesData,
        pagination: headers['x-wp-total'],
      }),
    );
  } catch (err) {
    yield put(fetchEpisodesFailed(err));
  }
}

function* playCertainAudioGenerator({
  type,
  payload,
}: {
  type: string;
  payload: episode;
}) {
  const player = yield select(getPlayer);
  const playlist: episode[] = yield select(getPlaylist);
  const foundIndex = playlist.findIndex(element => element.id === payload.id);
  const playerSettings = yield select(getPlayerSettings);
  if (player.audioPlayer) {
    /**
     * do the actual remvoal
     */
    yield put(removePlayer());
    player.audioPlayer.off('play', null, player.currentPlayID);
    player.audioPlayer.unload();
  }
  const sound: Howl = new Howl({
    src: [payload.meta.audio_file],
    html5: true,
    ...playerSettings,
  });
  yield put(
    setPlayer({ player: sound, item: payload, playerIndex: foundIndex }),
  );
  const channel = yield call(playerListen, sound);
  try {
    while (true) {
      const emitted = yield take(channel);
      yield put(changePlayerStatus({ type: emitted }));
    }
  } finally {
    // eslint-disable-next-line no-console
    console.log('terminted');
  }
}

function* changePLayerStatusGenerator({ type, payload }) {
  const { audioPlayer, currentPlayID } = yield select(getPlayer);
  switch (payload.type) {
    case 'LOAD':
      // eslint-disable-next-line no-case-declarations
      const playerID = audioPlayer.play();
      yield put(setCurrentPlayerID(playerID));
      break;
    case 'ON_PLAY':
      yield put(storePlayerStatus(1));
      break;
    case 'PAUSE':
      audioPlayer.pause(currentPlayID);
      yield put(storePlayerStatus(2));

      break;
    case 'ON_PAUSE':
      yield put(storePlayerStatus(2));
      break;
    case 'PLAY':
      audioPlayer.play(currentPlayID);
      yield put(storePlayerStatus(1));
      break;
    case 'STOP':
      audioPlayer.stop(currentPlayID);
      break;
    default:
  }
}

function* preeceedWithPlaylistGenerator({
  type,
  payload,
}: {
  type: string;
  payload: { type: number };
}) {
  const { playlistIndex } = yield select(getCurrentPlay);
  const playlist = yield select(getPlaylist);

  // eslint-disable-next-line prefer-const
  let plays = [...playlist];
  if (plays.length - 1 === playlistIndex && !payload.type) {
    // let's get more of these
    return;
  }
  if (!payload.type) {
    const playerNow = plays[playlistIndex + 1];
    yield put(updatedPlaylist(playlistIndex + 1));
    yield put(playCertainAudio(playerNow));
  } else {
    const playerNow =
      plays[playlistIndex > 0 ? playlistIndex - 1 : plays.length - 1];
    yield put(updatedPlaylist(playlistIndex - 1));
    yield put(playCertainAudio(playerNow));
  }
}

function* playerSeekedGenerator({
  type,
  payload,
}: {
  type: string;
  payload: number;
}) {
  const { audioPlayer, currentPlayID } = yield select(getPlayer);
  try {
    const duration = audioPlayer.duration(currentPlayID);
    const seekedTime = (duration * payload) / 100;
    audioPlayer.seek(seekedTime, currentPlayID);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('we got an error :( ', err);
  }
}

function* changePlayerSettings({ type, payload }) {
  const { name, value } = payload;
  const { audioPlayer, currentPlayID } = yield select(getPlayer);
  switch (name) {
    case 'rate':
      audioPlayer.rate(value, currentPlayID);
      break;
    case 'volume':
      audioPlayer.volume(value, currentPlayID);
      break;
    default:
      break;
  }
}

function* fetchSettingsGenerator({ type }: { type: string }) {
  try {
    const { data: fetchedSettings } = yield call(axiosGet, SETTINGS_URL, {});
    console.log('fetched ', fetchedSettings);
    yield put(fetchSettingsSucceeded(fetchedSettings));
  } catch (err) {
    yield put(fetchSettingsFailed(err));
  }
}

function* fetchGuestsGenerator({ type }: { type: string }) {
  const pagination = yield select(getGuestsPagination);
  try {
    const { data: fetchedEpisodes, headers } = yield call(
      axiosGet,
      GUESTS_URL,
      {
        ...pagination,
      },
    );
    yield put(
      fetchGuestSucceeded({
        data: fetchedEpisodes,
        pagination: headers['x-wp-total'],
      }),
    );
  } catch (err) {
    yield put(fetchGUestsFailed(err.message));
  }
}

function* homeSaga() {
  yield takeLatest(actionTypes.FETCH_EPISODES, fetchEpisodesGenerator);
  yield takeEvery(actionTypes.PLAY_CERTAIN_AUDIO, playCertainAudioGenerator);
  yield takeEvery(
    actionTypes.CHANGE_PLAYER_STATUS,
    changePLayerStatusGenerator,
  );
  yield takeEvery(
    actionTypes.PROCEED_WITH_PLAYING,
    preeceedWithPlaylistGenerator,
  );

  yield takeLatest(actionTypes.SEEK_PLAYER, playerSeekedGenerator);
  yield takeLatest(actionTypes.CHANGE_PALYER_SETTINGS, changePlayerSettings);
  yield takeEvery(actionTypes.ADD_PAGINATION_PAGE, fetchEpisodesGenerator);
  yield takeLatest(actionTypes.FETCH_SETTINGS, fetchSettingsGenerator);
  yield takeLatest(actionTypes.FETCH_GUESTS, fetchGuestsGenerator);
}
export default homeSaga;
