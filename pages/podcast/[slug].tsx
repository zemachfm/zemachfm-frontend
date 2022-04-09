import { FC, ReactNode } from 'react';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';
import { wrapper } from '../../store/store';
import { fetchSinglePodcast } from '../../store/podcastSingle/actions';
import { TRootReducer } from '../../store/reducer';
import singlePodcastDataTypes from '../../store/podcastSingle/types.d';
import singlePodcastType from '../../types/singlePodcast.d';
import {
  fetchGuests,
  fetchSettings,
  changePlayerStatus,
  playCertainAudio,
} from '../../store/home/actions';
import { axiosGet } from '../../lib/store/axiosReq';
import { PODCASTS_URL } from '../../lib/store/url';
import PlayIcon from '../../icons/play.svg';
import PauseIcon from '../../icons/pause.svg';

const SinglePodcast: FC<singlePodcastType> = ({
  locale,
  content,
  slug,
  Footer,
}) => {
  const singlePodcastState: singlePodcastDataTypes = useSelector(
    (root: TRootReducer) => root.singlePodcast,
  );
  const player = useSelector((root: TRootReducer) => root.home.player);

  const dispatch = useDispatch();

  const onPlayBannerEpisode = (): void => {
    dispatch(playCertainAudio(singlePodcastState[slug][0]));
  };

  const onPlayingStateAction = (type: string) => {
    dispatch(changePlayerStatus({ type }));
  };

  const getPlayingBasedButtonProps = (): {
    onClick?: () => void;
    icon: ReactNode;
    text: string;
  } => {
    switch (player.player.playerStatus) {
      case 0:
        return {
          text: content?.topBanner?.pause,
          icon: (
            <PauseIcon className=" rounded-full fill-current  text-gray-100 w-10 h-10 p-2 " />
          ),
        };
      case 1:
        return {
          text: content?.topBanner?.pause,
          icon: (
            <PauseIcon className=" rounded-full fill-current  text-gray-100  w-10 h-10 p-2 " />
          ),
          onClick: () => onPlayingStateAction('PAUSE'),
        };
      case 2:
        return {
          text: content?.topBanner?.play,
          icon: (
            <PlayIcon className=" rounded-full fill-current  text-secondary-300  w-10 h-10 p-2 " />
          ),
          onClick: () => onPlayingStateAction('PLAY'),
        };
      default:
        return {
          text: content.topBanner?.pause,
          icon: (
            <PauseIcon className=" rounded-full fill-current  text-gray-100  w-10 h-10 p-2 " />
          ),
          onClick: () => onPlayingStateAction('PAUSE'),
        };
    }
  };

  const playingBasedProps = getPlayingBasedButtonProps();
  const baseUrl = process.env.host;

  return (
    <div className="dark:bg-black bg-gray-100">
      <Head>
        <title>
          {singlePodcastState[slug]
            ? singlePodcastState[slug][0].title.rendered
            : 'loading'}{' '}
        </title>
        <meta
          content={
            singlePodcastState[slug]
              ? singlePodcastState[slug][0].excerpt.renderd
              : ''
          }
          name="description"
        />
        {locale === 'en' ? (
          <link
            href={
              singlePodcastState[slug]
                ? `${baseUrl}/am/podcast/${singlePodcastState[slug][0].slug}`
                : ''
            }
            rel="canonical"
          />
        ) : null}
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {singlePodcastState[slug] ? (
        <div className="lg:max-w-screen-lg max-w-sm mx-auto pb-10 ">
          <h1
            className="text-3xl lg:text-4xl 2xl:text-4xl   text-left dark:text-white mt-4 mb-3 font-bold"
            dangerouslySetInnerHTML={{
              __html: singlePodcastState[slug][0].title.rendered,
            }}
          ></h1>
          <div className="flex flex-row  gap-4 text-gray-400 dark:text-gray-400 mb-4 lg:text-lg text-md">
            <p>
              {content?.podcastPage?.headings?.recorded}
              <span className="block lg:inline lg:ml-2">
                {singlePodcastState[slug][0].meta.date_recorded}
              </span>
            </p>
            -
            <p>
              {content?.podcastPage?.headings?.duration}
              <span className="block lg:inline lg:ml-2">
                {singlePodcastState[slug][0].meta.duration}
              </span>
            </p>
            -
            <p>
              {content?.podcastPage?.headings?.size}
              <span className="block lg:inline lg:ml-2">
                {singlePodcastState[slug][0].meta.filesize}
              </span>
            </p>
          </div>
          <div className="w-full flex justify-center lg:justify-start xl:mx-0 ">
            {player.currentPlay.item &&
            player.currentPlay.item.id === singlePodcastState[slug][0].id ? (
              <button
                className="py-2 px-8 outline-none focus:outline-none bg-gradient-to-r flex justify-between items-center hover:from-primary-600 hover:to-primary-500 from-primary-500 dark:from-primary-700 dark:hover:from-primary-800 to-primary-400 dark:to-primary-600 dark:hover:to-primary-700 text-white rounded-lg mb-8"
                onClick={playingBasedProps.onClick}
              >
                {playingBasedProps.icon}
                {playingBasedProps.text}
              </button>
            ) : (
              <button
                className="py-2 px-8 outline-none focus:outline-none bg-gradient-to-r flex justify-between items-center hover:from-primary-600 hover:to-primary-500 from-primary-500 dark:from-primary-700 dark:hover:from-primary-800 to-primary-400 dark:to-primary-600 dark:hover:to-primary-700 text-white rounded-lg mb-8"
                onClick={onPlayBannerEpisode}
              >
                <PlayIcon className=" rounded-full fill-current text-gray-100 w-10 h-10 p-2 " />
                {content.topBanner.play}
              </button>
            )}
          </div>
          <div
            className="w-full text-lg text-gray-600 dark:text-gray-200 fill-current blog"
            dangerouslySetInnerHTML={{
              __html: singlePodcastState[slug][0].content.rendered,
            }}
          ></div>
        </div>
      ) : null}
      <div className="border-t-2 border-gray-200 dark:border-gray-900 col-span-7 dark:bg-black">
        <div className="lg:max-w-screen-lg max-w-sm mx-auto pb-10">
          {Footer()}
        </div>
      </div>
    </div>
  );
};

