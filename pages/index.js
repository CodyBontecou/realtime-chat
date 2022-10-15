import Head from 'next/head'
import Stream from '../components/Stream'
import YouTubeVideo from '../components/YouTubeVideo'
import styles from '../styles/Home.module.css'
import { useUser } from '../context/user'
import { supabase } from '../utils/supabase'

export default function Home() {
  const { user, isLoading } = useUser()

  return (
    <div className={styles.container}>
      <Head>
        <title>Costream.app</title>
      </Head>

      <main className={styles.main}>
        <YouTubeVideo id={'zUqIv5PvbGk'} />
      </main>
    </div>
  )
}
