import { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/index.module.css';
import EpisodeCard from '../components/episodeCard';
import { wrapper } from '../store/store';
import { fetchEpisodes } from '../store/home/actions';
import NavBar from '../components/Navbar';
import { IHomeReducer, ThemeTypes } from '../store/home/types';
import { TRootReducer } from '../store/reducer';
import { changeThemeAction } from '../store/home/actions';
import localStorageKeys from '../lib/constants/localStorageKeys';

function Home() {
  const state: IHomeReducer = useSelector((root: TRootReducer) => root.home);
  const dispatch = useDispatch();
  const episodes = state.episodes;

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
  }, []);

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
      <div className="bg-gray-50 dark:bg-black h-100 flex flex-col absolute h-full w-full ">
        <NavBar onChangeTheme={onThemeChange} theme={state.theme} />

        <main className={styles.main}>
          <div className="container flex flex-col">
            <h1 className="text-4xl dark:text-white">
              <span className="text-th-primary">ZemachFm</span>'s New Site Is
              Under Construction
            </h1>

            <div className="grid grid-cols-4 gap-4">
              {episodes
                ? episodes.map(item => (
                    <EpisodeCard
                      subtitle={item.excerpt.rendered}
                      image={item.episode_featured_image}
                      title={item.title.rendered}
                    />
                  ))
                : null}
            </div>

            <a
              className="font-bold bg-gradient-to-r w-2/12 text-center from-yellow-500 to-red-400 py-3 px-6 rounded shadow-sm text-white mt-5 "
              href="https://zemachfm.com"
            >
              Learn More
            </a>
          </div>
        </main>

        <footer className={styles.footer}>
          <h1 className="dark:text-white"> keep it cool </h1>
        </footer>
      </div>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(fetchEpisodes());
});
export default Home;
