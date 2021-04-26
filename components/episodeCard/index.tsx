import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { episodeCardsContainerType } from './index.d';
import EpisodeCard from './episodeCard';
import {
  playCertainAudio,
  changePlayerStatus,
  addPaginationPage,
} from '../../store/home/actions';

const EpisodeCardsContainer: FC<episodeCardsContainerType> = ({
  title,
  subTitle,
  starterEpisodes,
  currentPlay,
  playerStatus,
  more,
  loading,
}) => {
  // needs fix
  const Dispatch = useDispatch();

  const onEpisodeCardPlay = item => {
    Dispatch(playCertainAudio(item));
  };

  const onPause = type => {
    Dispatch(changePlayerStatus({ type }));
  };

  const onDownload = () => {
    // on download
  };

  const onLoadMore = () => {
    Dispatch(addPaginationPage(1));
  };

  const EpisodeList = loading
    ? [...Array(2).fill({ loading: true }), ...starterEpisodes]
    : starterEpisodes;

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
        {EpisodeList
          ? EpisodeList.map((item, index) => {
              if (item.loading) {
                return <EpisodeCard loading />;
              }
              return (
                <EpisodeCard
                  image={item.small_player}
                  index={index}
                  item={item}
                  key={item.id}
                  loading={false}
                  onDownload={onDownload}
                  onPause={onPause}
                  onPlay={onEpisodeCardPlay}
                  playerStatus={playerStatus}
                  playing={currentPlay ? item.id === currentPlay.id : false}
                  title={item.title.rendered}
                />
              );
            })
          : null}
      </div>
      <button
        className="px-3 py-2 text-green-600 hover:underline rounded mt-4"
        onClick={onLoadMore}
      >
        {more}
      </button>
    </>
  );
};
export default EpisodeCardsContainer;
