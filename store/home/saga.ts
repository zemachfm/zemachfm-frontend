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

function playerListen(player: Howl) {
  return eventChannel(emitter => {
    player.once('load', () => {
      console.log(
        'loading >>>>>>>>>>>>>...L..0..A..D..I..N..G....<<<<<<<<<<<<',
      );
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
    const { data: fetchedEpisodesData } = fetchedEpisodes;
    yield put(fetchEpisodesSucceeded(fetchedEpisodesData));
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
  console.log('on change >>>', payload.type);
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

function* preeceedWithPlaylistGenerator(type: string, payload: string) {
  const playlist = yield select(getPlaylist);
  let plays = [...playlist];
  console.log('playlist ', playlist);
  if (playlist.length === 0) {

    //reset the player
  }
  if (!payload) {
    let playerNow = plays.shift();
    console.log('on paly ',playerNow);
    yield put(playCertainAudio(playerNow));
    yield put(updatedPlaylist(plays));

  } else {
    let playerNow = playlist.unshift();
    yield put(playCertainAudio(playerNow));
    yield put(updatedPlaylist(plays));
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
}
export default homeSaga;
