import { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch } from 'react-redux';
import styles from '../styles/index.module.css';
import EpisodeCard from '../components/episodeCard';
import { wrapper } from '../store/store';
import { fetchEpisodes } from '../store/home/actions';

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEpisodes('payload'));
  }, [dispatch]);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="bg-gray-100 dark:bg-black h-100 flex flex-col absolute h-full w-full ">
        <main className={styles.main}>
          <div className="container">
            <h1 className="text-4xl">
              <span className="text-th-primary">ZemachFm</span>'s New Site Is
              Under Construction
            </h1>
            <div className="grid grid-cols-4 gap-4">
              <EpisodeCard />
              <EpisodeCard />
              <EpisodeCard />
              <EpisodeCard />
            </div>
            <button className="font-bold bg-gradient-to-r from-yellow-500 to-red-400 py-3 px-6 rounded shadow-sm text-white mt-5 ">
              Learn More
            </button>
          </div>
        </main>

        <footer className={styles.footer}>
          <h1> keep it cool </h1>
        </footer>
      </div>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  store.dispatch(fetchEpisodes());
});
export default Home;
