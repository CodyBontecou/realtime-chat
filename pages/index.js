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
    <div>
      <Head>
        <title>Costream.app</title>
      </Head>

      <main className="h-screen w-screen bg-gray-900 grid grid-cols-5">
        <Avatar />
        <YoutubeVideo className="col-span-4" />
      </main>
    </div>
  )
}
