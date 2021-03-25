import React, { ReactElement, useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { GetStaticPropsContext } from 'next';
import { AnyAction, Store } from 'redux';

import path from 'path';
import fs from 'fs';
import EpisodeCard from '../components/episodeCard';
import { wrapper } from '../store/store';
import NavBar from '../components/Navbar';
import { IHomeReducer, ThemeTypes, episode } from '../store/home/types.d';
import { TRootReducer } from '../store/reducer';
import {
  fetchEpisodes,
  changeThemeAction,
  playCertainAudio,
} from '../store/home/actions';
import localStorageKeys from '../lib/constants/localStorageKeys';
import AudioPlayer from '../components/audioPlayer';
import AudioPlayers from '../components/audioPlayer/audioPlayer';
import SideBar from '../components/Sidebar';
import SmallDeviceSideBar from '../components/Sidebar/smallDevice.sidebar';

function Home({ content, locale }): ReactElement {
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const dispatch = useDispatch();
  const { episodes } = state;
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toogleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const onEpisodeCardPlay = (item: episode) => {
    dispatch(playCertainAudio(item));
  };

  const onThemeChange = (theme: ThemeTypes) => {
    localStorage.setItem(localStorageKeys.theme, theme);
    dispatch(changeThemeAction(theme));
  };

  useEffect(() => {
    // Remember theme option
    if (localStorageKeys.theme in localStorage) {
      const themeValue = localStorage.getItem(localStorageKeys.theme);

      if (themeValue === 'dark' || themeValue === 'light') {
        dispatch(changeThemeAction(themeValue));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="bg-gray-100 dark:bg-black flex flex-col absolute h-full w-full ">
        {mobileMenuVisible && (
          <SmallDeviceSideBar toogleMenu={toogleMobileMenu} />
        )}
        <NavBar
          appName={content.appName}
          locale={locale}
          onChangeTheme={onThemeChange}
          theme={state.theme}
          toogleMobileMenu={toogleMobileMenu}
        />

        <div className="mx-5 mt-5">
          <main className=" grid grid-cols-10 ">
            <div className="h-full w-full flex flex-col justify-center">
              <SideBar />
            </div>

            <div className=" mx-4 flex flex-col col-span-7 px-5">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <h1 className=" text-6xl my-10 font-bold dark:text-gray-200 mb-2 ">
                    Episodes
                  </h1>
                  <p className="text-gray-400 text-lg mb-7">
                    Latest episodes from Zemach Podcasts are here{' '}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols lg:grid-cols-3 gap-4 ">
                {episodes
                  ? episodes.map(item => (
                      <EpisodeCard
                        image={item.episode_featured_image}
                        item={item}
                        onPlay={onEpisodeCardPlay}
                        title={item.title.rendered}
                      />
                    ))
                  : null}
              </div>
              <footer className="py-5 my-5 margin-auto">
                <h1 className="dark:text-white text-2xl  text-center">
                  Make it happen, zemach{' '}
                </h1>
              </footer>
            </div>
            <div className="col-span-2">
              <div className="h-full w-full flex relative flex-col justify-center">
                <AudioPlayer />
              </div>
            </div>
          </main>
        </div>
        <div className="col-span-24">
          <div className=" fixed bottom-0 z-100 w-full ">
            <div className="relative bg-white dark:bg-gray-800 bg-opacity-90 px-8 shadow-2xl border-t-2 dark:border-gray-900 border-gray-100 z-100">
              {state.player.audioPlayer ? (
                <AudioPlayers
                  currentPlay={state.currentPlay}
                  player={state.player}
                  playerSettings={state.currentSettings}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  async ({
    store,
    locale,
  }: GetStaticPropsContext & {
    store: Store<any, AnyAction>;
  }) => {
    store.dispatch(fetchEpisodes());

    const dir = path.join(process.cwd(), 'public', 'static');
    const filePath = `${dir}/${locale}.json`;
    const buffer = fs.readFileSync(filePath);
    const content = JSON.parse(buffer.toString());
    return {
      props: {
        content,
        locale,
      },
    };
  },
);

export default Home;
