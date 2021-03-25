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
  const dispatch = useDispatch();
  const reequestRef = React.useRef<number | null>(null);
  const [duration, setDuration] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const animate = time => {
    if (
      audioPlayer.duration(currentPlayID) &&
      audioPlayer.playing(currentPlayID)
    ) {
      setIsPlaying(audioPlayer.playing(currentPlayID));
      if (typeof audioPlayer.seek(currentPlayID) === 'number') {
        setDuration(audioPlayer.seek(currentPlayID));
      }
    } else {
      setIsPlaying(false);
    }
    // Change the state according to the animation
    reequestRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reequestRef.current);
  });

  const onPlayerStateChange = (type: string) =>
    dispatch(changePlayerStatus({ type }));

  return (
    <div>
      <AudioPlayerComponent
        currentPlay={currentPlay}
        duration={duration.toFixed(1)}
        isPlaying={isPlaying}
        onPlayerChange={onPlayerStateChange}
        playerSettings={playerSettings}
      />
    </div>
  );
};

export default AudioPlayerContainer;
