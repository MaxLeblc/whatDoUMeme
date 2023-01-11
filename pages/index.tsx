import Head from 'next/head'
import Memes from '../components/memes'
import ToTop from '../components/toTop'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>What do you meme?</title>
        <meta name="description" content="Meme Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>What do you meme?</h1>
          <h2>Meme Generator</h2>
          <h3>Choose a template and customize it!</h3>
        </div>
        <Memes />
        <ToTop />
      </main>
    </>
  )
}
