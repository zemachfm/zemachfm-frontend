import { Howl } from 'howler';
import { eventChannel } from 'redux-saga';
import { takeLatest, put, call, take, select } from 'redux-saga/effects';
import { PODCASTS_URL } from '../../lib/store/url';
import { axiosGet } from '../../lib/store/axiosReq';
import {
  fetchEpisodesSucceeded,
  fetchEpisodesFailed,
  actionTypes,
  changePlayerStatus,
  setPlayer,
  setCurrentPlayerID,
} from './actions';
import { EpisodesReturnType } from './index.d';
import { episode } from './types.d';

const getPlayer = state => state.home.player;
const getPlayerSettings = state => state.home.currentSettings;

function playerListen(player: Howl) {
  return eventChannel(emitter => {
    player.once('load', () => {
      console.log(
        'loading >>>>>>>>>>>>>...L..0..A..D..I..N..G....<<<<<<<<<<<<',
      );
      emitter('LOAD');
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
    player.audioPlayer.unload();
    yield put(setPlayer({ player: null, item: null }));
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
      setCurrentPlayerID(playerID);
      break;
    case 'ON_PLAY':
      player.audioPlayer.play();
      break;
    case 'PAUSE':
      player.audioPlayer.pause();
      break;
    case 'PLAY':
      player.audioPlayer.play();
      break;
    case 'STOP':
      player.stop();
      break;
    default:
  }
}

function* homeSaga() {
  yield takeLatest(actionTypes.FETCH_EPISODES, fetchEpisodesGenerator);
  yield takeLatest(actionTypes.PLAY_CERTAIN_AUDIO, playCertainAudioGenerator);
  yield takeLatest(
    actionTypes.CHANGE_PLAYER_STATUS,
    changePLayerStatusGenerator,
  );
}
export default homeSaga;
