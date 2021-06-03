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
  fetchHosts,
  toogleMobileMenu,
  playCertainAudio,
} from '../store/home/actions';
import SideBar from '../components/Sidebar';
import SmallDeviceSideBar from '../components/Sidebar/smallDevice.sidebar';
import prop from '../types/index.d';
import Hosts from '../components/Hosts';
import Guests from '../components/guests';
import GridIcon from '../icons/grid.svg';
import RadioIcon from '../icons/radio.svg';

import UsersIcon from '../icons/users.svg';
import MessageIcon from '../icons/message-circle.svg';
import BookIcon from '../icons/book.svg';
import routes from '../lib/constants/hashRoutes';
import { ISideBarLink } from '../components/Sidebar/index.d';
import OurStory from '../components/story/index';
import ContactUs from '../components/contactUs';
import RightSidebar from '../components/rightSide';
import TopBanner from '../components/Topbanner';
import MakeRSS from '../components/Rss/podcast';

const Home: FC<prop> = ({ content, locale, Footer }) => {
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
    Array.isArray(episodes) && episodes?.length > 0 ? episodes[8] : null;

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

  const [links, setLinks] = React.useState(linksDefault);

  const isActive = (link: string, changeTo: string) =>
    link?.replace('#', '') === changeTo.replace('#', '');

  const onMobileMenuToogle = () => {
    dispatch(toogleMobileMenu());
  };

  const handleRouteChange = (changeTo: string, isMobile?: boolean) => {
    setLinks(oldLinks =>
      oldLinks.map(link => ({
        ...link,
        active: isActive(link.route, changeTo),
      })),
    );

    if (isMobile) {
      onMobileMenuToogle();
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const { hash } = window.location;
      handleRouteChange(hash);
    }
  }, []);

  React.useEffect(() => {
    const currentHash =
      typeof window !== 'undefined' ? window.location.hash : '';
    setLinks(linksDefault);
    handleRouteChange(currentHash);
  }, [locale]);

  return (
    <div>
      <Head>
        <title>
          {content.appName} | {content.subtitle}
        </title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="bg-gray-100 dark:bg-black flex flex-col absolute h-full w-full ">
        {mobileMenuVisible && (
          <SmallDeviceSideBar
            handleRouteChange={handleRouteChange}
            links={links}
            toogleMenu={onMobileMenuToogle}
          />
        )}

        <div className="bg-gray-100 px-5 mt-5 dark:bg-black">
          <main className=" grid grid-cols-12 lg:grid-cols-12 ">
            <div className="h-full col-span-2 flex-col justify-center hidden lg:flex">
              <SideBar
                handleRouteChange={handleRouteChange}
                links={links}
                translatedStrings={content.sidebar}
              />
            </div>
            <div className="col-span-12 lg:col-span-8 lg:px-1 ">
              <TopBanner
                currentPlay={currentPlay.item}
                playerStatus={player.playerStatus}
                recentEpisode={recentEpisode}
                topBannerContent={content.topBanner}
              />
              <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-12">
                  <EpisodeCardsContainer
                    currentPlay={currentPlay.item}
                    loading={loading}
                    more={content.more}
                    playerStatus={player.playerStatus}
                    settings={settings}
                    starterEpisodes={episodes}
                    subTitle={content.episodesDescription}
                    title={content.episodes}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-12">
                  <Hosts
                    content={content.hosts}
                    hosts={state.hosts.data}
                    loading={state.hosts.loading}
                  />
                  <Guests
                    currentPlay={currentPlay.item}
                    episodes={guests.episodes}
                    loading={guests.loading}
                    more={content.more}
                    playerStatus={player.playerStatus}
                    subTitle={content.guestDescription}
                    title={content.guests}
                  />
                  <OurStory story={settings.story} />
                  <ContactUs content={content.contactUs} />
                  {Footer()}
                </div>
              </div>
            </div>
            <div className="col-span-12 hidden lg:flex lg:col-span-2 mt-2">
              <RightSidebar content={settings.rightSidebar} />
            </div>
          </main>
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
    // await MakeRSS();
    store.dispatch(fetchEpisodes());
    store.dispatch(fetchSettings(locale));
    store.dispatch(fetchGuests());
    store.dispatch(fetchHosts(locale));
    store.dispatch(END);
    await store.sagaTask.toPromise();

    return {
      props: {
        locale,
      },
    };
  },
);

export default Home;
