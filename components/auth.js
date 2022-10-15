import { useUser } from '../context/user'

const Auth = () => {
  const { login } = useUser()

  return (
    <div>
      <button onClick={login}>Login with Github</button>
    </div>
  )
}

export default Auth
