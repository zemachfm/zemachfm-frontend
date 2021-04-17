import React, { FC, useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { GetStaticPropsContext } from 'next';
import { AnyAction, Store } from 'redux';
import { END } from 'redux-saga';

import path from 'path';
import fs from 'fs';
import EpisodeCardsContainer from '../components/episodeCard';
import { wrapper } from '../store/store';
import NavBar from '../components/Navbar';
import { IHomeReducer, ThemeTypes } from '../store/home/types.d';
import { TRootReducer } from '../store/reducer';
import { fetchEpisodes, changeThemeAction } from '../store/home/actions';
import localStorageKeys from '../lib/constants/localStorageKeys';
import AudioPlayer from '../components/audioPlayer';
import AudioPlayers from '../components/audioPlayer/audioPlayer';
import SideBar from '../components/Sidebar';
import SmallDeviceSideBar from '../components/Sidebar/smallDevice.sidebar';
import prop from '../types/index.d';

const Home: FC<prop> = ({ content, locale }) => {
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const dispatch = useDispatch();
  const { episodes, player, currentPlay, currentSettings } = state;
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const toogleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
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

        <div className="px-5 mt-5 dark:bg-black">
          <main className=" grid grid-cols-10 ">
            <div className="h-full w-full flex flex-col justify-center">
              <SideBar />
            </div>
            <div className="col-span-7 px-5">
              <EpisodeCardsContainer
                currentPlay={currentPlay.item}
                starterEpisodes={episodes}
                subTitle={content.episodesDescription}
                title={content.episodes}
              />
              <div className=" mx-4 flex flex-col col-span-7 px-5 dark:bg-black">
                <footer className="py-5 my-5 margin-auto dark:bg-black">
                  <h1 className="dark:text-white text-2xl  text-center">
                    Make it happen, zemach{' '}
                  </h1>
                </footer>
              </div>
            </div>
            <div className="col-span-2">
              <div className="h-full w-full flex relative flex-col justify-center">
                <AudioPlayer />
              </div>
            </div>
          </main>
        </div>

        {state.player.audioPlayer ? (
          <AudioPlayers
            currentPlay={currentPlay.item}
            player={player}
            playerSettings={currentSettings}
          />
        ) : null}
      </div>
    </div>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({
    store,
    locale,
  }: GetStaticPropsContext & {
    store: Store<IHomeReducer, AnyAction>;
  }) => {
    store.dispatch(fetchEpisodes());
    store.dispatch(END);
    await store.sagaTask.toPromise();
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
