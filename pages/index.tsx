import { useEffect, ReactElement } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/index.module.css';
import EpisodeCard from '../components/episodeCard';
import { wrapper } from '../store/store';
import NavBar from '../components/Navbar';
import { IHomeReducer, ThemeTypes } from '../store/home/types';
import { TRootReducer } from '../store/reducer';
import { fetchEpisodes, changeThemeAction } from '../store/home/actions';
import localStorageKeys from '../lib/constants/localStorageKeys';
import AudioPlayer from '../components/audioPlayer';
import SideBar from '../components/Sidebar';

function Home(): ReactElement {
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const dispatch = useDispatch();
  const { episodes } = state;

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
    dispatch(fetchEpisodes('payload'));
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
      <div className="bg-gray-100 dark:bg-black h-100 flex flex-col absolute h-full w-full ">
        <NavBar onChangeTheme={onThemeChange} theme={state.theme} />

        <div className="mx-5">
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
                        title={item.title.rendered}
                      />
                    ))
                  : null}
              </div>
            </div>
            <div className="col-span-2">
              <div className="h-full w-full flex flex-col justify-center">
                <AudioPlayer />
              </div>
            </div>
          </main>
        </div>

        <footer className={styles.footer}>
          <h1 className="dark:text-white"> keep it cool </h1>
        </footer>
      </div>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(fetchEpisodes(null));
});
export default Home;