const getStaticProps = wrapper.getStaticProps(
  async ({
    store,
    locale,
    params,
  }: GetStaticPropsContext & {
    store: any;
  }) => {
    store.dispatch(fetchSinglePodcast(params.slug.toString()));
    store.dispatch(fetchSettings(locale));
    store.dispatch(fetchGuests());
    store.dispatch(END);
    await store.sagaTask.toPromise();
    return {
      props: {
        locale,
        slug: params.slug,
      },
    };
  },
);
const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  /**
   * will hold episode data
   */
  let episodeData = [];
  /**
   * get our first total pages with data
   */
  const episodes = await axiosGet(PODCASTS_URL, { per_page: 100 });
  episodeData = [...episodes.data];
  const totalPages = episodes.headers['x-wp-totalpages'];

  let currentPage = 2;
  while (currentPage <= totalPages) {
    // eslint-disable-next-line no-await-in-loop
    const response = await axiosGet(PODCASTS_URL, {
      per_page: 100,
      page: currentPage,
    });
    episodeData = [...episodeData, ...response.data];
    currentPage += 1;
  }
  const pathsIterate = episodeData.map(episode => [
    {
      params: { slug: episode.slug },
      locale: 'am',
    },
    {
      params: { slug: episode.slug },
      locale: 'en',
    },
  ]);
  // eslint-disable-next-line prefer-spread
  const paths = [].concat.apply([], pathsIterate);
  return {
    paths,
    fallback: false,
  };
};

export default SinglePodcast;
export { getStaticPaths, getStaticProps };
