import Head from 'next/head'
import Stream from '../components/Stream'
import Avatar from '../components/Avatar'
import YoutubeVideo from '../components/Youtube'
import styles from '../styles/Home.module.css'
import { useUser } from '../context/user'
import { supabase } from '../utils/supabase'
import Link from 'next/link'

export default function Home() {
  const { user, isLoading } = useUser()

  return (
    <div>
      <Head>
        <title>Costream.app</title>
      </Head>

      <main className="h-screen w-screen bg-gray-900 grid grid-cols-5">
        {!isLoading && user ? (
          <Avatar className="absolute top-2 right-2" />
        ) : (
          <Link href="/login">
            <a className="absolute top-2 right-2 text-white">Login</a>
          </Link>
        )}
        <YoutubeVideo className="col-span-full" />
      </main>
    </div>
  )
}
