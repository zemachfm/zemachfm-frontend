import { Howl } from 'howler';
import { playerStatusActionReturn } from '../../store/home';
import { episode, soundSettings } from '../../store/home/types.d';

type audioPlayerProps = {
  player: {
    audioPlayer: Howl;
    currentPlayID: any;
  };
  currentPlay: episode;
  playerSettings: soundSettings;
};

type audioPlayerComponent = {
  duration: string;
  isPlaying: boolean;
  onPlayerChange: (val: string) => playerStatusActionReturn;
  currentPlay: episode;
  playerSettings: soundSettings;
  progressing: boolean;
  bufferedSize: number;
};

export { audioPlayerProps, audioPlayerComponent };
