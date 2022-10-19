import { useUser } from '../context/user'
import Image from 'next/image'

const Avatar = ({ className }) => {
  const { user, logout } = useUser()

  return (
    <button className={className} onClick={logout}>
      <Image
        className="rounded-full"
        width={40}
        height={40}
        src={
          user
            ? user?.user_metadata?.avatar_url
            : 'https://ionicframework.com/docs/img/demos/avatar.svg'
        }
        alt="User Profile Image Avatar"
      ></Image>
    </button>
  )
}

export default Avatar
