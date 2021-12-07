import React from 'react';
import { useDispatch } from 'react-redux';
import * as props from './index.d';
import AudioPlayerComponent from './player';
import {
  changePlayerStatus,
  seekPlayer,
  changePlayerSetting,
  proceedWithPlaying,
} from '../../store/home/actions';

const AudioPlayerWrapper: React.FC<props.audioPlayerProps> = ({
  player,
  currentPlay,
  playerSettings,
  theme,
}) => {
  const { audioPlayer, currentPlayID, playerStatus } = player;
  const dispatch = useDispatch();
  const [durationNumber, setDurationNumber] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<string>('');
  const [currentTime, setCurrentTime] = React.useState<string>('');
  const [percentagePlayed, setPercentagePlayed] = React.useState<number>(0);
  const [progressing, setProgressing] = React.useState(true);
  const [plyaerBufferedSize, setPlayerBufferedSize] = React.useState<number>(0);

  React.useEffect(() => {
    if (currentPlayID && audioPlayer) {
      // eslint-disable-next-line no-underscore-dangle
      const audio = audioPlayer._sounds[0]._node;

      audio.addEventListener('seeked', () => {
        setDurationNumber(audio.duration);
        const s = audio.duration % 60;
        const m = (audio.duration / 60) % 60;
        setDuration(`${m.toFixed(0)}:${s.toFixed(0)}`);
      });

      audio.addEventListener('timeupdate', () => {
        if (currentPlayID) {
          if (!audio) {
            return;
          }
          const s = audio.currentTime % 60;
          const m = (audio.currentTime / 60) % 60;
          setCurrentTime(`${m.toFixed(0)}:${s.toFixed(0)}`);
          const percentPlayed = (
            (audio.currentTime / audio.duration) *
            100
          ).toFixed(2);
          setPercentagePlayed(parseInt(percentPlayed, 10));
          try {
            const endSeekable: number = audio.seekable.end(
              audio.seekable.length - 1,
            );
            const percentDuration: number =
              parseInt((endSeekable / audio.duration).toFixed(2), 10) * 100;
            setPlayerBufferedSize(percentDuration);
          } catch (err) {
            // eslint-disable-next-line no-console
            console.log('ops, prob');
          }
        } else {
          setProgressing(true);
        }
      });
      audio.addEventListener('canplay', () => {
        setProgressing(false);
      });
      audio.addEventListener('waiting', () => {
        setProgressing(true);
      });
    }
    // eslint-disable-next-line no-underscore-dangle
  }, [audioPlayer, currentPlayID]);

  const onPlayerStateChange = (type: string) => {
    if (!progressing) {
      dispatch(changePlayerStatus({ type }));
    }
  };

  const getPlayerStatus = item => {
    if (item === 2) {
      return false;
    }
    return true;
  };

  const onSeek = (seeked: number) => {
    dispatch(seekPlayer(seeked));
    setProgressing(true);
  };

  const proceedWithPlayer = (type: number): void => {
    dispatch(proceedWithPlaying({ type }));
  };

  const onSettingChange = (payload: { value: number; name: string }) => {
    dispatch(changePlayerSetting(payload));
  };

  React.useEffect(() => {
    if ('mediaSession' in navigator && navigator?.mediaSession) {
      navigator?.mediaSession?.setActionHandler('play', () => {
        dispatch(changePlayerStatus({ type: 'PLAY' }));
      });

      navigator?.mediaSession?.setActionHandler('pause', () => {
        dispatch(changePlayerStatus({ type: 'PAUSE' }));
      });
    }
  }, []);

  document.onkeydown = function playerStatusChange(event: KeyboardEvent): void {
    if (
      !(
        document.activeElement.tagName === 'INPUT' ||
        document.activeElement.tagName === 'TEXTAREA'
      )
    ) {
      if (event.key === ' ' || event.code === 'Spacebar') {
        event.preventDefault();
        if (isPlaying) {
          onPlayerStateChange('PAUSE');
        } else {
          onPlayerStateChange('PLAY');
        }
      }
    }
  };

  const isPlaying = getPlayerStatus(playerStatus);
  return (
    <div className="col-span-24">
      <div className=" fixed bottom-0 z-20 w-full ">
        <div
          className="relative py-2 bg-white dark:bg-gray-800 bg-opacity-60 bg-clip-padding dark:bg-opacity-80 px-8 shadow-2xl border-t-1 dark:border-gray-900 border-gray-200 z-100"
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <AudioPlayerComponent
            bufferedSize={plyaerBufferedSize}
            currentPlay={currentPlay}
            currentTime={currentTime}
            duration={durationNumber}
            durationCalcuated={duration}
            isPlaying={isPlaying}
            onPlayerChange={onPlayerStateChange}
            onSeek={onSeek}
            onSettingChange={onSettingChange}
            percentagePlayed={percentagePlayed}
            playerSettings={playerSettings}
            proceedWithPlayer={proceedWithPlayer}
            progressing={progressing}
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerWrapper;
