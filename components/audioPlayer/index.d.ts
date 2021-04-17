import { playerStatusActionReturn } from '../../store/home/actions';
import { episode, soundSettings, playerStore } from '../../store/home/types.d';

type audioPlayerProps = {
  player: playerStore;
  currentPlay: episode;
  playerSettings: soundSettings;
};

type audioPlayerComponent = {
  duration: string;
  currentTime: string;
  percentagePlayed: string;
  isPlaying: boolean;
  onPlayerChange: (val: string) => playerStatusActionReturn;
  currentPlay: episode;
  playerSettings: soundSettings;
  progressing: boolean;
  bufferedSize: number;
  proceedWithPlayer: (type: number) => void;
};

export { audioPlayerProps, audioPlayerComponent };
