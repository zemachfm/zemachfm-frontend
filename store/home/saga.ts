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
import { PODCASTS_URL } from '../../lib/store/url';
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
} from './actions';
import { EpisodesReturnType } from './index.d';
import { episode } from './types.d';

const getPlayer = state => state.home.player;
const getPlaylist = state => state.home.playlist;
const getPlayerSettings = state => state.home.currentSettings;
const getCurrentPlay = state => state.home.currentPlay;

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
    const fetchedEpisodes = yield call(axiosGet, PODCASTS_URL, payload);
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
  const playerSettings = yield select(getPlayerSettings);
  if (player.audioPlayer) {
    /**
     * do the actual remvoal
     */
    yield put(removePlayer());
    player.audioPlayer.off('play', null, player.currentPlayID);
    player.audioPlayer.unload();
  }
  const sound = new Howl({
    src: [payload.meta.audio_file],
    html5: true,
    ...playerSettings,
  });
  yield put(setPlayer({ player: sound, item: payload }));
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
  const player = yield select(getPlayer);
  switch (payload.type) {
    case 'LOAD':
      // eslint-disable-next-line no-case-declarations
      const playerID = player.audioPlayer.play();
      yield put(setCurrentPlayerID(playerID));
      break;
    case 'ON_PLAY':
      yield put(storePlayerStatus(1));
      break;
    case 'PAUSE':
      player.audioPlayer.pause(player.currentPlayID);
      yield put(storePlayerStatus(2));

      break;
    case 'ON_PAUSE':
      yield put(storePlayerStatus(2));
      break;
    case 'PLAY':
      player.audioPlayer.play(player.currentPlayID);
      yield put(storePlayerStatus(1));
      break;
    case 'STOP':
      player.stop(player.currentPlayID);
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
}
export default homeSaga;
