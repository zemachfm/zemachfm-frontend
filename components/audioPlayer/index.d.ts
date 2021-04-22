import { playerStatusActionReturn } from '../../store/home/actions';
import { episode, soundSettings, playerStore } from '../../store/home/types.d';

type audioPlayerProps = {
  player: playerStore;
  currentPlay: episode;
  playerSettings: soundSettings;
  theme: string;
};

type sliderProps = {
  bufferedPercent: number;
  playedPercent: number;
  currentTime: string;
  duration: number;
  theme: string;
  onSeek: (number) => void;
};

type volumeSliderProps = {
  volume: number;
  onVolumeChange: (payload: { name: string; value: number }) => void;
};

type audioPlayerComponent = {
  duration: number;
  durationCalcuated: string;
  currentTime: string;
  percentagePlayed: number;
  isPlaying: boolean;
  onPlayerChange: (val: string) => playerStatusActionReturn;
  currentPlay: episode;
  playerSettings: soundSettings;
  progressing: boolean;
  bufferedSize: number;
  proceedWithPlayer: (type: number) => void;
  onSeek: (number) => void;
  onSettingChange: (payload: { name: string; value: number }) => void;
  theme: string;
};

export {
  audioPlayerProps,
  audioPlayerComponent,
  sliderProps,
  volumeSliderProps,
};
