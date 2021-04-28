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
import Hosts from '../components/Hosts';
import GridIcon from '../icons/grid.svg';
import RadioIcon from '../icons/radio.svg';
import UsersIcon from '../icons/users.svg';
import MessageIcon from '../icons/message-circle.svg';
import BookIcon from '../icons/book.svg';
import routes from '../lib/constants/hashRoutes';
import { ISideBarLink } from '../components/Sidebar/index.d';

const Home: FC<prop> = ({ content, locale }) => {
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const dispatch = useDispatch();
  const { episodes, player, currentPlay, currentSettings } = state;
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const linksDefault: ISideBarLink[] = [
    {
      active: false,
      label: content.sidebar.episodes,
      route: routes.index,
      icon: <GridIcon />,
    },
    {
      active: false,
      label: content.sidebar.hosts,
      route: routes.hosts,
      icon: <UsersIcon />,
    },
    {
      active: false,
      label: content.sidebar.guests,
      route: routes.guests,
      icon: <RadioIcon />,
    },
    {
      active: false,
      label: content.sidebar.story,
      route: routes.story,
      icon: <BookIcon />,
    },
    {
      active: false,
      label: content.sidebar.contact,
      route: routes.contact,
      icon: <MessageIcon />,
    },
  ];

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

  const [links, setLinks] = React.useState(linksDefault);

  const isActive = (link: string, changeTo: string) =>
    link?.replace('#', '') === changeTo.replace('#', '');

  const handleRouteChange = (changeTo: string, isMobile?: boolean) => {
    setLinks(oldLinks =>
      oldLinks.map(link => ({
        ...link,
        active: isActive(link.route, changeTo),
      })),
    );

    if (isMobile) {
      toogleMobileMenu();
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const { hash } = window.location;
      handleRouteChange(hash);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="bg-gray-100 dark:bg-black flex flex-col absolute h-full w-full ">
        {mobileMenuVisible && (
          <SmallDeviceSideBar
            handleRouteChange={handleRouteChange}
            links={links}
            toogleMenu={toogleMobileMenu}
          />
        )}
        <NavBar
          appName={content.appName}
          locale={locale}
          onChangeTheme={onThemeChange}
          theme={state.theme}
          toogleMobileMenu={toogleMobileMenu}
        />

        <div className="bg-gray-100 px-5 mt-5 dark:bg-black">
          <main className=" grid grid-cols-12 lg:grid-cols-10 ">
            <div className="h-full w-full flex-col justify-center hidden lg:flex">
              <SideBar handleRouteChange={handleRouteChange} links={links} />
            </div>
            <div className="col-span-12 lg:col-span-7 px-5">
              <EpisodeCardsContainer
                currentPlay={currentPlay.item}
                playerStatus={state.player.playerStatus}
                starterEpisodes={episodes}
                subTitle={content.episodesDescription}
                title={content.episodes}
              />
              <Hosts />
              <div className="mx-4 flex flex-col col-span-7 px-5 dark:bg-black">
                <footer className="py-5 my-5 margin-auto dark:bg-black">
                  <h1 className="dark:text-white text-2xl  text-center">
                    Make it happen, zemach{' '}
                  </h1>
                </footer>
              </div>
            </div>
            <div className="col-span-2 hidden lg:flex">
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
            theme={state.theme}
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
    store: any;
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
