import React, { FC } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { GetStaticPropsContext } from 'next';
import { END } from 'redux-saga';

import EpisodeCardsContainer from '../components/episodeCard';
import { wrapper } from '../store/store';
import { IHomeReducer } from '../store/home/types.d';
import { TRootReducer } from '../store/reducer';
import {
  fetchEpisodes,
  fetchSettings,
  fetchGuests,
  toogleMobileMenu,
} from '../store/home/actions';
import prop from '../types/index.d';
import PlaylistBox from '../components/PlaylistBox';

const Podcasts: FC<prop> = ({ content, locale, Footer }) => {
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const dispatch = useDispatch();

  const {
    episodes: episodesDataCont,
    player: playersDataCont,
    settings,
    guests,
    mobileMenuVisible,
  } = state;
  const { episodes, loading } = episodesDataCont;
  const { player, currentPlay } = playersDataCont;

  const recentEpisode =
    Array.isArray(episodes) && episodes?.length > 0 ? episodes[0] : null;

  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>
          {content.appName} | {content?.podcasts?.pageTitle}
        </title>
        <meta
          content={content?.podcasts?.pageSubtitle}
          name="description"
        ></meta>
        <meta content="index, follow" name="robots"></meta>
        <meta content="initial-scale=1.0, width=device-width" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="bg-gray-100 dark:bg-black flex flex-col absolute h-full w-full ">
        <div className="bg-gray-100 px-5 mt-5 dark:bg-black">
          <main className=" lg:max-w-screen-lg max-w-sm mx-auto pb-10 ">
            <PlaylistBox
              currentPlay={currentPlay.item}
              playerStatus={player.playerStatus}
              recentEpisode={
                currentPlay.item ? currentPlay.item : recentEpisode
              }
              topBannerContent={content.topBanner}
            />

            <div className="grid grid-cols-12 justify-center">
              <div className="col-span-12 lg:col-span-12">
                <EpisodeCardsContainer
                  currentPlay={currentPlay.item}
                  handleRouteChange={null}
                  loading={loading}
                  more={content.more}
                  playerStatus={player.playerStatus}
                  scrollSpyActive={null}
                  settings={settings}
                  starterEpisodes={episodes}
                  subTitle={content.episodesDescription}
                  title={content.episodes}
                />
              </div>
            </div>
          </main>
          <div className="border-t-2 border-gray-200 dark:border-gray-900 col-span-7 dark:bg-black">
            <div className="lg:max-w-screen-lg max-w-sm mx-auto pb-10">
              {Footer()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({
    store,
    locale,
  }: GetStaticPropsContext & {
    store: any;
  }) => {
    store.dispatch(fetchEpisodes());
    store.dispatch(fetchSettings(locale));
    store.dispatch(fetchGuests());
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {
        locale,
      },
    };
  },
);

export default Podcasts;
