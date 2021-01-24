import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="container">
          <h1 className="text-4xl"><span className="text-th-primary">ZemachFm</span>'s New Site Is Under Construction</h1>
        </div>
      </main>

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
