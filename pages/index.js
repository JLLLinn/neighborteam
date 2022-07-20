import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import constants from '../utils/constants'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{constants.appNameSnake}</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>{constants.appNameSnake}!</a>
        </h1>

        <p className={styles.description}>
          Get started by signing up for a project
        </p>
      </main>
    </div>
  )
}
