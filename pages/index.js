import Head from 'next/head'
import Stream from '../components/Stream'
import Avatar from '../components/Avatar'
import YoutubeVideo from '../components/Youtube'
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
        <Avatar className="absolute top-2 right-2" />
        <YoutubeVideo />
      </main>
    </div>
  )
}
