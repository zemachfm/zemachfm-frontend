import { playerStatusActionReturn } from '../../store/home/actions';
import { episode, soundSettings, playerStore } from '../../store/home/types.d';

type audioPlayerProps = {
  player: playerStore;
  currentPlay: episode;
  playerSettings: soundSettings;
};

type sliderProps = {
  bufferedPercent: number;
  playedPercent: number;
  currentTime: string;
  duration: number;
  onSeek: (number) => void;
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
};

export { audioPlayerProps, audioPlayerComponent, sliderProps };
