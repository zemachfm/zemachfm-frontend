import { FC } from 'react';
import { useSelector } from 'react-redux';
import { IHomeReducer } from '../../store/home/types.d';
import { TRootReducer } from '../../store/reducer';
import AudioPlayerWrapper from './audioPlayer';

const AudioPlayerContainer: FC<Record<string, unknown>> = () => {
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const { player: playersDataCont, theme } = state;
  const { player, currentPlay, currentSettings } = playersDataCont;
  return state.player.player.audioPlayer ? (
    <AudioPlayerWrapper
      currentPlay={currentPlay.item}
      player={player}
      playerSettings={currentSettings}
      theme={theme}
    />
  ) : null;
};

export default AudioPlayerContainer;
