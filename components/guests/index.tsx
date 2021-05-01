import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePlayerStatus, playCertainAudio } from '../../store/home/actions';
import GuestCard from './host';
import props from './index.d';

const Guests: FC<props> = ({
  title,
  episodes,
  subTitle,
  currentPlay,
  loading,
  playerStatus,
}) => {
  const Dispatch = useDispatch();

  const onEpisodeCardPlay = item => {
    Dispatch(playCertainAudio(item));
  };

  const onPause = type => {
    Dispatch(changePlayerStatus({ type }));
  };

  return (
    <div id="guests">
      <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
        {title}
      </h1>
      <p className="text-gray-400 text-lg mb-7">{subTitle}</p>

      <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-6 ">
        {episodes
          ? episodes.map(episode => (
              <GuestCard
                item={episode}
                onPause={onPause}
                onPlay={onEpisodeCardPlay}
                playerStatus={playerStatus}
                playing={currentPlay ? episode.id === currentPlay.id : false}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Guests;
