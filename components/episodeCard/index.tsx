import { FC } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { episodeCardsContainerType } from './index.d';
import EpisodeCard from './episodeCard';
import {
  playCertainAudio,
  changePlayerStatus,
  addPaginationPage,
} from '../../store/home/actions';
import { episode } from '../../store/home/types.d';
import routes from '../../lib/constants/hashRoutes';

const EpisodeCardsContainer: FC<episodeCardsContainerType> = ({
  title,
  subTitle,
  starterEpisodes,
  currentPlay,
  playerStatus,
  more,
  loading,
  settings,
  handleRouteChange,
  scrollSpyActive,
  gotoText,
}) => {
  // needs fix
  const Dispatch = useDispatch();

  const onEpisodeCardPlay = item => {
    Dispatch(playCertainAudio(item));
  };

  const onPause = type => {
    Dispatch(changePlayerStatus({ type }));
  };

  const onDownload = async (item: episode) => {
    window.open(item.download_link, '_black').focus();
  };

  const onLoadMore = () => {
    Dispatch(addPaginationPage(1));
  };

  const EpisodeList = loading
    ? [...starterEpisodes, ...Array(3).fill({ loading: true })]
    : starterEpisodes;

  const handleVisibility = (visible: boolean) => {
    if (visible) {
      handleRouteChange(routes.index);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-full">
          <div className="flex flex-row items-end justify-between w-full">
            <h1 className=" text-3xl lg:text-4xl 2xl:text-5xl  my-10 font-bold dark:text-gray-200 mb-2 ">
              {title}
            </h1>
            <div className="float-right text-md inline-block mt-10 dark:text-white px-6">
              <Link href="/podcasts">
                <span className="cursor-pointer">{gotoText || ''}</span>
              </Link>
            </div>
          </div>
          <p className="text-gray-400 text-lg mb-7">{subTitle}</p>
        </div>
      </div>

      <div className="grid grid-cols grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
        {EpisodeList
          ? EpisodeList.map((item, index) => {
              if (item.loading) {
                return <EpisodeCard loading settings={settings} />;
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
                  settings={settings}
                  title={item.title.rendered}
                />
              );
            })
          : null}
      </div>
      <button
        className="px-3 py-2 text-primary-600 hover:underline rounded mt-4"
        onClick={onLoadMore}
      >
        {more}
      </button>
    </div>
  );
};
export default EpisodeCardsContainer;
