import { useEffect } from 'react'
import { useUser } from '../context/user'
import Image from 'next/image'

const Avatar = () => {
  const { user, isLoading } = useUser()

  useEffect(() => {
    console.log()
  }, [])

  return (
    <button className="w-6 h-6 bg-white rounded-full">
      <Image
        width={20}
        height={20}
        src={user?.user_metadata?.avatar_url}
      ></Image>
    </button>
  )
}

export default Avatar
