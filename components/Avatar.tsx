import { useEffect } from 'react'
import { useUser } from '../context/user'
import Image from 'next/image'

const Avatar = () => {
  const { user } = useUser()

  useEffect(() => {
    console.log()
  }, [])

  return (
    <button className="absolute top-2 right-2">
      <Image
        className="rounded-full"
        width={40}
        height={40}
        src={user?.user_metadata?.avatar_url}
      ></Image>
    </button>
  )
}

export default Avatar
