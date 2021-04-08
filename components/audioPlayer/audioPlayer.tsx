import React from 'react';
import { useDispatch } from 'react-redux';
import * as props from './index.d';
import AudioPlayerComponent from './player';
import { changePlayerStatus } from '../../store/home/actions';

const AudioPlayerContainer: React.FC<props.audioPlayerProps> = ({
  player,
  currentPlay,
  playerSettings,
}) => {
  const { audioPlayer, currentPlayID, playerStatus } = player;
  console.log('player is ', player);
  const dispatch = useDispatch();
  const [playID, setPlayID] = React.useState<number | null>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progressing, setProgressing] = React.useState(false);
  const [playerState, setPlayerState] = React.useState<number>(playerStatus);
  const [plyaerBufferedSize, setPlayerBufferedSize] = React.useState<number>(0);
  // const animate = time => {
  //   if (currentPlayID) {
  //     setIsPlaying(audioPlayer.playing(currentPlayID));
  //     if (typeof audioPlayer.seek(currentPlayID) === 'number') {
  //       setDuration(audioPlayer.seek(currentPlayID));
  //     }

  //     const node = audioPlayer._sounds[0]._node;

  //   } else {
  //     setIsPlaying(false);
  //   }
  //   setPlayerState(audioPlayer.state());
  //   // Change the state according to the animation
  //   reequestRef.current = requestAnimationFrame(animate);
  // };
  React.useEffect(() => {
    setPlayID(currentPlayID);
  }, [currentPlayID]);

  React.useEffect(() => {
    //requestAnimationFrame(animate);
    if (currentPlayID) {
      let audio = audioPlayer._sounds[0]._node;
      var seekableEnd = audio.seekable.end(audio.seekable.length - 1);

      setIsPlaying(!audio.paused);
      console.log('its true', audioPlayer._sounds, seekableEnd);
      audio.addEventListener('timeupdate', function (event) {
        if (player.currentPlayID) {
          console.log('play id', player);
          setDuration(audio.currentTime);
          try {
            var seekableEnd = audio.seekable.end(audio.seekable.length - 1);
            setPlayerBufferedSize(seekableEnd);
            console.log('seekable', seekableEnd);
          } catch (err) {
            console.log('prob');
          }
        }
      });
      audio.addEventListener('canplay', function () {
        setProgressing(false);
      });
      audio.addEventListener('waiting', function () {
        console.log('waiting for more load');
        setProgressing(true);
      });
      audio.addEventListener('seeked', function () {
        console.log('firing at seeked');
        let inc = 1;
        for (let i = 0; i < audio.buffered.length; i++) {
          let startX = audio.buffered.start(i) * inc;
          let endX = audio.buffered.end(i) * inc;
          let width = endX - startX;

          setPlayerBufferedSize(width);
        }
      });
    }

    //  return () => cancelAnimationFrame(reequestRef.current);
  }, [currentPlayID]);

  const onPlayerStateChange = (type: string) => {
    console.log('the type', type);
    dispatch(changePlayerStatus({ type }));
  };

  const getPlayerStatus = item => {
    if (item === 2) {
      return false;
    }
    return true;
  };

  return (
    <div className="col-span-24">
      <div className=" fixed bottom-0 z-100 w-full ">
        <div className="relative bg-white dark:bg-gray-800 bg-opacity-90 px-8 shadow-2xl border-t-1 dark:border-gray-900 border-gray-200 z-100">
          <AudioPlayerComponent
            currentPlay={currentPlay}
            duration={duration.toFixed(1)}
            isPlaying={getPlayerStatus(playerStatus)}
            onPlayerChange={onPlayerStateChange}
            playerSettings={playerSettings}
            progressing={progressing}
            bufferedSize={plyaerBufferedSize}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerContainer;
