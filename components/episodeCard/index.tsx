import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { episodeCardsContainerType } from './index.d';
import EpisodeCard from './episodeCard';
import { playCertainAudio, changePlayerStatus } from '../../store/home/actions';

const episodeCardsContainer: FC<episodeCardsContainerType> = ({
  title,
  subTitle,
  starterEpisodes,
  currentPlay,
}) => {
  const Dispatch = useDispatch();

  const onEpisodeCardPlay = item => {
    Dispatch(playCertainAudio(item));
  };

  const onPause = type => {
    Dispatch(changePlayerStatus({ type }));
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
            {title}
          </h1>
          <p className="text-gray-400 text-lg mb-7">{subTitle}</p>
        </div>
      </div>

      <div className="grid grid-cols lg:grid-cols-3 gap-4 ">
        {starterEpisodes
          ? starterEpisodes.map(item => (
              <EpisodeCard
                image={item.small_player}
                item={item}
                onPlay={onEpisodeCardPlay}
                onPause={onPause}
                playing={currentPlay ? item.id === currentPlay.id : false}
                title={item.title.rendered}
              />
            ))
          : null}
      </div>
    </>
  );
};
export default episodeCardsContainer;
