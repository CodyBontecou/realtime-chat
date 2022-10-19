import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'
import { useRouter } from 'next/router'
import axios from 'axios'

const Context = createContext()

const Provider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(supabase.auth.user())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUserProfile = async () => {
      console.log('getting user profile')
      const sessionUser = supabase.auth.user()
      if (sessionUser) {
        const { data: user } = await supabase
          .from('user')
          .select('*')
          .eq('id', sessionUser.id)
          .single()

        setUser({
          ...sessionUser,
          ...user,
        })
      }
    }

    supabase.auth.onAuthStateChange(() => {
      getUserProfile()
    })
  }, [])

  useEffect(() => {
    axios.post('/api/set-supabase-cookie', {
      event: user ? 'SIGNED_IN' : 'SIGNED_OUT',
      session: supabase.auth.session(),
    })
    setIsLoading(false)
  }, [user])

  const login = async () => {
    await supabase.auth.signIn({
      provider: 'twitch',
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
  }

  const exposed = {
    user,
    login,
    logout,
    isLoading,
  }

  return <Context.Provider value={exposed}>{children}</Context.Provider>
}

export const useUser = () => useContext(Context)

export default Provider
