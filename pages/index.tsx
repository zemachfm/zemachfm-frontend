import Head from 'next/head';
import styles from '../styles/Home.module.css';

function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="bg-gray-50 dark:bg-black h-100 flex flex-col absolute h-full w-full ">
        <main className={styles.main}>
          <div className="container">
            <h1 className="text-4xl">
              <span className="text-th-primary">ZemachFm</span>'s New Site Is
              Under Construction
            </h1>
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
export default Home;
