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
  const { audioPlayer, currentPlayID } = player;
  console.log('player is ', player);
  const dispatch = useDispatch();
  const [playID, setPlayID] = React.useState<number | null>(0);
  const [duration, setDuration] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progressing, setProgressing] = React.useState(false);
  const [playerState, setPlayerState] = React.useState<string>('LOADING');
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

  return (
    <div>
      <AudioPlayerComponent
        currentPlay={currentPlay}
        duration={duration.toFixed(1)}
        isPlaying={isPlaying}
        onPlayerChange={onPlayerStateChange}
        playerSettings={playerSettings}
        progressing={progressing}
        bufferedSize={plyaerBufferedSize}
      />
    </div>
  );
};

export default AudioPlayerContainer;
