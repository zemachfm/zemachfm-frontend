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
} from './actions';
import { EpisodesReturnType } from './index.d';
const getPlayer = state => state.home.player;

function playerListen(player: Howl) {
  return eventChannel(emitter => {
    player.once('load', () => {
      emitter('LOAD');
    });
    player.onplayerror = () => {
      emitter('ERROR');
    };
    player.once('end', () => {
      emitter('END');
    });
    player.on('play', () => {
      emitter('PLAY');
    });
    player.on('pause', () => {
      emitter('PAUSE');
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
  payload: string;
}) {
  const player = yield select(getPlayer);
  if (player) {
    player.unload();
  }
  const sound = new Howl({
    src: [payload],
    html5: true,
  });
  yield put(setPlayer(sound));
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
      player.play();
      break;
    case 'PLAY':
      player.paly();
      break;
    case 'PAUSE':
      player.pause();
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
